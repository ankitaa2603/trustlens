# 🔍 TrustLens AI

> Decode hidden risks. Understand documents instantly. Build trust with AI.

TrustLens AI is an intelligent document analysis platform that helps users understand contracts, offer letters, agreements, policies, and legal documents in seconds. Instead of reading pages of complex text, users receive a trust score, risk summary, highlighted clauses, and AI-powered explanations through an interactive assistant called **Lexi**.

---

## 🚀 Problem Statement

Most people sign contracts, offer letters, privacy policies, rental agreements, and terms & conditions without fully understanding them.

Key challenges:
- Legal language is difficult to understand
- Hidden clauses often go unnoticed
- Users don't know whether a document is safe
- Reading long documents is time-consuming
- Non-technical users struggle with legal jargon

TrustLens AI solves this by transforming complex documents into easy-to-understand insights.

---

## ✨ Features

### 📄 Smart Document Analysis
Upload a document and receive:
- AI-generated Trust Score
- Risk Assessment
- Clause Breakdown
- Simplified Explanation
- Trust Timeline

---

### 🎯 Trust Score Engine
Every document receives a score from 0–100 based on:
- Risk indicators
- Document clarity
- Hidden clauses
- User safety factors

Score Categories:
- 🟢 Safe
- 🟡 Moderate Risk
- 🔴 High Risk

---

### ⚠️ Hidden Clause Detection
Highlights potentially concerning sections such as:
- Liability clauses
- Data collection clauses
- Termination conditions
- Payment obligations
- Restrictive terms

---

### 🤖 Lexi AI Assistant
Meet **Lexi**, the built-in AI guide.

Lexi can:
- Explain document content
- Answer user questions
- Simplify legal language
- Guide users through analysis results
- Provide document insights conversationally

---

### 📊 Interactive Dashboard
Users can:
- View analysis history
- Manage uploaded reports
- Track trust scores
- Access previous analyses

---

### 👤 Secure Authentication
Supports:
- Email Authentication
- Google OAuth Login
- Secure Session Management

Powered by Supabase Authentication.

---

### 🎓 Guided Onboarding Experience
New users receive:
- Interactive product tour
- Feature walkthrough
- Platform guidance
- Quick start experience

---

### 📥 Downloadable Reports
Generate and download analysis reports for:
- Contracts
- Offer Letters
- Agreements
- Legal Documents

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Supabase

### AI Layer
- Google Gemini AI

### Authentication
- Supabase Auth
- Google OAuth

### Database
- PostgreSQL (Supabase)

### Deployment
- Vercel

---

## 🏗️ Architecture

```text
User Uploads Document
          │
          ▼
 Document Processing Layer
          │
          ▼
  AI Analysis Engine
          │
          ├── Trust Score
          ├── Risk Summary
          ├── Clause Detection
          └── Recommendations
          │
          ▼
      Dashboard UI
          │
          ▼
      Lexi Assistant
```

---

## 📸 Key Modules

### Dashboard
Central hub for managing analyses and reports.

### Analysis Engine
Processes documents and generates trust insights.

### Lexi Assistant
AI-powered conversational support system.

### Authentication Module
Secure user login and onboarding.

### Report Generator
Creates downloadable trust reports.

---

## 🔒 Security & Privacy

- Secure Authentication
- Protected User Sessions
- Encrypted Communication
- No unnecessary storage of sensitive documents
- Role-based access through Supabase

---

## 🎯 Use Cases

### Students
Analyze internship and job offer letters.

### Freelancers
Review client contracts before signing.

### Employees
Understand employment agreements.

### Consumers
Review privacy policies and terms of service.

### Tenants
Analyze rental agreements.

### Startups
Verify business contracts and partnerships.

---

## 🌟 Future Scope

- Multi-language document analysis
- OCR support for scanned PDFs
- Advanced clause comparison
- Legal document benchmarking
- Organization-level analytics
- Real-time collaborative review
- AI-generated negotiation suggestions

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/ankitaa2603/trustlens.git
cd trustlens
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create:

```env
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

---

## 👩‍💻 Team

### Ankita Gupta
Project Lead & Full Stack Developer

Built for hackathons, innovation challenges, and real-world trust transparency.

---

## 🏆 Hackathon Impact

TrustLens AI empowers users to make informed decisions before signing important documents by transforming complex legal content into understandable insights.

**Trust before you sign.**
