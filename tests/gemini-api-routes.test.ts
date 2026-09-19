import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as handleAsk } from '@/app/api/ai/ask/route';
import { POST as handleAnalyze } from '@/app/api/ai/analyze/route';
import { POST as handleCompare } from '@/app/api/ai/compare/route';
import { POST as handleTest } from '@/app/api/ai/test/route';

describe('Gemini API Routes & Response Validation', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('POST /api/ai/ask', () => {
    it('returns 400 when inquiry question is missing or empty', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentName: 'Test Doc', rawText: 'Sample text' })
      });

      const res = await handleAsk(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.error).toContain('Inquiry question is required');
    });

    it('returns 400 when no API key is configured or provided', async () => {
      delete process.env.GEMINI_API_KEY;
      delete process.env.GENAI_API_KEY;

      const req = new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: 'What is the rent?' })
      });

      const res = await handleAsk(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.error).toContain('No GEMINI_API_KEY configured');
    });

    it('parses valid Gemini JSON response with markdown code block stripping', async () => {
      const mockGeminiJson = {
        answer: 'Monthly rent is $1,850.00 under Section 2.1.',
        sources: [
          {
            clauseTitle: 'Monthly Rent',
            section: 'Section 2.1',
            page: 1,
            snippet: 'Tenant shall pay $1,850.00'
          }
        ]
      };

      // Wrap in markdown code block as Gemini often returns
      const candidateRaw = `\`\`\`json\n${JSON.stringify(mockGeminiJson)}\n\`\`\``;

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: { parts: [{ text: candidateRaw }] }
            }
          ]
        })
      });

      const req = new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: 'How much is the rent?',
          customApiKey: 'test-mock-key'
        })
      });

      const res = await handleAsk(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.answer).toBe(mockGeminiJson.answer);
      expect(json.sources).toEqual(mockGeminiJson.sources);
      expect(json.isLiveAI).toBe(true);
    });

    it('gracefully handles non-JSON plain text response from Gemini', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: { parts: [{ text: 'Plain text answer from model without JSON.' }] }
            }
          ]
        })
      });

      const req = new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: 'What is the notice period?',
          rawText: 'Section 7: 30 days notice required.',
          customApiKey: 'test-mock-key'
        })
      });

      const res = await handleAsk(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.answer).toBe('Plain text answer from model without JSON.');
      expect(json.sources.length).toBeGreaterThan(0);
    });

    it('handles upstream Gemini 502 bad gateway error', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        text: async () => 'Bad Gateway'
      });

      const req = new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: 'What is rent?',
          customApiKey: 'test-mock-key'
        })
      });

      const res = await handleAsk(req);
      expect(res.status).toBe(502);

      const json = await res.json();
      expect(json.error).toContain('Gemini API returned status 502');
    });

    it('returns cached response on identical subsequent inquiry and bypasses when text or history changes', async () => {
      const mockGeminiJson = {
        answer: 'Base salary is $150,000.',
        sources: [{ clauseTitle: 'Salary', section: '1.0', page: 1, snippet: '$150,000' }]
      };

      let fetchCount = 0;
      global.fetch = vi.fn().mockImplementation(async () => {
        fetchCount++;
        return {
          ok: true,
          json: async () => ({
            candidates: [{ content: { parts: [{ text: JSON.stringify(mockGeminiJson) }] } }]
          })
        };
      });

      const body1 = {
        documentName: 'Employment.txt',
        rawText: 'Section 1.0 Salary is $150,000 payable monthly.',
        question: 'What is the salary?',
        customApiKey: 'test-mock-key'
      };

      // First call -> misses cache, hits fetch
      const res1 = await handleAsk(new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body1)
      }));
      const json1 = await res1.json();
      expect(fetchCount).toBe(1);
      expect(json1.isCached).toBeUndefined();

      // Second identical call -> hits cache, does not hit fetch
      const res2 = await handleAsk(new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body1)
      }));
      const json2 = await res2.json();
      expect(fetchCount).toBe(1);
      expect(json2.isCached).toBe(true);

      // Third call with changed history -> misses cache, triggers fetch
      const res3 = await handleAsk(new NextRequest('http://localhost:3000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body1,
          conversationHistory: [{ sender: 'user', text: 'Previous query' }]
        })
      }));
      const json3 = await res3.json();
      expect(fetchCount).toBe(2);
      expect(json3.isCached).toBeUndefined();
    });
  });

  describe('POST /api/ai/analyze', () => {
    it('returns 400 when rawText is empty or missing', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: 'Test.txt' })
      });

      const res = await handleAnalyze(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.error).toContain('rawText is required');
    });

    it('parses structured contract intelligence and attaches metadata', async () => {
      const mockDocAnalysis = {
        name: 'Apartment Lease',
        type: 'Residential Lease',
        parties: ['Landlord A', 'Tenant B'],
        duration: '12 Months',
        governingLaw: 'Karnataka',
        summary: 'A standard residential tenancy contract.',
        simpleLanguageSummary: {
          corePremise: 'Premise summary',
          financialSummary: 'Financial summary',
          exitConditions: 'Exit summary',
          mainRisks: 'Risk summary'
        },
        clauses: [
          {
            id: 'cl-1',
            sectionNumber: 'Section 1.1',
            title: 'Rent',
            originalText: 'Rent is $1800',
            simplifiedText: 'You pay $1800 each month',
            category: 'Financial',
            severity: 'Important',
            whyItMatters: 'Mandatory recurring fee',
            riskFactors: ['Late fee after 5th'],
            suggestedAction: 'Set up auto-pay'
          }
        ],
        obligations: [],
        dates: [],
        reviewPoints: [],
        checklist: [],
        lawyerQuestions: []
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: { parts: [{ text: JSON.stringify(mockDocAnalysis) }] }
            }
          ]
        })
      });

      const req = new NextRequest('http://localhost:3000/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: 'Lease.txt',
          rawText: 'Section 1.1: Rent is $1800 payable monthly.',
          customApiKey: 'test-mock-key'
        })
      });

      const res = await handleAnalyze(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.isLiveGeminiAnalysis).toBe(true);
      expect(json.totalClauses).toBe(1);
      expect(json.clauses[0].title).toBe('Rent');
    });
  });

  describe('POST /api/ai/compare', () => {
    it('returns 400 when document texts are missing', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docAName: 'Draft A' })
      });

      const res = await handleCompare(req);
      expect(res.status).toBe(400);
    });

    it('processes comparative diff items with trade-off synthesis', async () => {
      const mockComparison = {
        summaryAI: 'Draft B significantly increases notice periods and imposes forfeiture.',
        comparisonItems: [
          {
            category: 'Termination',
            field: 'Early Exit Penalty',
            docAValue: '30 days notice, no forfeiture',
            docBValue: '60 days notice, 50% deposit forfeiture',
            aiExplanation: 'Draft B severely penalizes tenant.',
            differenceType: 'warning',
            affectedParty: 'Tenant'
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: { parts: [{ text: JSON.stringify(mockComparison) }] }
            }
          ]
        })
      });

      const req = new NextRequest('http://localhost:3000/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docAName: 'Draft A',
          docAText: 'Standard 30 days notice',
          docBName: 'Draft B',
          docBText: '60 days notice and penalty',
          customApiKey: 'test-mock-key'
        })
      });

      const res = await handleCompare(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.isLiveGeminiComparison).toBe(true);
      expect(json.comparisonItems[0].differenceType).toBe('warning');
    });
  });

  describe('POST /api/ai/test', () => {
    it('returns success: false when no key is configured', async () => {
      delete process.env.GEMINI_API_KEY;
      delete process.env.GENAI_API_KEY;

      const req = new NextRequest('http://localhost:3000/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const res = await handleTest(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.envKeyConfigured).toBe(false);
    });

    it('reports latency and model name when connection succeeds', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [{ text: '{"status":"connected"}' }] } }]
        })
      });

      const req = new NextRequest('http://localhost:3000/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customApiKey: 'mock-key', customModel: 'gemini-2.5-flash' })
      });

      const res = await handleTest(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(json.model).toBe('gemini-2.5-flash');
      expect(typeof json.latencyMs).toBe('number');
    });
  });
});
