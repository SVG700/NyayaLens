import { describe, it, expect, vi, beforeEach } from 'vitest';
import { answerDocumentQuestion, clearAICache } from '@/lib/ai';
import {
  DEMO_RENTAL_AGREEMENT,
  DEMO_EMPLOYMENT_AGREEMENT,
  DEMO_SERVICE_CONTRACT
} from '@/lib/mockData';

describe('Ask Your Document — Grounded Q&A', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    clearAICache();
    // Default fetch to reject so it tests client fallback semantics reliably
    global.fetch = vi.fn().mockRejectedValue(new Error('No server API connection'));
  });

  describe('Residential Lease Agreement Q&A', () => {
    it('answers inquiries regarding rent, late fees, and grace period', async () => {
      const response = await answerDocumentQuestion(
        DEMO_RENTAL_AGREEMENT,
        'How much is the monthly rent and is there a late fee?'
      );

      expect(response.answer).toContain('$1,850.00');
      expect(response.answer).toContain('$75.00');
      expect(response.answer).toContain('grace period');
      expect(response.sources.length).toBeGreaterThan(0);
      expect(response.sources[0].section).toBe('Section 2.1 & 2.2');
      expect(response.sources[0].clauseTitle).toContain('Rent');
      expect(response.sources[0].snippet).toBeDefined();
    });

    it('answers inquiries regarding security deposit return timeline', async () => {
      const response = await answerDocumentQuestion(
        DEMO_RENTAL_AGREEMENT,
        'When will my security deposit be refunded after moving out?'
      );

      expect(response.answer).toContain('$3,700.00');
      expect(response.answer).toContain('forty-five (45) business days');
      expect(response.sources[0].section).toBe('Section 3.1 & 3.2');
    });

    it('answers inquiries regarding early lease termination and penalties', async () => {
      const response = await answerDocumentQuestion(
        DEMO_RENTAL_AGREEMENT,
        'What are the penalties if I terminate the lease early?'
      );

      expect(response.answer).toContain('thirty (30) calendar days');
      expect(response.answer).toContain('50% of the security deposit');
      expect(response.sources[0].section).toBe('Section 7.1 & 7.2');
    });

    it('answers inquiries regarding maintenance thresholds', async () => {
      const response = await answerDocumentQuestion(
        DEMO_RENTAL_AGREEMENT,
        'Who pays for minor repairs and maintenance?'
      );

      expect(response.answer).toContain('$100.00');
      expect(response.answer).toContain('Tenant');
      expect(response.answer).toContain('Landlord');
      expect(response.sources[0].section).toBe('Section 5.1');
    });

    it('answers inquiries regarding subletting and short-term rentals', async () => {
      const response = await answerDocumentQuestion(
        DEMO_RENTAL_AGREEMENT,
        'Can I sublet my apartment or list it on Airbnb?'
      );

      expect(response.answer.toLowerCase()).toContain('prohibited');
      expect(response.answer).toContain('Airbnb');
      expect(response.sources[0].section).toBe('Section 6.2');
    });
  });

  describe('Employment Agreement Q&A', () => {
    it('answers compensation and salary queries', async () => {
      const response = await answerDocumentQuestion(
        DEMO_EMPLOYMENT_AGREEMENT,
        'What is my base salary and how is it paid?'
      );

      expect(response.answer).toContain('$165,000.00');
      expect(response.answer).toContain('semi-monthly');
      expect(response.sources[0].section).toBe('Section 1.2');
    });

    it('answers equity vesting and stock option schedule queries', async () => {
      const response = await answerDocumentQuestion(
        DEMO_EMPLOYMENT_AGREEMENT,
        'How does stock option equity vesting work with the cliff?'
      );

      expect(response.answer).toContain('25,000 stock options');
      expect(response.answer).toContain('1-year cliff');
      expect(response.answer).toContain('6,250 shares');
      expect(response.sources[0].section).toBe('Section 2.1 & 2.2');
    });

    it('answers invention assignment and side project ownership queries', async () => {
      const response = await answerDocumentQuestion(
        DEMO_EMPLOYMENT_AGREEMENT,
        'Do I own my personal side projects or code inventions?'
      );

      expect(response.answer).toContain('Section 3.1');
      expect(response.answer).toContain('Schedule A');
      expect(response.answer).toContain('California Labor Code Section 2870');
    });

    it('answers severance and termination benefit queries', async () => {
      const response = await answerDocumentQuestion(
        DEMO_EMPLOYMENT_AGREEMENT,
        'What severance pay do I receive if terminated without cause?'
      );

      expect(response.answer).toContain('two (2) months of base salary');
      expect(response.answer).toContain('$27,500.00');
      expect(response.sources[0].section).toBe('Section 5.1 & 5.2');
    });
  });

  describe('Master Services Agreement (MSA) Q&A', () => {
    it('answers contract payment tranches and billing term queries', async () => {
      const response = await answerDocumentQuestion(
        DEMO_SERVICE_CONTRACT,
        'What are the invoice payment terms and milestones?'
      );

      expect(response.answer).toContain('$84,000.00');
      expect(response.answer).toContain('Net-30');
      expect(response.sources[0].section).toBe('Section 2.1 & 2.2');
    });

    it('answers deliverable acceptance window queries', async () => {
      const response = await answerDocumentQuestion(
        DEMO_SERVICE_CONTRACT,
        'How many days does client have to accept or reject deliverables?'
      );

      expect(response.answer).toContain('five (5) business days');
      expect(response.sources[0].section).toBe('Section 3.1');
    });

    it('answers liability cap and damage waiver queries', async () => {
      const response = await answerDocumentQuestion(
        DEMO_SERVICE_CONTRACT,
        'What is the maximum liability cap in case of dispute?'
      );

      expect(response.answer).toContain('$84,000.00');
      expect(response.answer.toLowerCase()).toContain('consequential and indirect damages are mutually waived');
      expect(response.sources[0].section).toBe('Section 5.1');
    });
  });

  describe('Live GenAI Integration & Fallback Handling', () => {
    it('uses server response when /api/ai/ask succeeds', async () => {
      const mockApiResponse = {
        answer: 'Gemini Live: The agreement outlines rent of $1,850.',
        sources: [
          {
            clauseTitle: 'Rent Provision',
            section: 'Section 2.1',
            page: 1,
            snippet: 'Monthly rent is $1,850'
          }
        ],
        modelUsed: 'gemini-2.5-flash',
        isLiveAI: true
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse
      });

      const response = await answerDocumentQuestion(DEMO_RENTAL_AGREEMENT, 'What is the rent?');
      expect(response.answer).toBe(mockApiResponse.answer);
      expect(response.sources).toEqual(mockApiResponse.sources);
    });

    it('seamlessly falls back to heuristic engine when API returns 500 error', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error'
      });

      const response = await answerDocumentQuestion(DEMO_RENTAL_AGREEMENT, 'What is the rent?');
      expect(response.answer).toContain('$1,850.00');
      expect(response.sources.length).toBeGreaterThan(0);
    });
  });
});
