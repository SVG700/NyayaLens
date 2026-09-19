'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDocument } from '@/context/DocumentContext';
import { UploadZone } from '@/components/UploadZone';
import {
  FileSearch,
  GitCompare,
  MessageSquare,
  Calendar,
  Sparkles,
  ArrowRight,
  FileText,
  Clock,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Scale,
  ExternalLink,
  Plus
} from 'lucide-react';
import { ALL_DEMO_DOCUMENTS } from '@/lib/mockData';

export default function DashboardPage() {
  const router = useRouter();
  const { currentDocument, setCurrentDocument, loadDemoDocument, documentsList } = useDocument();

  const handleOpenDoc = (doc: typeof ALL_DEMO_DOCUMENTS[0]) => {
    setCurrentDocument(doc);
    router.push('/analyze');
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* 1. Header & Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Good afternoon 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Live AI Sandbox
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Understand your legal documents with clarity, identify commitments, and prepare for counsel.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              loadDemoDocument('doc-rental-001');
              router.push('/analyze');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold transition shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Try Demo Document</span>
          </button>

          <Link
            href="/analyze"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle transition"
          >
            <FileSearch className="w-4 h-4 text-indigo-300" />
            <span>Open Current Document</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Stats Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Current Document</span>
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-2 truncate">
            {currentDocument.name}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {currentDocument.type}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Clauses Analyzed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {currentDocument.clauses.length}
          </div>
          <span className="text-[11px] text-emerald-600 block mt-0.5 font-medium">
            100% extracted & simplified
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Review Items</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {currentDocument.reviewPoints.length}
          </div>
          <span className="text-[11px] text-amber-700 block mt-0.5 font-medium">
            Requires your attention
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Key Deadlines</span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {currentDocument.dates.length}
          </div>
          <span className="text-[11px] text-indigo-600 block mt-0.5 font-medium">
            Timeline generated
          </span>
        </div>
      </div>

      {/* 3. Upload Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Upload & Analyze New Document
          </h2>
          <span className="text-xs text-slate-500">
            Instant AI clause dissection & privacy safe
          </span>
        </div>
        <UploadZone />
      </div>

      {/* 4. Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/analyze"
            className="group bg-white p-5 rounded-xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileSearch className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Analyze Document</h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore plain language clauses, obligations, and risk flags.
              </p>
            </div>
          </Link>

          <Link
            href="/compare"
            className="group bg-white p-5 rounded-xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <GitCompare className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Compare Documents</h3>
              <p className="text-xs text-slate-500 mt-1">
                Benchmark clauses between Draft A vs Draft B side-by-side.
              </p>
            </div>
          </Link>

          <Link
            href="/ask"
            className="group bg-white p-5 rounded-xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Ask a Document</h3>
              <p className="text-xs text-slate-500 mt-1">
                Ask questions and receive answers strictly cited from text.
              </p>
            </div>
          </Link>

          <Link
            href="/timeline"
            className="group bg-white p-5 rounded-xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">View Timeline</h3>
              <p className="text-xs text-slate-500 mt-1">
                Never miss an agreement deadline, notice date, or milestone.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* 5. Recent Documents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Recent Documents</h2>
          <span className="text-xs text-slate-500">
            {ALL_DEMO_DOCUMENTS.length} ready demo contracts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ALL_DEMO_DOCUMENTS.map((doc) => {
            const isCurrentlySelected = currentDocument.id === doc.id;
            return (
              <div
                key={doc.id}
                className={`bg-white rounded-xl border transition-all p-5 shadow-subtle hover:shadow-card flex flex-col justify-between ${
                  isCurrentlySelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      <FileText className="w-3 h-3 text-indigo-600" />
                      {doc.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {doc.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {doc.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {doc.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Clauses</span>
                      <strong className="text-slate-800">{doc.clauses.length} identified</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Review Points</span>
                      <strong className="text-amber-700">{doc.reviewPoints.length} items</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{doc.lastAnalyzed}</span>
                  </div>

                  <button
                    onClick={() => handleOpenDoc(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition"
                  >
                    <span>Open Analysis</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
