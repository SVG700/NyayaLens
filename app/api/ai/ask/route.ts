import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { documentName, rawText, question } = await req.json();

    const apiKey = process.env.GENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'No GENAI_API_KEY configured. Fallback to client heuristics.' },
        { status: 400 }
      );
    }

    const modelName = process.env.GENAI_MODEL || 'gemini-1.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const prompt = `You are NyayaLens, an AI legal document analysis assistant.
Analyze the following document snippet to answer the user's question accurately.
CRITICAL INSTRUCTIONS:
1. Provide an objective, clear, plain-language answer grounded ONLY in the text.
2. Include exact section references and page/clause context.
3. NyayaLens provides informational legal assistance and does NOT provide formal legal advice. Never state whether something is categorically legal/illegal; use 'Informational', 'Important', or 'Review Recommended'.
4. Format your JSON response strictly as:
{
  "answer": "Clear plain language answer...",
  "sources": [
    {
      "clauseTitle": "Short clause title",
      "section": "Section X.X",
      "page": 1,
      "snippet": "Verbatim quote or close excerpt from text"
    }
  ]
}

DOCUMENT NAME: ${documentName}
DOCUMENT TEXT:
${rawText ? rawText.slice(0, 10000) : 'No raw text provided.'}

USER QUESTION: ${question}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Gemini API returned status ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return NextResponse.json({ error: 'Empty response from AI' }, { status: 500 });
    }

    const parsed = JSON.parse(candidateText);
    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process AI question' },
      { status: 500 }
    );
  }
}
