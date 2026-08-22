# ⚖️ AdhikaarAI — अपने अधिकार, अपनी भाषा में

An AI-powered civic & legal rights assistant that helps everyday citizens in
India understand their rights (tenant, consumer, labour, RTI, welfare
schemes) in plain Hindi/English, and take concrete next steps — including
auto-drafting RTI applications.

Built for **Problem Statement 3: AI for Civic and Legal Empowerment**.

---

## ✨ Features

- 💬 Chat assistant that explains rights in simple language
- 📄 RTI application drafting (ready to copy-paste)
- 🏠 Tenant / 💼 Labour / 🛒 Consumer rights guidance
- 🧾 Government scheme eligibility guidance
- Quick-action buttons for common scenarios
- Works in Hindi, Hinglish, or English

---

## 🧱 Tech Stack

- **Frontend:** Plain HTML/CSS/JS (no build step, easy to read & modify)
- **Backend:** Node.js + Express (single file, proxies calls to Claude)
- **AI:** Anthropic Claude API (`claude-sonnet-4-6`)

---

## 🚀 Quick Start (Run Locally)

### 1. Prerequisites
- [Node.js](https://nodejs.org) v18 or higher installed
- An Anthropic API key → get one at https://console.anthropic.com/settings/keys

### 2. Setup

```bash
# 1. Unzip / clone the project, then move into the folder
cd adhikaar-ai

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env

# 4. Open .env and paste your API key
#    ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

### 3. Run it

```bash
npm start
```

Then open **http://localhost:3000** in your browser. That's it — the chat UI
should load and you can start asking questions.

> If `ANTHROPIC_API_KEY` is missing, the server will still start but the
> chat will return an error — double check your `.env` file.

---

## ☁️ Deploy (so you have a live link for submission)

### Option A: Deploy on Vercel (recommended, free, fastest)

1. Push this folder to a **GitHub repo** (see below).
2. Go to https://vercel.com → **New Project** → import your GitHub repo.
3. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key
4. Click **Deploy**. Vercel will give you a live URL like
   `https://adhikaar-ai.vercel.app`.

The included `vercel.json` already configures everything — no extra setup
needed.

### Option B: Deploy on Render

1. Push to GitHub.
2. On https://render.com → **New Web Service** → connect your repo.
3. Build command: `npm install`  |  Start command: `npm start`
4. Add environment variable `ANTHROPIC_API_KEY`.
5. Deploy → you'll get a URL like `https://adhikaar-ai.onrender.com`.

---

## 📤 Push to GitHub (for submission)

```bash
git init
git add .
git commit -m "AdhikaarAI - civic rights assistant prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/adhikaar-ai.git
git push -u origin main
```

**Important:** `.env` is already in `.gitignore` so your API key will NOT be
uploaded to GitHub. Never commit your real API key.

---

## 🎥 Demo Video Checklist (max 10 min)

1. Show the problem (30s) — cite the stat: citizens don't use rights due to
   bureaucratic complexity.
2. Show the chat UI — ask a tenant rights question live.
3. Click "Draft RTI" quick action → show the generated application.
4. Ask a scheme eligibility question.
5. Briefly show the code / architecture (chat.js → Express → Claude API).
6. Close with impact/scalability pitch (multilingual, low-literacy friendly,
   can plug into WhatsApp/IVR later).

---

## 🗂️ Project Structure

```
adhikaar-ai/
├── server.js          # Express backend, proxies to Claude API
├── public/
│   └── index.html     # Frontend chat UI (HTML/CSS/JS, no build step)
├── package.json
├── vercel.json         # Deployment config for Vercel
├── .env.example
└── README.md
```

---

## 🔮 Future Scope

- WhatsApp / SMS / IVR integration for low-connectivity users
- RAG over actual state-wise tenant/consumer law + scheme PDFs for higher
  accuracy
- Conversational form-filler for official portals
- Voice input for low-literacy users
- Regional language support beyond Hindi/English

---

## ⚠️ Disclaimer

This tool provides general informational guidance, not formal legal advice.
Users should consult a lawyer or the relevant government authority for
serious or urgent matters.
