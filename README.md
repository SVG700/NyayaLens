# NyayaLens — AI-Powered Legal Document Understanding & Assistance Platform

> **Important Legal Notice:**  
> **NyayaLens provides AI-generated legal information for understanding and preparation. It does not replace advice from a qualified legal professional.**

---

## 1. The Problem

Legal documents (residential leases, employment agreements, consulting contracts, non-disclosure agreements) are deliberately written in archaic, complex, and dense legalese. Ordinary individuals and small business owners routinely sign these agreements without:
- Understanding hidden penalties and compounding late fees.
- Identifying one-sided termination covenants or aggressive liquidated damages.
- Knowing exact statutory notice windows and inspection rights.
- Being able to afford hundreds of dollars per hour in preliminary legal consultation fees just to ask basic questions.

---

## 2. The Solution

**NyayaLens** is a modern, ethical, and privacy-conscious legal-tech SaaS platform powered by Generative AI. It translates complex legal language into plain, everyday English, extracts obligations, flags clauses deserving review, creates chronological timeline roadmaps, and provides grounded Q&A with exact section and page citations. 

Crucially, rather than claiming to replace attorneys, NyayaLens equips users with structured, high-value questions to bring to a licensed attorney—dramatically reducing billable hours and empowering informed decision-making.

---

## 3. Key Features

- **Split-Screen Document Analysis (`/analyze`)**
  - Side-by-side view with interactive source document viewer on the left and structured AI intelligence on the right.
  - Tabs for **Overview**, **Important Clauses**, **Obligations**, **Dates & Deadlines**, and **Review Points**.
  - Interactive clause jump points: clicking any clause highlights the exact text in the source document.
- **Clause Intelligence & 5-Point "Explain Why" Deep Dive**
  - Breaks down any clause into:
    1. What the clause says
    2. Why it matters
    3. Who it affects
    4. What to verify before signing
    5. Suggested tailored question for a lawyer
  - Ethically grounded tags: *Informational*, *Important*, *Review Recommended*, and *Potential Concern* (never declaring clauses definitively "legal" or "illegal").
- **Ask Your Document (`/ask`)**
  - Conversational Q&A grounded strictly in the active document text.
  - Every answer provides verified source citations with section number, page number, and verbatim excerpt quotes.
  - Suggested prompt chips for immediate testing.
- **Document Comparison Engine (`/compare`)**
  - Side-by-side comparison of two contract drafts (e.g. Standard Lease Draft A vs Revised Counter-Offer Draft B).
  - Categorized breakdown: Termination, Financial, Liability, Responsibilities, and Governance.
  - Automated AI trade-off synthesis and elevated risk highlighting.
- **Legal Timeline & Deadlines (`/timeline`)**
  - Chronological roadmap of critical milestones: commencement dates, mid-term walkthroughs, notice window cutoffs, and lease expiration.
  - Action items, days-remaining countdowns, and simulated calendar sync reminders.
- **Action Checklist & Lawyer Prep (`/checklist`)**
  - Dynamic verification checklist categorized into Pre-Signing, Immediate, Ongoing, and Legal Consultation.
  - Interactive progress indicator.
  - One-click copyable **Counsel Preparation Brief** formatted with specific, high-leverage inquiries.
- **Instant Hackathon Demo Mode & Document Selector**
  - Works 100% out of the box with zero external API key requirements.
  - Includes 3 rich, realistic synthetic contracts:
    1. *Apartment Rental Agreement* (Residential Tenancy)
    2. *Employment Agreement* (Senior Software Engineer)
    3. *Master Services Agreement* (Cloud Architecture Consulting)
- **Client-Side Privacy Sandbox**
  - Zero server persistence of sensitive legal data; contracts remain in the user's browser session.

---

## 4. Responsible AI & Legal Ethics Framework

NyayaLens follows strict ethical guidelines for AI in legal applications:
1. **Informational Only**: Prominently displays the disclaimer across the interface and in a persistent footer banner.
2. **Never Replaces Counsel**: Positions AI output as preparation for professional advice, not definitive legal determinations.
3. **Neutral Risk Classification**: Replaces binary labels ("Illegal" / "Legal") with objective risk awareness tags (*Review Recommended*, *Potential Concern*, *Important*).
4. **Source Grounding**: Discloses clause citations and page references for every generated insight to allow human verification.

---

## 5. Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components & Client Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Custom legal SaaS palette: deep navy, slate, indigo, and soft borders)
- **Icons**: Lucide React
- **Analytics & Data Visuals**: Recharts
- **State Management**: React Context (`DocumentContext`) with localStorage hydration
- **AI Abstraction**: `lib/ai` service layer supporting local heuristic extraction and Google Gemini API

