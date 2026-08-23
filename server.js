require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = global.fetch;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";

if (!GEMINI_API_KEY) {
  console.warn("⚠️  GEMINI_API_KEY not set");
}

const SYSTEM_PROMPT = `You are AdhikaarAI, a friendly civic & legal rights assistant for people in India.
Explain rights (tenant, consumer, labour, RTI, welfare schemes) in SIMPLE plain language (Hindi/Hinglish/English).
Always mention relevant law/act. Give clear NEXT STEPS.
Keep answers concise and empathetic.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages required' });
    }

    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: contents,
          generationConfig: { maxOutputTokens: 1200 }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error('Gemini error:', data);
      return res.status(response.status).json({ error: data });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', detail: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ AdhikaarAI at http://localhost:${PORT}`);
  });
}

module.exports = app;