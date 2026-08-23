# ⚖️ AdhikaarAI — अपने अधिकार, अपनी भाषा में

AI-powered civic & legal rights assistant for Indian citizens — explains rights (tenant, consumer, labour, RTI, welfare schemes) in plain Hindi/English and helps take action, including auto-drafting RTI applications.

Built for **Problem Statement 3: AI for Civic and Legal Empowerment**.

## Features

- Chat assistant explaining rights in simple language
- RTI application drafting (ready to copy-paste)
- Tenant / Labour / Consumer rights guidance
- Government scheme eligibility guidance
- Quick-action buttons for common scenarios
- Works in Hindi, Hinglish, or English

## Tech Stack

- **Frontend:** Plain HTML/CSS/JS (no build step)
- **Backend:** Node.js + Express (proxies calls to Claude)
- **AI:** Anthropic Claude API (`claude-sonnet-4-6`)

## Quick Start

- Requires Node.js v18+ and an Anthropic API key ([console.anthropic.com](https://console.anthropic.com/settings/keys))
- `npm install`
- `cp .env.example .env` → add your `ANTHROPIC_API_KEY`
- `npm start` → open **http://localhost:3000**

## Deploy

**Vercel (recommended):** push to GitHub → import repo on Vercel → add `ANTHROPIC_API_KEY` env var → Deploy (`vercel.json` already configured)

**Render:** push to GitHub → New Web Service → build `npm install`, start `npm start` → add `ANTHROPIC_API_KEY` → Deploy

## Push to GitHub

```bash
git init
git add .
git commit -m "AdhikaarAI - civic rights assistant prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/adhikaar-ai.git
git push -u origin main
```
`.env` is gitignored — API key is never uploaded.

## Project Structure

- `server.js` — Express backend, proxies to Claude API
- `public/index.html` — frontend chat UI
- `vercel.json` — deployment config
- `.env.example`

## Future Scope

- WhatsApp / SMS / IVR integration for low-connectivity users
- RAG over state-wise law/scheme documents for accuracy
- Conversational form-filler for official portals
- Voice input for low-literacy users
- More regional languages beyond Hindi/English

## Disclaimer

Provides general informational guidance only — not a substitute for professional legal advice.
