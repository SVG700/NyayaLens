# NyayaLens — AI-Powered Legal Document Understanding & Assistance Platform

> **Important Legal Notice & Ethical Disclaimer:**  
> **NyayaLens provides AI-generated legal information for understanding, diligence, and preparation. It does NOT provide legal advice, does NOT practice law, and does NOT replace consultation with a qualified legal professional.**

[![Deployment Status](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-success)](https://nyayalens-pink.vercel.app/)
[![AI Engine](https://img.shields.io/badge/GenAI-Google%20Gemini%202.5%20Flash-blue)](https://ai.google.dev/)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2014-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 1. Challenge & Problem Statement Alignment

### Hack2Skill Challenge: "AI for Legal Assistance & Access"
Legal agreements are foundational to modern life, governing where people live (residential leases), how they work (employment agreements), and how businesses transact (master services contracts, vendor NDAs). However, the vast majority of ordinary citizens and small enterprise founders face **The Legal Access Gap**:

1. **Archaic, Inaccessible Legalese**: Standard legal contracts are written in dense, archaic terminology specifically designed for court adjudication, leaving non-lawyers unable to grasp their core rights and liabilities.
2. **Asymmetry of Information**: Landlords, corporations, and large service providers use seasoned legal teams to draft one-sided covenants, unilateral termination rights, and compounding financial penalties.
3. **Prohibitive Consultation Costs**: With initial attorney consultations costing hundreds of dollars per hour, individuals routinely sign binding agreements without preliminary legal diligence.
4. **Action Paralysis & Missed Deadlines**: Critical notice windows (such as 30-day lease exit notices, inspection walkthroughs, or cure periods) are buried within paragraphs of text, leading to accidental breach or forfeiture of deposits.

### NyayaLens Solution: The Diligence & Preparation Layer
**NyayaLens** bridges the legal access gap by providing an intelligent, ethical, and privacy-conscious legal document understanding assistant powered by **Google Gemini 2.5 Flash**. 

NyayaLens acts as a **pre-counsel preparation partner**: it translates complex covenants into plain English, extracts structured obligations and deadlines, flags clauses deserving heightened scrutiny, conducts side-by-side contract comparisons, answers document questions with verified citations, and compiles structured consultation briefs for licensed attorneys.

---

## 2. Challenge Alignment Matrix

The following matrix illustrates how every core requirement of the "AI for Legal Assistance & Access" challenge is directly addressed in NyayaLens:

| Challenge Requirement | NyayaLens Implementation | Route / Module | Evidence & Capabilities |
| :--- | :--- | :--- | :--- |
| **Legal Document Simplification** | Dual-pane split-screen reader translating dense legal provisions into plain, accessible English. | `/analyze` | Generates 4-part simple summaries (Core Premise, Financial Obligations, Exit Conditions, Main Risks). |
| **Clause Extraction & Categorization** | Automated segmentation of raw contracts into discrete clauses categorized by domain. | `/analyze`<br>`lib/ai` | Classifies into *Financial*, *Termination*, *Liability*, *Responsibilities*, *Governance*, and *Intellectual Property*. |
| **Obligation Identification** | Extraction of party-specific legal duties, deadlines, and breach consequences. | `/analyze` (Obligations tab) | Maps responsibilities per signatory (e.g., Tenant vs. Landlord, Employee vs. Employer). |
| **Deadlines & Date Tracking** | Chronological timeline roadmap with countdown indicators and calendar synchronization. | `/timeline` | Identifies commencement, notice windows, renewals; exports directly to standard iCal (`.ics`). |
| **Risk & Review Flagging** | 4-tier non-judgmental risk taxonomy with 5-point "Explain Why" interactive deep dives. | `/analyze` (Review Points) | Tags clauses as *Informational*, *Important*, *Review Recommended*, or *Potential Concern*. |
| **Grounded Document Q&A** | Conversational conversational AI answering inquiries strictly grounded in the document text. | `/ask`<br>`/api/ai/ask` | Emits verified citations (clause title, section number, page number, and verbatim excerpt snippet). |
| **Document Comparison & Diffing** | Side-by-side comparative analysis of draft revisions, counter-offers, or standard vs. amended terms. | `/compare`<br>`/api/ai/compare` | Synthesizes net trade-offs and flags elevated risk shifts (`warning`, `significant_difference`). |
| **Actionable Checklists** | Phased diligence checklists guiding users step-by-step through the agreement lifecycle. | `/checklist` | Categorizes into *Pre-Signing*, *Immediate*, *Ongoing*, and *Legal Consultation* with completion tracking. |
| **Lawyer Consultation Preparation** | Automated synthesis of high-leverage inquiries to ask licensed counsel. | `/checklist`<br>`components/ExplainWhyModal` | Generates copyable **Counsel Preparation Briefs**, designed to streamline attorney consultations by organizing facts, flagged clauses, and high-value inquiries in advance. |
| **Live GenAI Integration** | Real-time reasoning using Google's latest multimodal Gemini 2.5 Flash model. | `/api/ai/*` | Structured JSON schema enforcement, sub-1.5s latency, and server-side key security. |
| **Offline Fallback Resilience** | Built-in semantic heuristics engine providing reliable offline document parsing and grounded Q&A without requiring external API keys. | `lib/ai/index.ts`<br>`lib/mockData.ts` | Complete functionality for 3 pre-loaded agreements and uploaded custom documents without external dependencies. |
| **Responsible AI & Legal Ethics** | Prominent legal disclaimers, refusal to issue definitive legal rulings, and client-side privacy. | Persistent UI & `/` | Never states whether clauses are "illegal"; strictly informs, educates, and prompts human legal review. |

---

## 3. Target Users

NyayaLens is built for individuals and organizations that routinely interact with binding legal instruments without continuous retained counsel:

* **Tenants & Home Renters**: Moving into residential apartments, navigating security deposit return rules, subletting restrictions, maintenance allocations, and premature lease break penalties.
* **Employees & Tech Professionals**: Evaluating employment offers, non-compete enforceability, equity vesting schedules (1-year cliffs), invention assignment clauses (California Labor Code § 2870), and severance covenants.
* **Freelancers, Consultants & Agency Owners**: Reviewing Master Services Agreements (MSAs), Net-30/45 payment schedules, deemed deliverable acceptance windows, liability caps, and mutual indemnity provisions.
* **Small Business Owners & Early Founders**: Understanding commercial office leases, vendor contracts, NDAs, and contractor agreements without incurring expensive consultation fees for routine preliminary document reviews.
* **Legal Aid Clinics & Pro-Bono Volunteers**: Expediting initial client triage and intake by rapidly digesting lengthy contracts and surfacing key factual issues before attorney review.

---

## 4. In-Depth Feature Walkthrough

### 4.1. Split-Screen Document Analysis (`/analyze`)
* **Dual-Pane Experience**: The left pane presents the original legal agreement text with clean typography, search filtering, and zoom controls. The right pane provides structured AI intelligence.
* **Synchronized Highlighting**: Clicking any clause in the AI panel smoothly scrolls the document viewer and highlights the exact verbatim paragraph in the source text.
* **Multi-Dimensional Tabs**:
  * **Overview**: Executive summary, risk score breakdown, clause category distribution chart, and plain-English contract premise.
  * **Important Clauses**: Searchable, filterable list of all extracted covenants with severity badges and plain-English interpretations.
  * **Obligations**: Tabular breakdown of who is obligated to do what, under what conditions, and what occurs upon default.
  * **Dates & Deadlines**: Chronological summary of effective dates, grace periods, inspection windows, and expiration milestones.
  * **Review Points**: Critical clauses flagged for attention with specific actionable mitigation steps.

### 4.2. 5-Point "Explain Why" Deep Dive Modal
Clicking "Explain Why" on any flagged clause opens a comprehensive drill-down modal answering five critical questions:
1. **What It Says**: Verbatim excerpt and accessible layperson translation.
2. **Why It Matters**: Practical, real-world impact on rights, finances, or obligations.
3. **Who It Affects**: Specific party bearing the primary burden or receiving the benefit.
4. **What to Verify Before Signing**: Concrete checklist items and cross-references.
5. **Suggested Question for Your Lawyer**: Precise, professional inquiry to pose during legal consultation.

### 4.3. Grounded Document Q&A (`/ask`)
* **Strict Anti-Hallucination Grounding**: All answers are generated strictly from the provided contract text. If a question cannot be answered from the document, the AI explicitly states that the agreement does not contain that information.
* **Verified Source Citations**: Every response includes clickable source chips indicating:
  * Clause Title
  * Section Number (e.g., Section 3.2)
  * Page Number
  * Verbatim Excerpt Quote
* **Dual Execution Mode**: Uses live **Gemini 2.5 Flash** when configured; automatically falls back to built-in semantic heuristics if offline or unconfigured.

### 4.4. Contract Comparison Engine (`/compare`)
* **Side-by-Side Review**: Compare original vs revised drafts, counter-offers, or two standard options.
* **Three Built-in Presets**:
  1. *Residential Lease Agreement: Standard vs Proposed Amendments*
  2. *Employment Agreement: Standard Tech Offer vs Executive Track Offer*
  3. *Master Services Agreement: Standard Vendor MSA vs Enterprise Client Redlines*
* **Granular Diff Categories**: Categorized across Termination, Financial Terms, Liability Ceilings, Intellectual Property, and Governance.
* **Difference Taxonomy**: Classifies variations as `warning` (elevated risk shift), `significant_difference` (substantive terms/numbers), `minor_difference` (procedural), or `identical`.

### 4.5. Chronological Timeline & Calendar Sync (`/timeline`)
* **Milestone Roadmaps**: Visual timeline displaying contract milestones ordered chronologically.
* **Days Remaining Counter**: Dynamic indicator of pending deadlines and notice cutoffs.
* **One-Click iCal Export (`.ics`)**: Generates standard RFC-5545 calendar files that import directly into Google Calendar, Apple Calendar, or Microsoft Outlook.

### 4.6. Action Checklist & Lawyer Preparation Brief (`/checklist`)
* **Phased Diligence Checklist**: Interactive checkboxes organized into *Pre-Signing*, *Immediate*, *Ongoing*, and *Legal Consultation*.
* **Custom Tasks**: Users can add personal diligence action items with custom deadlines.
* **Counsel Preparation Brief**: Compiles all flagged clauses, ambiguities, and suggested inquiries into a formatted markdown/text brief that users can copy or print before meeting their attorney.

---

## 5. Responsible AI & Legal Ethics Framework

NyayaLens is architected from the ground up to adhere to strict ethical and legal boundaries:

1. **Informational & Educational Nature**: NyayaLens clearly states on every screen that it provides legal information and preparation assistance, not formal legal advice.
2. **Never Declares Legality**: NyayaLens explicitly avoids binary judgments ("This clause is illegal" or "This is valid"). Instead, it uses neutral, risk-aware taxonomy (*Informational*, *Important*, *Review Recommended*, *Potential Concern*) and advises consulting legal counsel.
3. **No Attorney-Client Relationship**: Using NyayaLens does not establish an attorney-client relationship.
4. **Verifiable Citations**: Every AI insight exposes its underlying source text to ensure human verification before any action is taken.
5. **Client-Side Privacy Sandbox**: Legal contracts are processed within the user's active session without persistent server-side storage or database retention of private legal agreements.

---

## 6. Architecture & System Design

```
+-------------------------------------------------------------------------+
|                        NyayaLens Application Layer                      |
|                                                                         |
|   / (Landing)    /dashboard    /analyze    /ask    /compare    /timeline|
+-------------------------------------------------------------------------+
                                    |
                    +-------------------------------+
                    | DocumentProvider (React State)|
                    | - LocalStorage Session Cache  |
                    | - Performance Memoization     |
                    +-------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+-----------------------+                       +-----------------------+
|  Client AI Heuristics |                       | Next.js API Routes    |
|  - Regex Tokenizer    |                       | (Server-Side Only)    |
|  - Category Classifier|                       +-----------------------+
|  - Offline Fallback   |                                   |
+-----------------------+                       +-----------+-----------+
                                                |                       |
                                                v                       v
                                    +-----------------------+ +-----------------+
                                    | POST /api/ai/ask      | | POST /api/ai/   |
                                    | POST /api/ai/analyze  | |      test       |
                                    | POST /api/ai/compare  | +-----------------+
                                    +-----------------------+
                                                |
                                                v (Server-Side HTTPS)
                                    +-----------------------+
                                    | Google Gemini 2.5     |
                                    | Flash API Engine      |
                                    +-----------------------+
```

---

## 7. Tech Stack & Dependencies

* **Framework**: Next.js 14 (App Router, React 18, Serverless API Routes)
* **Language**: TypeScript (Strict Mode, verified with zero type errors)
* **Styling**: Tailwind CSS with custom legal SaaS color palette
* **Icons**: Lucide React
* **Visualizations**: Recharts (Risk distribution charts and metrics)
* **GenAI Model**: Google Gemini 2.5 Flash (`gemini-2.5-flash`)
* **Testing Suite**: Vitest, React Testing Library, jsdom, v8 coverage
* **Deployment**: Vercel (Edge & Node.js Serverless runtime)

---

## 8. Installation & Setup

### Prerequisites
* Node.js 18.17+ or 20+
* npm or pnpm

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/SVG700/NyayaLens.git
cd NyayaLens

# 2. Install dependencies
npm install

# 3. (Optional) Configure Gemini API Key
# If omitted, NyayaLens operates in 100% functional Offline Demo Mode
cp .env.example .env.local
# Add your key to .env.local:
# GEMINI_API_KEY=your_actual_key_here
# GENAI_MODEL=gemini-2.5-flash

# 4. Run the automated test suite
npm test

# 5. Start the local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 9. Automated Testing & Verification

NyayaLens includes a comprehensive automated test suite covering all critical workflows:

```bash
# Run all unit and integration tests
npm test

# Run tests with code coverage report
npm run test:coverage
```

### Test Coverage Highlights
* **AI Service Layer**: Validates heuristic clause parsing, offline fallback transitions, grounded Q&A citation matching, and comparison syntheses.
* **API Endpoints**: Tests `/api/ai/ask`, `/api/ai/analyze`, `/api/ai/compare`, and `/api/ai/test` for JSON parsing, error status codes (400, 500, 502), and secret protection.
* **Document Diligence**: Tests checklist toggle states, dynamic task insertion, and milestone calendar generation.
* **Responsible AI & Risk Classification**: Verifies that risk tags adhere to non-judgmental classifications and that no forbidden claims of legal authority are made.

---

## 10. Security, Privacy & Repository Hygiene

* **Zero Secret Exposure**: The `GEMINI_API_KEY` is strictly confined to server-side execution via Next.js API route handlers. It is never bundled into client-side JavaScript or exposed via responses.
* **Strict Git Exclusions**: `.env*`, `*.pem`, `*.key`, and build artifacts are strictly ignored via `.gitignore`.
* **Repository Size Compliance**: Total Git repository size is strictly controlled and verified to remain well under the **10.0 MB** Hack2Skill limit.
* **Security Headers**: Production HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) are enforced on all routes.

---

## 11. Disclaimer

*NyayaLens provides AI-generated legal information for understanding and preparation. It does not replace advice from a qualified legal professional. NyayaLens is not a law firm, does not provide legal representation, and does not conduct formal legal practice. Consult a licensed attorney in your jurisdiction for specific legal counsel.*
