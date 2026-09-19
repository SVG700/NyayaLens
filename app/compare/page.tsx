'use client';

import React, { useState } from 'react';
import { useDocument } from '@/context/DocumentContext';
import { COMPARISON_PRESETS, ComparisonPreset } from '@/lib/mockData';
import {
  GitCompare,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Copy,
  Check,
  Printer,
  Scale,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ComparePage() {
  const [activePresetKey, setActivePresetKey] = useState<string>('lease');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [liveSynthesis, setLiveSynthesis] = useState<string | null>(null);
  const [isLiveGenerating, setIsLiveGenerating] = useState(false);

  const activePreset: ComparisonPreset = COMPARISON_PRESETS[activePresetKey] || COMPARISON_PRESETS.lease;

  const handleLiveGeminiSynthesis = async () => {
    setIsLiveGenerating(true);
    try {
      const res = await fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docAName: activePreset.docA.name,
          docAText: activePreset.comparisonItems.map((i) => `${i.field}: ${i.docAValue}`).join('\n'),
          docBName: activePreset.docB.name,
          docBText: activePreset.comparisonItems.map((i) => `${i.field}: ${i.docBValue}`).join('\n')
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.summaryAI) {
          setLiveSynthesis(data.summaryAI);
        }
      }
    } catch {
      // Graceful fallback to default preset synthesis
    } finally {
      setIsLiveGenerating(false);
    }
  };

  // Extract categories dynamically from active preset
  const categories = ['All', ...Array.from(new Set(activePreset.comparisonItems.map((item) => item.category)))];

  const filteredItems = activePreset.comparisonItems.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  const getDifferenceBadge = (diffType: string) => {
    switch (diffType) {
      case 'warning':
        return {
          label: 'Elevated Risk',
          class: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: ShieldAlert
        };
      case 'significant_difference':
        return {
          label: 'Key Difference',
          class: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: AlertTriangle
        };
      case 'minor_difference':
        return {
          label: 'Minor Variation',
          class: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Info
        };
      default:
        return {
          label: 'Standard',
          class: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: CheckCircle2
        };
    }
  };

  const handleCopyComparison = () => {
    const report = `NYAYALENS CONTRACT COMPARISON REPORT
Comparison Scenario: ${activePreset.label}
Category: ${activePreset.category}

Document A (Baseline): ${activePreset.docA.name} (${activePreset.docA.type})
Document B (Counter-Offer): ${activePreset.docB.name} (${activePreset.docB.type})

AI COMPARATIVE SYNTHESIS & TRADE-OFF ANALYSIS:
${activePreset.summaryAI}

DETAILED COVENANT COMPARISON:
${activePreset.comparisonItems
  .map(
    (item) =>
      `[${item.category}] ${item.field} (Impact: ${item.affectedParty})
  • Baseline (A): ${item.docAValue}
  • Counter (B):  ${item.docBValue}
  • AI Assessment: ${item.aiExplanation}`
  )
  .join('\n\n')}

Disclaimer: NyayaLens provides AI-generated legal information for understanding and preparation. It does not replace advice from a qualified legal professional.`;

    navigator.clipboard.writeText(report);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const riskCount = activePreset.comparisonItems.filter((i) => i.differenceType === 'warning').length;
  const keyDiffCount = activePreset.comparisonItems.filter((i) => i.differenceType === 'significant_difference').length;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Compare Legal Documents
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
              Diff Intelligence
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Evaluate clause variations, identify shifted liabilities, and compare negotiation drafts side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyComparison}
            aria-label="Copy comparison report to clipboard"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>Copied Report</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print or export comparison report"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span>Print Report</span>
          </button>

          <Link
            href="/analyze"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle transition"
            aria-label="Return to document analysis workspace"
          >
            <span>Return to Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* 2. Preset Scenario Selector */}
      <section aria-labelledby="preset-scenario-title" className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 id="preset-scenario-title" className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-600" aria-hidden="true" />
            <span>Select Comparison Preset Scenario</span>
          </h2>
          <span className="text-xs text-slate-600">
            Compare baseline draft against counter-offer or revision
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="group" aria-label="Comparison preset scenarios">
          {Object.entries(COMPARISON_PRESETS).map(([key, preset]) => {
            const isSelected = activePresetKey === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Select comparison preset: ${preset.label.split(':')[0]}`}
                onClick={() => {
                  setActivePresetKey(key);
                  setSelectedFilter('All');
                  setLiveSynthesis(null);
                }}
                className={cn(
                  'p-3.5 rounded-xl text-left border transition relative text-xs space-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500',
                  isSelected
                    ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-1 ring-purple-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {preset.category}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-purple-600" aria-hidden="true" />
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                  {preset.label.split(':')[0]}
                </h3>
                <p className="text-[11px] text-slate-600 line-clamp-1">
                  {preset.docA.name} vs {preset.docB.name}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Side-by-side Document Selectors */}
      <section aria-labelledby="side-by-side-title">
        <h2 id="side-by-side-title" className="sr-only">Compared Document Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Document A Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle border-t-4 border-t-indigo-600 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Document A (Baseline)
              </span>
              <span className="text-xs text-slate-600 font-medium">Draft 1.0</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                {activePreset.docA.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Type: {activePreset.docA.type} • Term: {activePreset.docA.duration}
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Parties: {activePreset.docA.parties}
              </p>
            </div>
          </div>

          {/* Document B Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle border-t-4 border-t-purple-600 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Document B (Counter-Offer / Revision)
              </span>
              <span className="text-xs text-slate-600 font-medium">Draft 2.0</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                {activePreset.docB.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Type: {activePreset.docB.type} • Term: {activePreset.docB.duration}
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Parties: {activePreset.docB.parties}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact Summary Badges Strip */}
      <section aria-labelledby="comparison-metrics-title">
        <h2 id="comparison-metrics-title" className="sr-only">Comparison Impact Metrics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
              Compared Covenants
            </span>
            <strong className="text-sm font-extrabold text-slate-900 block mt-0.5">
              {activePreset.comparisonItems.length} Key Clauses
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 shadow-2xs">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
              Elevated Risk Flags
            </span>
            <strong className="text-sm font-extrabold text-rose-800 block mt-0.5">
              {riskCount} Significant Shifts
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Key Differences
            </span>
            <strong className="text-sm font-extrabold text-amber-800 block mt-0.5">
              {keyDiffCount} Substantive Changes
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              Analysis Method
            </span>
            <strong className="text-sm font-extrabold text-emerald-800 block mt-0.5">
              Side-by-Side Diff
            </strong>
          </div>
        </div>
      </section>

      {/* 5. AI Comparative Executive Synthesis */}
      <section
        aria-labelledby="synthesis-title"
        role="status"
        aria-live="polite"
        className="p-6 rounded-2xl bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-white border border-purple-200/80 shadow-subtle space-y-3"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 id="synthesis-title" className="flex items-center gap-2 text-xs font-bold text-purple-950 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-600" aria-hidden="true" />
            <span>AI Comparative Synthesis & Trade-Off Analysis</span>
            {liveSynthesis && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Live Gemini Response
              </span>
            )}
          </h2>

          <button
            type="button"
            onClick={handleLiveGeminiSynthesis}
            disabled={isLiveGenerating}
            aria-label="Regenerate comparison synthesis with live Gemini"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white text-xs font-semibold shadow-2xs transition self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <Sparkles className={cn('w-3.5 h-3.5', isLiveGenerating && 'animate-spin')} aria-hidden="true" />
            <span>{isLiveGenerating ? 'Synthesizing with Gemini...' : 'Regenerate with Live Gemini'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {liveSynthesis || activePreset.summaryAI}
        </p>
      </section>

      {/* 6. Category Filters */}
      <div role="group" aria-label="Filter covenants by category" className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
          Filter:
        </span>
        {categories.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={selectedFilter === filter}
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-slate-500',
              selectedFilter === filter
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 7. Detailed Comparison Table */}
      <section aria-labelledby="comparison-table-title" className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <h2 id="comparison-table-title" className="sr-only">Detailed Covenant Comparison Matrix</h2>
        <div className="overflow-x-auto">
          <table aria-label="Detailed covenant comparison table" className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/4">Category & Covenant</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/4 bg-indigo-50/30 text-indigo-950">
                  {activePreset.docA.name}
                </th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/4 bg-purple-50/30 text-purple-950">
                  {activePreset.docB.name}
                </th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 w-1/4">AI Impact Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredItems.map((item, idx) => {
                const badge = getDifferenceBadge(item.differenceType);
                const BadgeIcon = badge.icon;
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    {/* Category & Field */}
                    <th scope="row" className="py-4 px-4 sm:px-6 align-top font-normal text-left">
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {item.category}
                        </span>
                        <div className="font-bold text-slate-900 text-sm mt-1">
                          {item.field}
                        </div>
                        <span className="text-[11px] text-slate-600 block">
                          Impact: {item.affectedParty}
                        </span>
                      </div>
                    </th>

                    {/* Doc A Value */}
                    <td className="py-4 px-4 sm:px-6 align-top font-medium text-slate-800 bg-indigo-50/10">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-[11px] leading-relaxed">
                        {item.docAValue}
                      </div>
                    </td>

                    {/* Doc B Value */}
                    <td className="py-4 px-4 sm:px-6 align-top font-medium text-slate-800 bg-purple-50/10">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-[11px] leading-relaxed">
                        {item.docBValue}
                      </div>
                    </td>

                    {/* AI Explanation & Badge */}
                    <td className="py-4 px-4 sm:px-6 align-top space-y-2">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border',
                          badge.class
                        )}
                      >
                        <BadgeIcon className="w-3 h-3" aria-hidden="true" />
                        {badge.label}
                      </span>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        {item.aiExplanation}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Responsible AI Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
        <p className="text-xs text-slate-600 font-medium">
          ⚖️ <strong>Responsible AI Note:</strong> NyayaLens comparison metrics identify textual divergences and contractual risk shifts. This comparison is prepared for informational synthesis and negotiation preparation, and does not constitute a legal endorsement or substitute for professional counsel.
        </p>
      </div>
    </div>
  );
}
