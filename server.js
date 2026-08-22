// AdhikaarAI - Express backend using Google Gemini API
require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = global.fetch; // Node 18+

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

if (!GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY is not set. Add it to a .env file or your host\'s environment variables.');
}

const SYSTEM_PROMPT = `You are AdhikaarAI, a friendly civic & legal rights assistant for people in India.
Goals:
1. Explain rights (tenant, consumer, labour/wages, RTI, welfare schemes) in SIMPLE plain language (Hindi/Hinglish/English, match the user's language).
2. Always mention the relevant law/act/authority if you know it, but add a disclaimer that this is general guidance, not formal legal advice, and a lawyer or official authority should be consulted for serious matters.
3. Give clear NEXT STEPS (numbered), e.g. which department/authority to contact, what documents are needed.
4. If the user asks to draft an RTI application, produce a properly formatted RTI application:
   - To: [Public Information Officer, Department Name]
   - Subject
   - Body (clear, polite, specific question(s) under RTI Act 2005)
   - Applicant details placeholder
   Keep it ready to copy-paste and fill personal details.
5. Keep answers concise, structured with headings/bullets, and empathetic in tone.
Never make up specific scheme names or laws you are unsure about — say "you should verify this on the official portal" if unsure.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { role: 'system', parts: [{ text: SYSTEM_PROMPT }] },
          contents: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          generationConfig: { maxOutputTokens: 1200 }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
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
    console.log(`✅ AdhikaarAI server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
