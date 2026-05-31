# TrustLens AI

**Know What You're Signing.**

TrustLens AI is a premium legal document intelligence platform that helps users understand contracts, internship offers, rental agreements, privacy policies, and other legal documents before signing them.

## Features

- **Trust Score Engine** — 0-100 fairness scoring
- **Hidden Clause Detection** — AI-powered risk identification
- **Plain English Translation** — Complex legal language simplified
- **Trust Timeline** — Visual lifecycle of contract obligations
- **Negotiation Suggestions** — Actionable improvement points
- **Lexi AI Assistant** — Context-aware platform guide
- **Demo Mode** — Explore without an account

## Tech Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS v4
- Shadcn UI (Radix)
- Framer Motion
- Google Gemini API
- Supabase (PostgreSQL + Auth)
- Google OAuth + Email/Password Auth

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Enable Google OAuth in Authentication → Providers
4. Add your site URL to Redirect URLs: `http://localhost:3000/auth/callback`

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Mode

Visit `/demo` to explore three pre-analyzed sample documents without creating an account:

- Internship Offer Letter (Trust Score: 62)
- Rental Agreement (Trust Score: 48)
- Privacy Policy (Trust Score: 35)

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables from `.env.example`
4. Deploy

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Authenticated dashboard
│   ├── demo/             # Demo mode (no auth)
│   └── api/              # API routes
├── components/
│   ├── analysis/         # Trust Score, Timeline, Results
│   ├── dashboard/        # Dashboard layout & upload
│   ├── landing/          # Marketing page sections
│   ├── lexi/             # AI assistant
│   └── ui/               # Shadcn UI components
├── data/                 # Demo documents & FAQs
├── lib/                  # Utilities, Supabase, Gemini
└── types/                # TypeScript types
```

## License

MIT
