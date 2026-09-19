import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for document comparisons to eliminate duplicate Gemini calls
const compareCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const MAX_CACHE_ENTRIES = 50;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { docAName, docAText, docBName, docBText, customApiKey } = body;

    if (!docAText || !docBText || typeof docAText !== 'string' || typeof docBText !== 'string') {
      return NextResponse.json(
        { error: 'Both docAText and docBText are required as strings for comparison.' },
        { status: 400 }
      );
    }

    const sanitizedDocA = docAText.slice(0, 15000);
    const sanitizedDocB = docBText.slice(0, 15000);
    const safeDocAName = typeof docAName === 'string' ? docAName.slice(0, 100) : 'Draft A';
    const safeDocBName = typeof docBName === 'string' ? docBName.slice(0, 100) : 'Draft B';

    // Check cache
    const cacheKey = `${safeDocAName}:${safeDocBName}:${sanitizedDocA.slice(0, 300)}:${sanitizedDocB.slice(0, 300)}`;
    const cached = compareCache.get(cacheKey);
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
        { error: 'No GEMINI_API_KEY configured. Fallback to client comparison presets.' },
        { status: 400 }
      );
    }

    const modelName =
      process.env.GENAI_MODEL ||
      process.env.GEMINI_MODEL ||
      'gemini-2.5-flash';

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const prompt = `You are NyayaLens, an expert AI legal contract comparison system.
Compare the following two contract drafts (Document A vs Document B) side-by-side.

CRITICAL INSTRUCTIONS:
1. Identify key clause variations, shifted liabilities, changed timelines, payment differences, and risk profiles.
2. Label each variation's differenceType as:
   - 'warning' for elevated risk shifts or aggressive unilateral covenants
   - 'significant_difference' for notable substantive changes (terms, dollar amounts, notice periods)
   - 'minor_difference' for minor procedural or wording adjustments
   - 'identical' for unchanged provisions
3. Output strictly valid JSON formatted as:
{
  "summaryAI": "Comparative executive synthesis explaining trade-offs, which draft is more favorable to which party, and top negotiation priorities...",
  "comparisonItems": [
    {
      "category": "Financial | Termination | Responsibilities | Governance | Liability | IP",
      "field": "Specific Clause or Covenant being compared",
      "docAValue": "Draft A provision summary",
      "docBValue": "Draft B provision summary",
      "aiExplanation": "Objective explanation of how this difference impacts the parties",
      "differenceType": "warning | significant_difference | minor_difference | identical",
      "affectedParty": "Party most affected or protected"
    }
  ]
}

DOCUMENT A (Baseline): ${safeDocAName}
${sanitizedDocA || 'No text provided for Doc A.'}

DOCUMENT B (Counter/Revision): ${safeDocBName}
${sanitizedDocB || 'No text provided for Doc B.'}`;

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
    const resultData = {
      ...parsed,
      isLiveGeminiComparison: true,
      modelUsed: modelName
    };

    // Cache successful comparison
    if (compareCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = compareCache.keys().next().value;
      if (oldestKey) compareCache.delete(oldestKey);
    }
    compareCache.set(cacheKey, { data: resultData, timestamp: Date.now() });

    return NextResponse.json(resultData);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to compare documents with Gemini' },
      { status: 500 }
    );
  }
}
