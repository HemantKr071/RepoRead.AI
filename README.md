# RepoRead.AI

**RepoRead.AI is an AI-powered web application that helps developers automatically generate clean, professional, and comprehensive README.md files for their GitHub repositories.**

---

## Features

- One-click README generation from any GitHub repository  
- Clean, detailed sections: Installation, Usage, Features, Tech Stack, API docs, and more  
- Secure GitHub OAuth authentication  
- Interactive editor for customization before exporting

---

## Tech Stack

- **Frontend:** TypeScript, React, Tailwind CSS, Framer Motion, Shadcn UI  
- **Backend:** Node.js, Express.js, MongoDB  
- **AI Integration:** Langchain + OpenAI-compatible LLM (via API)

---

## How It Works

1. **Authenticate GitHub**
   - Users sign in via OAuth and grant secure access.
   - GitRead.AI securely exchanges a temporary code for an encrypted access token and stores it only for the session.

2. **Code Analysis**
   - The app uses **Langchain to chunk, parse, and analyze** your entire repository.
   - It understands your project’s structure, dependencies, and logic—all while preserving full context.

3. **README Generation**
   - The processed context is sent to the LLM, which generates a polished, developer-ready README.
   - The output includes detailed sections like Features, Installation, Project Architecture, API Routes, Tech Stack, and more.

---

## Watch Demo
 - **Demo Video Link:** https://drive.google.com/file/d/1Gv-ztgzuj_OO7bv5jGBXnlqikpv5VydA/view?usp=drive_link

---
## ⭐ Support This Project

If you find **RepoRead.AI** useful, consider giving the repository a star ⭐.  
It motivates me to keep improving and helps others discover the project!

Your support means a lot 🙌
---
