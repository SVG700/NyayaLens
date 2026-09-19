import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documentName, rawText, question, conversationHistory, customApiKey } = body;

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
${rawText ? rawText.slice(0, 15000) : 'No raw text provided.'}

USER INQUIRY:
${question}`;

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

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({
        ...parsed,
        modelUsed: modelName,
        isLiveAI: true
      });
    } catch {
      // Graceful fallback if JSON parsing fails
      return NextResponse.json({
        answer: candidateText,
        sources: [
          {
            clauseTitle: 'Document Reference',
            section: 'General',
            page: 1,
            snippet: rawText ? rawText.slice(0, 120) : 'Document content'
          }
        ],
        modelUsed: modelName,
        isLiveAI: true
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process AI question' },
      { status: 500 }
    );
  }
}
