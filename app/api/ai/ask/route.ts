import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for repeated inquiries to eliminate duplicate Gemini API calls
const askCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes
const MAX_CACHE_ENTRIES = 100;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { documentName, rawText, question, conversationHistory, customApiKey } = body;

    // Input validation & sanitization
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Inquiry question is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    const sanitizedQuestion = question.trim().slice(0, 1000);
    const sanitizedRawText = typeof rawText === 'string' ? rawText.slice(0, 20000) : '';

    // Check in-memory cache for duplicate queries
    const cacheKey = `${documentName || ''}:${sanitizedQuestion.toLowerCase()}:${sanitizedRawText.slice(0, 400)}`;
    const cachedEntry = askCache.get(cacheKey);
    if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        ...cachedEntry.data,
        isCached: true
      });
    }

    // Securely retrieve the key from environment variables or optional header/request fallback
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

    const formattedHistory = Array.isArray(conversationHistory) && conversationHistory.length > 0
      ? conversationHistory.map((m: any) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n')
      : 'None';

    const prompt = `You are NyayaLens, an expert AI legal document understanding and assistance system.
Analyze the provided document text to answer the user's inquiry accurately, thoroughly, and objectively.

CRITICAL INSTRUCTIONS:
1. Ground your answer STRICTLY in the provided text.
2. Formulate your answer in plain, accessible language that ordinary people can understand without a law degree.
3. Every substantive point MUST include exact section references, clause titles, and verbatim or near-verbatim quote snippets.
4. NyayaLens provides informational legal assistance and does NOT provide formal legal advice. Never state whether something is categorically legal or illegal; instead use categories like 'Informational', 'Important', 'Review Recommended', or 'Potential Concern'.
5. Always output valid, parseable JSON conforming strictly to this format:
{
  "answer": "Clear, plain-language explanation of the legal terms...",
  "sources": [
    {
      "clauseTitle": "Clause or Covenant Title",
      "section": "Section X.X",
      "page": 1,
      "snippet": "Exact text or key phrase excerpt from the document"
    }
  ]
}

DOCUMENT NAME: ${documentName || 'Legal Document'}
RECENT DIALOGUE:
${formattedHistory}

DOCUMENT TEXT:
${sanitizedRawText || 'No raw text provided.'}

USER INQUIRY:
${sanitizedQuestion}`;

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
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Gemini API returned status ${response.status}: ${errorText}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return NextResponse.json({ error: 'Empty response from Gemini AI' }, { status: 500 });
    }

    // Clean any markdown formatting if present
    let cleaned = candidateText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    let resultPayload: any;
    try {
      const parsed = JSON.parse(cleaned);
      resultPayload = {
        ...parsed,
        modelUsed: modelName,
        isLiveAI: true
      };
    } catch {
      // Graceful fallback if JSON parsing fails
      resultPayload = {
        answer: candidateText,
        sources: [
          {
            clauseTitle: 'Document Reference',
            section: 'General',
            page: 1,
            snippet: sanitizedRawText ? sanitizedRawText.slice(0, 120) : 'Document content'
          }
        ],
        modelUsed: modelName,
        isLiveAI: true
      };
    }

    // Cache the successful response
    if (askCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = askCache.keys().next().value;
      if (oldestKey) askCache.delete(oldestKey);
    }
    askCache.set(cacheKey, { data: resultPayload, timestamp: Date.now() });

    return NextResponse.json(resultPayload);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process AI question' },
      { status: 500 }
    );
  }
}
