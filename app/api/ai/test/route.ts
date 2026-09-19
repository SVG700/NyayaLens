import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json().catch(() => ({}));
    const customApiKey = body.customApiKey;
    const customModel = body.customModel;

    const apiKey =
      customApiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.GENAI_API_KEY ||
      req.headers.get('x-gemini-api-key');

    const modelName =
      customModel ||
      process.env.GENAI_MODEL ||
      process.env.GEMINI_MODEL ||
      'gemini-2.5-flash';

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        envKeyConfigured: false,
        message: 'No GEMINI_API_KEY found in server environment or request. Built-in legal heuristics engine active.'
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: 'Respond with a short JSON greeting: {"status":"connected","engine":"NyayaLens Gemini"}'
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      })
    });

    const latencyMs = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        status: response.status,
        latencyMs,
        message: `Gemini API returned HTTP ${response.status}: ${errorText.slice(0, 150)}`
      });
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      success: true,
      envKeyConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GENAI_API_KEY),
      model: modelName,
      latencyMs,
      message: `Gemini Live Connection: Active & Verified! (Model: ${modelName}, Latency: ${latencyMs}ms)`,
      rawResponse: candidateText
    });
  } catch (error: any) {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json({
      success: false,
      latencyMs,
      message: `Connection test error: ${error?.message || 'Network failure'}. Fallback heuristics active.`
    });
  }
}
