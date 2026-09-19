const fs = require('fs');
const path = require('path');

async function testGeminiIntegration() {
  console.log('--- Testing Gemini Live Integration ---');
  let apiKey = process.env.GEMINI_API_KEY || process.env.GENAI_API_KEY;

  if (!apiKey && fs.existsSync('.env.local')) {
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const match = envContent.match(/(?:GEMINI_API_KEY|GENAI_API_KEY)=(.*)/);
    if (match) {
      apiKey = match[1].trim().replace(/^["']|["']$/g, '');
    }
  }

  if (!apiKey) {
    console.error('FAIL: No API key found in environment or .env.local');
    return false;
  }

  const model = process.env.GENAI_MODEL || 'gemini-2.5-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const startTime = Date.now();
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Respond with JSON: {"status":"live","system":"NyayaLens"}' }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
      })
    });

    const latency = Date.now() - startTime;
    if (res.ok) {
      const data = await res.json();
      console.log(`PASS: Gemini API Connection Succeeded!`);
      console.log(`Model: ${model}`);
      console.log(`Latency: ${latency}ms`);
      console.log(`Response Status: HTTP ${res.status}`);
      return true;
    } else {
      const err = await res.text();
      console.error(`FAIL: Gemini API returned ${res.status}: ${err.slice(0, 120)}`);
      return false;
    }
  } catch (err) {
    console.error(`FAIL: Network error: ${err.message}`);
    return false;
  }
}

testGeminiIntegration();
