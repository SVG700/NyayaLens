'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDocument } from '@/context/DocumentContext';
import { Clause, ClauseCategory, ClauseTag } from '@/lib/types';
import { ClauseCard } from '@/components/ClauseCard';
import { ExplainWhyModal } from '@/components/ExplainWhyModal';
import { AIInsightCard } from '@/components/AIInsightCard';
import { ClauseAnalyticsChart } from '@/components/ClauseAnalyticsChart';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ArrowRight,
  Printer,
  MessageSquare,
  BookOpen,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function AnalyzeContent() {
  const { currentDocument } = useDocument();
  const searchParams = useSearchParams();
  const initialClause = searchParams.get('clause');

  const [activeTab, setActiveTab] = useState<
    'overview' | 'clauses' | 'obligations' | 'dates' | 'review'
  >('overview');
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [highlightedClauseId, setHighlightedClauseId] = useState<string | null>(initialClause || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewerSearch, setViewerSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSimpleSection, setExpandedSimpleSection] = useState<string | null>('core');
  const [textSize, setTextSize] = useState<'xs' | 'sm' | 'base'>('xs');

  useEffect(() => {
    if (initialClause) {
      setHighlightedClauseId(initialClause);
      const element = document.getElementById(`doc-clause-${initialClause}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }, [initialClause]);

  const handleExplainWhy = (clause: Clause) => {
    setSelectedClause(clause);
    setIsExplainModalOpen(true);
  };

  const handleSelectClauseForViewer = (clause: Clause) => {
    setHighlightedClauseId(clause.id);
    const element = document.getElementById(`doc-clause-${clause.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filter clauses for AI tab
  const filteredClauses = currentDocument.clauses.filter((clause) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      clause.category === selectedCategory ||
      clause.tags.includes(selectedCategory as ClauseTag);
    const matchesSearch =
      clause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clause.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clause.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter clauses inside Document Viewer
  const viewerClauses = currentDocument.clauses.filter((clause) => {
    if (!viewerSearch.trim()) return true;
    const q = viewerSearch.toLowerCase();
    return (
      clause.title.toLowerCase().includes(q) ||
      clause.sectionNumber.toLowerCase().includes(q) ||
      clause.originalText.toLowerCase().includes(q)
    );
  });

  const getTextClass = () => {
    switch (textSize) {
      case 'base':
        return 'text-sm leading-relaxed';
      case 'sm':
        return 'text-xs leading-relaxed';
      default:
        return 'text-[11px] leading-relaxed';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-100/60">
      {/* 1. Page Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {currentDocument.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  AI Analysis Complete
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {currentDocument.type} • {currentDocument.parties.join(' & ')} • {currentDocument.governingLaw}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Analysis</span>
            </button>

            <Link
              href="/ask"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-semibold transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ask Document</span>
            </Link>

            <Link
              href="/checklist"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle transition"
            >
              <span>Action Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Split-Screen Main Workspace */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Document Viewer (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden flex flex-col h-[820px]">
            {/* Viewer Header & Controls */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2 font-mono font-medium">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Document Viewer</span>
                </div>

                {/* Font Size & Zoom Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTextSize('xs')}
                    className={cn(
                      'px-1.5 py-0.5 rounded text-[10px] font-mono border',
                      textSize === 'xs'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    )}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setTextSize('sm')}
                    className={cn(
                      'px-1.5 py-0.5 rounded text-[10px] font-mono border',
                      textSize === 'sm'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    )}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setTextSize('base')}
                    className={cn(
                      'px-1.5 py-0.5 rounded text-[10px] font-mono border',
                      textSize === 'base'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    )}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Viewer Search Bar */}
              <div className="relative">
                <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter clauses in document..."
                  value={viewerSearch}
                  onChange={(e) => setViewerSearch(e.target.value)}
                  className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Document Content Scroll Area */}
            <div className="p-6 overflow-y-auto font-mono text-xs text-slate-700 leading-relaxed space-y-6 flex-1 bg-white select-text">
              <div className="text-center pb-4 border-b border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-sans font-semibold">
                  Original Legal Instrument
                </span>
                <h2 className="text-sm font-bold text-slate-900 uppercase font-sans mt-1">
                  {currentDocument.name}
                </h2>
                <span className="text-[11px] text-slate-500 font-sans block mt-1">
                  Governing Jurisdiction: {currentDocument.governingLaw}
                </span>
              </div>

              {/* Render structured clauses inside document viewer */}
              {viewerClauses.map((clause) => {
                const isSelected = highlightedClauseId === clause.id;
                return (
                  <div
                    key={clause.id}
                    id={`doc-clause-${clause.id}`}
                    onClick={() => {
                      setHighlightedClauseId(clause.id);
                      setSelectedClause(clause);
                    }}
                    className={cn(
                      'p-3.5 rounded-xl border transition-all cursor-pointer relative',
                      isSelected
                        ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    )}
                  >
                    <div className="flex items-center justify-between font-sans text-xs font-bold text-slate-800 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px] font-mono">
                          {clause.sectionNumber}
                        </span>
                        <span>{clause.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Page {clause.pageNumber}
                      </span>
                    </div>

                    <p className={cn('text-slate-700 font-mono', getTextClass())}>
                      "{clause.originalText}"
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-sans">
                      <span className="text-indigo-600 font-semibold">
                        Click to view AI breakdown →
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExplainWhy(clause);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-900 text-white font-medium hover:bg-indigo-600 transition"
                      >
                        Explain
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: AI Analysis Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-subtle flex flex-col h-[820px] overflow-hidden">
            {/* Tabs Navigation */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'clauses', label: `Important Clauses (${currentDocument.clauses.length})` },
                { id: 'obligations', label: `Obligations (${currentDocument.obligations.length})` },
                { id: 'dates', label: `Dates (${currentDocument.dates.length})` },
                { id: 'review', label: `Review Points (${currentDocument.reviewPoints.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'px-3 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap',
                    activeTab === tab.id
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents Area */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Overview Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Document Type
                      </span>
                      <strong className="text-xs text-slate-900 mt-1 block">
                        {currentDocument.type}
                      </strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Parties
                      </span>
                      <strong className="text-xs text-slate-900 mt-1 block truncate">
                        {currentDocument.parties[0]?.split(':')[0] || 'Tenant'} / {currentDocument.parties[1]?.split(':')[0] || 'Landlord'}
                      </strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Duration
                      </span>
                      <strong className="text-xs text-slate-900 mt-1 block">
                        {currentDocument.duration}
                      </strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Important Dates
                      </span>
                      <strong className="text-xs text-indigo-700 mt-1 block">
                        {currentDocument.dates.length} identified
                      </strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Clauses
                      </span>
                      <strong className="text-xs text-emerald-700 mt-1 block">
                        {currentDocument.totalClauses} analyzed
                      </strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Review Recommendations
                      </span>
                      <strong className="text-xs text-amber-700 mt-1 block">
                        {currentDocument.reviewPoints.length} flags
                      </strong>
                    </div>
                  </div>

                  {/* Clause Analytics Chart */}
                  <ClauseAnalyticsChart document={currentDocument} />

                  {/* AI Summary Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-100 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-900">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Executive AI Summary</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {currentDocument.summary}
                    </p>
                  </div>

                  {/* Read in Simple Language Expandable Sections */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      Read In Simple Language
                    </h3>

                    {/* Simple Item 1 */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          setExpandedSimpleSection(
                            expandedSimpleSection === 'core' ? null : 'core'
                          )
                        }
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                      >
                        <span className="font-bold text-slate-900 text-xs">
                          1. Core Premise & Agreement Scope
                        </span>
                        {expandedSimpleSection === 'core' ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {expandedSimpleSection === 'core' && (
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                          {currentDocument.simpleLanguageSummary.corePremise}
                        </div>
                      )}
                    </div>

                    {/* Simple Item 2 */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          setExpandedSimpleSection(
                            expandedSimpleSection === 'financial' ? null : 'financial'
                          )
                        }
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                      >
                        <span className="font-bold text-slate-900 text-xs">
                          2. Financial Commitments & Security Escrow
                        </span>
                        {expandedSimpleSection === 'financial' ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {expandedSimpleSection === 'financial' && (
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                          {currentDocument.simpleLanguageSummary.financialSummary}
                        </div>
                      )}
                    </div>

                    {/* Simple Item 3 */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          setExpandedSimpleSection(
                            expandedSimpleSection === 'exit' ? null : 'exit'
                          )
                        }
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                      >
                        <span className="font-bold text-slate-900 text-xs">
                          3. Exit Conditions & Termination Rules
                        </span>
                        {expandedSimpleSection === 'exit' ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {expandedSimpleSection === 'exit' && (
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                          {currentDocument.simpleLanguageSummary.exitConditions}
                        </div>
                      )}
                    </div>

                    {/* Simple Item 4 */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          setExpandedSimpleSection(
                            expandedSimpleSection === 'risks' ? null : 'risks'
                          )
                        }
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                      >
                        <span className="font-bold text-slate-900 text-xs text-amber-900">
                          4. Main Clauses Deserving Attention
                        </span>
                        {expandedSimpleSection === 'risks' ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {expandedSimpleSection === 'risks' && (
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                          {currentDocument.simpleLanguageSummary.mainRisks}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: IMPORTANT CLAUSES */}
              {activeTab === 'clauses' && (
                <div className="space-y-4 animate-fade-in">
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search clause by keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
                    >
                      <option value="All">All Categories</option>
                      <option value="Financial">Financial</option>
                      <option value="Termination">Termination</option>
                      <option value="Responsibilities">Responsibilities</option>
                      <option value="Review Recommended">Review Recommended</option>
                      <option value="Potential Concern">Potential Concern</option>
                    </select>
                  </div>

                  {/* List of Clause Cards */}
                  <div className="space-y-4">
                    {filteredClauses.map((clause) => (
                      <div
                        key={clause.id}
                        onClick={() => handleSelectClauseForViewer(clause)}
                      >
                        <ClauseCard
                          clause={clause}
                          onExplainWhy={handleExplainWhy}
                          isHighlighted={highlightedClauseId === clause.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: OBLIGATIONS */}
              {activeTab === 'obligations' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-500">
                    Extracted commitments divided by contracting party. Identifies operational obligations and penalties for default.
                  </p>

                  <div className="space-y-3">
                    {currentDocument.obligations.map((ob) => (
                      <div
                        key={ob.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-2 border-l-4 border-l-indigo-500"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                            {ob.party} Obligation
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {ob.originalSection}
                          </span>
                        </div>

                        <p className="text-xs text-slate-800 font-medium leading-relaxed">
                          {ob.description}
                        </p>

                        {ob.consequence && (
                          <div className="text-[11px] p-2 bg-slate-50 rounded text-slate-600 border border-slate-100">
                            <span className="font-semibold text-slate-800">Consequence of breach: </span>
                            {ob.consequence}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: DATES */}
              {activeTab === 'dates' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Chronological schedule of key milestones and termination notice windows.
                    </p>
                    <Link
                      href="/timeline"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Full Timeline View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {currentDocument.dates.map((dt) => (
                      <div
                        key={dt.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {dt.formattedDate}
                            </span>
                            <span className="font-bold text-slate-900 text-xs">
                              {dt.event}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {dt.explanation}
                          </p>
                          <div className="mt-2 text-[11px] text-indigo-900 font-medium bg-indigo-50/50 p-2 rounded">
                            <strong>Action Required: </strong> {dt.actionRequired}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEW POINTS */}
              {activeTab === 'review' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-500">
                    Clauses and conditions that deserve careful evaluation or discussion with a legal representative.
                  </p>

                  <div className="space-y-4">
                    {currentDocument.reviewPoints.map((rp) => (
                      <AIInsightCard
                        key={rp.id}
                        title={rp.title}
                        tag={rp.severity}
                        content={rp.summary}
                        actionLabel="View Guidance"
                        onAction={() => {
                          const clause = currentDocument.clauses.find((c) => c.id === rp.clauseId);
                          if (clause) handleExplainWhy(clause);
                        }}
                        footer={
                          <div className="w-full mt-2 pt-2 border-t border-slate-100 text-slate-600 text-[11px]">
                            <strong>Actionable Step:</strong> {rp.actionableStep}
                          </div>
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explain Why Modal */}
      <ExplainWhyModal
        clause={selectedClause}
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
      />
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
          Loading Document Analysis Workspace...
        </div>
      }
    >
      <AnalyzeContent />
    </Suspense>
  );
}
