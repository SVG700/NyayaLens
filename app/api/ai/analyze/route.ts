import { NextRequest, NextResponse } from 'next/server';
import { computeCacheFingerprint } from '@/lib/serverUtils';

// In-memory cache for document analyses to eliminate redundant Gemini processing
const analyzeCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const MAX_CACHE_ENTRIES = 50;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { fileName, rawText, customApiKey } = body;

    if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Document rawText is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    const sanitizedRawText = rawText.slice(0, 25000);
    const safeFileName = typeof fileName === 'string' ? fileName.slice(0, 100) : 'Analyzed Agreement';

    // Deterministic SHA-256 fingerprint incorporating file name and full sanitized text
    const cacheKey = computeCacheFingerprint(safeFileName, sanitizedRawText);
    const cached = analyzeCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        ...cached.data,
        isCached: true
      });
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GENAI_API_KEY ||
      req.headers.get('x-gemini-api-key') ||
      customApiKey;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'No GEMINI_API_KEY configured. Fallback to client heuristics.' },
        { status: 400 }
      );
    }

    const modelName =
      process.env.GENAI_MODEL ||
      process.env.GEMINI_MODEL ||
      'gemini-2.5-flash';

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const prompt = `You are NyayaLens, an expert AI legal document parser and diligence assistant.
Analyze this legal instrument and produce a comprehensive, structured JSON intelligence report.

CRITICAL INSTRUCTIONS:
1. Simplify legal terminology into plain, accessible English without sacrificing precision.
2. Ground all clauses, dates, obligations, and review points in the source text.
3. Categorize clause severity objectively: 'Informational', 'Important', 'Review Recommended', or 'Potential Concern'. Do NOT declare anything categorically legal or illegal.
4. Output strict JSON matching this exact structure:
{
  "name": "${safeFileName}",
  "type": "Contract type (e.g. Commercial Lease, NDA, Employment, Master Services)",
  "parties": ["Party 1 Name/Role", "Party 2 Name/Role"],
  "duration": "Agreement term or duration",
  "governingLaw": "Jurisdiction / Governing state or directives",
  "summary": "High-level plain-language executive summary of the agreement",
  "simpleLanguageSummary": {
    "corePremise": "Plain English summary of what this contract fundamentally does",
    "financialSummary": "Plain English summary of all payment obligations, fees, deposits, or penalties",
    "exitConditions": "Plain English summary of notice periods, termination rights, and renewability",
    "mainRisks": "Plain English summary of the most critical risk areas or unilateral covenants"
  },
  "clauses": [
    {
      "id": "cl-1",
      "sectionNumber": "Section 1.1",
      "title": "Clause Title",
      "originalText": "Exact text or key snippet excerpt from document",
      "simplifiedText": "Plain language translation for non-lawyers",
      "category": "Financial | Termination | Responsibilities | Governance | Liability | Intellectual Property",
      "severity": "Informational | Important | Review Recommended | Potential Concern",
      "whyItMatters": "Why this clause is significant to the signing party",
      "riskFactors": ["Risk point 1", "Risk point 2"],
      "suggestedAction": "Specific recommendation before signing",
      "pageNumber": 1,
      "tags": ["Financial"]
    }
  ],
  "obligations": [
    {
      "id": "ob-1",
      "party": "Party Name or Role",
      "description": "Specific required obligation or commitment",
      "originalSection": "Section X.X",
      "consequence": "Penalty or breach consequence if not performed"
    }
  ],
  "dates": [
    {
      "id": "dt-1",
      "date": "YYYY-MM-DD",
      "formattedDate": "DD Mon YYYY",
      "event": "Milestone or Deadline Name",
      "explanation": "What happens or must occur on this date",
      "actionRequired": "Action the user needs to take",
      "isUpcoming": true,
      "daysRemaining": 30,
      "sourceSection": "Section X.X"
    }
  ],
  "reviewPoints": [
    {
      "id": "rp-1",
      "title": "Review point title",
      "severity": "Important | Potential Concern",
      "summary": "Summary of the issue",
      "detailedNotice": "In-depth explanation of the legal nuance",
      "actionableStep": "Clear negotiation or verification step",
      "clauseId": "cl-1"
    }
  ],
  "checklist": [
    {
      "id": "chk-1",
      "text": "Specific actionable diligence task",
      "category": "Pre-Signing | Immediate | Ongoing | Legal Consultation",
      "completed": false,
      "deadline": "Timing recommendation"
    }
  ],
  "lawyerQuestions": [
    {
      "id": "lq-1",
      "number": 1,
      "question": "Precise question to pose to legal counsel",
      "rationale": "Why asking this protects the client's interests",
      "relatedClause": "Section X.X (Title)",
      "category": "Category name"
    }
  ]
}

DOCUMENT TEXT:
${sanitizedRawText}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Gemini API returned status ${response.status}: ${err}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return NextResponse.json({ error: 'Empty response from Gemini' }, { status: 500 });
    }

    let cleaned = candidateText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleaned);
    const resultDoc = {
      ...parsed,
      id: `doc-ai-${Date.now()}`,
      fileSize: `${Math.round(sanitizedRawText.length / 1024)} KB`,
      uploadDate: new Date().toISOString().split('T')[0],
      lastAnalyzed: 'Just now (Live Gemini 2.5)',
      status: 'Analyzed',
      totalClauses: parsed.clauses?.length || 0,
      rawText: sanitizedRawText,
      isLiveGeminiAnalysis: true
    };

    // Cache successful analysis
    if (analyzeCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = analyzeCache.keys().next().value;
      if (oldestKey) analyzeCache.delete(oldestKey);
    }
    analyzeCache.set(cacheKey, { data: resultDoc, timestamp: Date.now() });

    return NextResponse.json(resultDoc);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze document with Gemini' },
      { status: 500 }
    );
  }
}