---

## 6. Architecture & AI Service Layer

```
NyayaLens Architecture
┌────────────────────────────────────────────────────────┐
│                   Next.js App Router                   │
│  / (Landing)  │  /dashboard  │  /analyze  │  /compare  │
│  /ask         │  /timeline   │  /checklist│  /settings │
└──────────────────────────┬─────────────────────────────┘
                           │
                 DocumentProvider (React Context)
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
  lib/ai/ Service Layer              Local Storage Session
  ├── analyzeDocument()
  ├── answerDocumentQuestion()
  ├── compareDocuments()
  ├── generateChecklist()
  └── generateLawyerQuestions()
         │
         ├───► Local Legal Heuristics (Instant Hackathon Demo)
         └───► /api/ai/ask ──► Google Gemini API (Optional Live GenAI)
```

---

## 7. Installation & Quick Start

### Prerequisites
- Node.js 18.17+ or 20+ (tested on Node v24)
- npm or pnpm

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/NyayaLens.git
   cd NyayaLens
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **(Optional) Configure Environment Variables**:
   Copy `.env.example` to `.env.local` if you wish to connect a live Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   GENAI_API_KEY=your_gemini_api_key_here
   GENAI_MODEL=gemini-1.5-flash
   ```
   *(Note: If no API key is set, NyayaLens runs in full offline demo mode with complete legal heuristics and zero errors).*

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 8. Repository Size & Cleanliness Guarantee

The repository is strictly optimized to stay comfortably below the **10 MB submission limit**:
- No large binaries, videos, weights, or datasets committed.
- Comprehensive `.gitignore` ignores `node_modules`, `.next`, coverage, and temporary files.
- Total source code size is less than **2 MB**.

---

## 9. Project Structure

```
NyayaLens/
├── app/
│   ├── api/ai/ask/route.ts      # Optional serverless proxy for Gemini GenAI
│   ├── analyze/page.tsx         # Split-screen document analysis & clause viewer
│   ├── ask/page.tsx             # Grounded document Q&A with source citations
│   ├── checklist/page.tsx       # Action diligence checklist & lawyer prep
│   ├── compare/page.tsx         # Side-by-side contract comparison
│   ├── dashboard/page.tsx       # Dashboard with upload zone & quick actions
│   ├── settings/page.tsx        # Preferences, API key, & model configuration
│   ├── timeline/page.tsx        # Chronological dates & deadlines roadmap
│   ├── globals.css              # Custom Tailwind directives & typography
│   ├── layout.tsx               # Root layout with DocumentProvider, Navbar & Footer
│   ├── not-found.tsx            # Custom 404 page
│   └── page.tsx                 # Landing page with hero mock interface
├── components/
│   ├── AIInsightCard.tsx        # Reusable insight component with risk badges
│   ├── ClauseCard.tsx           # Clause card with plain language & original text
│   ├── ExplainWhyModal.tsx      # 5-point clause drill-down modal
│   ├── Footer.tsx               # Persistent footer with ethical disclaimer
│   ├── Navbar.tsx               # Header with navigation & demo switcher
│   ├── ResponsibleAIModal.tsx   # Responsible AI & ethics framework modal
│   └── UploadZone.tsx           # Multi-stage animated drag & drop upload
├── context/
│   └── DocumentContext.tsx      # Global document state & diligence actions
├── lib/
│   ├── ai/index.ts              # AI service layer abstraction
│   ├── mockData.ts              # 3 rich synthetic legal agreements & comparison data
│   ├── types.ts                 # TypeScript interfaces & types
│   └── utils.ts                 # Utility functions & class merger
├── public/                      # Lightweight public assets
├── .env.example                 # Example environment variables
├── .gitignore                   # Strict Git exclusion list (<10MB compliance)
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependency definitions
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind theme configuration
└── tsconfig.json                # TypeScript configuration
```

---

## 10. Future Roadmap

- Integration with official court filing registries and e-signature workflows.
- Multi-lingual translation supporting vernacular languages for regional tenancy and employment codes.
- Redline diff export to standard Microsoft Word `.docx` with tracked changes.
- Direct secure escrow verification for security deposits.

---

## 11. Disclaimer

*NyayaLens is an AI-powered legal document understanding and assistance platform. The platform does not provide legal advice, does not practice law, and is not a substitute for an attorney or law firm. Always consult a qualified legal professional for legal advice regarding your specific situation.*
