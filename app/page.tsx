'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDocument } from '@/context/DocumentContext';
import {
  Scale,
  Sparkles,
  ArrowRight,
  FileText,
  ShieldAlert,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  GitCompare,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Search,
  UploadCloud,
  ChevronRight,
  Lock,
  Layers,
  BookOpen
} from 'lucide-react';
import { ResponsibleAIModal } from '@/components/ResponsibleAIModal';

export default function LandingPage() {
  const router = useRouter();
  const { loadDemoDocument } = useDocument();
  const [responsibleModalOpen, setResponsibleModalOpen] = useState(false);

  const handleStartDemo = () => {
    loadDemoDocument('doc-rental-001');
    router.push('/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Next-Generation Legal Intelligence</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="text-indigo-700">Grounded & Verifiable</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Understand Legal Documents.{' '}
              <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Make Informed Decisions.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              NyayaLens uses Generative AI to simplify legal documents, surface important clauses, answer document-based questions, and help you prepare for conversations with legal professionals.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={handleStartDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm shadow-card hover:shadow-card-hover transition-all duration-150 group"
              >
                <span>Analyze a Document</span>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-subtle transition"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Micro disclaimer */}
            <p className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Private & Client-Side Sandbox. Informational assistance only.</span>
            </p>
          </div>

          {/* Hero Visual: Sophisticated Mock Legal-Document Analysis Interface */}
          <div className="max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden animate-slide-up">
            {/* Mock Top Bar */}
            <div className="bg-slate-900 px-4 py-3 text-slate-300 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="h-4 w-[1px] bg-slate-700 mx-1" />
                <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Residential_Lease_Agreement_Unit4B.pdf</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  AI Analysis Complete (24 Clauses)
                </span>
              </div>
            </div>

            {/* Mock Split Analysis View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-slate-50/50">
              {/* Left: Document Excerpt Preview */}
              <div className="lg:col-span-6 p-5 sm:p-6 bg-white space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Source Document Contract View</span>
                  <span className="font-mono">Page 2 of 4</span>
                </div>

                {/* Simulated contract excerpt with clause highlight */}
                <div className="space-y-3 font-mono text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-400 text-[11px]">...Section 6: Use and Restrictions</p>
                  
                  {/* Highlighted Clause */}
                  <div className="p-3 bg-amber-50/90 border-l-4 border-amber-500 rounded-r-lg text-slate-800 transition">
                    <div className="flex items-center justify-between font-bold text-amber-950 text-xs mb-1">
                      <span>7.2 EARLY TERMINATION LIQUIDATED DAMAGES</span>
                      <span className="text-[10px] bg-amber-200/70 text-amber-900 px-1.5 py-0.2 rounded font-sans">
                        Identified Clause
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-mono">
                      "Should Tenant unilaterally vacate the Premises prior to the completion of the eleven (11) month tenure without mutual consent, Tenant shall forfeit fifty percent (50%) of the Security Deposit as liquidated damages..."
                    </p>
                  </div>

                  <p className="text-slate-400 text-[11px]">Section 8: Right of Entry and Inspections...</p>
                </div>

                {/* Timeline strip in hero */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Extracted Timeline Deadlines</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-100 rounded-lg border border-slate-200">
                      <span className="block text-[10px] font-mono text-slate-500">01 Jan 2026</span>
                      <strong className="text-slate-800 text-[11px]">Lease Begins</strong>
                    </div>
                    <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                      <span className="block text-[10px] font-mono text-indigo-600">31 Oct 2026</span>
                      <strong className="text-indigo-950 text-[11px]">Notice Window</strong>
                    </div>
                    <div className="p-2 bg-slate-100 rounded-lg border border-slate-200">
                      <span className="block text-[10px] font-mono text-slate-500">30 Nov 2026</span>
                      <strong className="text-slate-800 text-[11px]">Lease Expires</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: AI Insights & Intelligence Panel */}
              <div className="lg:col-span-6 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      NyayaLens Clause Intelligence
                    </span>
                  </div>
                  <span className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-medium">
                    AI Grounded Insight
                  </span>
                </div>

                {/* Sample Insight Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-subtle border-l-4 border-l-amber-500 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      Early Termination Deposit Penalty
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      <AlertTriangle className="w-3 h-3" />
                      Review Recommended
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Simple Language:</strong> If you move out before the 11-month lease ends, you automatically lose <strong>$1,850 (half your deposit)</strong> even if you provide standard 30 days notice.
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-700 space-y-1">
                    <div className="font-semibold text-slate-900">Why it matters:</div>
                    <div>Standard laws often require landlords to look for replacement tenants rather than imposing automatic double liquidated damages.</div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">Ref: Section 7.2 • Page 2</span>
                    <button
                      onClick={handleStartDemo}
                      className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Explain Why</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Suggested Question For Lawyer Box */}
                <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                    Suggested Question to Bring to a Lawyer:
                  </span>
                  <p className="text-indigo-900 italic font-medium">
                    "Is an automatic 50% security deposit forfeiture clause enforceable in our city if I provide 30 days written notice?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 mb-2">
              Workflow Architecture
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              From Complex Legalese to Total Clarity in 4 Steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 relative group hover:border-indigo-300 hover:shadow-card transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Upload</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drag and drop your rental agreement, employment contract, or NDA in PDF, DOCX, or text format.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 relative group hover:border-indigo-300 hover:shadow-card transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Analyze</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generative AI breaks down every section, identifying hidden liabilities, ambiguous terms, and critical obligations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 relative group hover:border-indigo-300 hover:shadow-card transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Understand</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Read plain-language translations, explore tagged review points, and view interactive deadline timelines.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 relative group hover:border-indigo-300 hover:shadow-card transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Take Action</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow an actionable checklist and walk into attorney consultations prepared with targeted, high-impact questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Capabilities */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 mb-2">
              Capabilities
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Complete Intelligence Suite for Any Legal Agreement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">AI Document Simplification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translates dense, archaic boilerplate into concise, readable everyday prose without losing legal nuances.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Clause Intelligence & Deep Dive</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Breaks down each clause into what it says, why it matters, who it affects, and what to verify before signing.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <GitCompare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Document Comparison</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compares two versions or competing offers side-by-side with automated risk impact assessments.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Ask Your Document</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conversational Q&A grounded strictly in your document with clickable section and page source citations.
              </p>
            </div>

            {/* Capability 5 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Legal Timeline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extracts effective dates, renewal windows, and notice cutoffs into an intuitive chronological road map.
              </p>
            </div>

            {/* Capability 6 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Action Checklist & Lawyer Prep</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provides actionable pre-signing tasks and pre-drafted inquiries to maximize your attorney's time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Responsible AI & Disclaimer Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
                <Scale className="w-3.5 h-3.5" />
                Ethical AI Guardrails
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Designed to Inform and Empower — Not Replace Counsel
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                NyayaLens provides AI-generated legal information for understanding and preparation. It does not replace advice from a qualified legal professional. Our objective is to make you literate in your contract so you can consult with attorneys faster and with greater confidence.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleStartDemo}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
                >
                  Explore Live Demo
                </button>
                <button
                  onClick={() => setResponsibleModalOpen(true)}
                  className="text-xs text-indigo-300 hover:text-white underline font-medium transition"
                >
                  Learn more about our Responsible AI framework
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResponsibleAIModal
        isOpen={responsibleModalOpen}
        onClose={() => setResponsibleModalOpen(false)}
      />
    </div>
  );
}
