'use client';

import React, { useState } from 'react';
import { useDocument } from '@/context/DocumentContext';
import { COMPARISON_DEMO_DATA } from '@/lib/mockData';
import {
  GitCompare,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  FileText,
  Layers,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ComparePage() {
  const { comparisonDocA, comparisonDocB, documentsList, setComparisonDocA, setComparisonDocB } = useDocument();

  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = ['All', 'Financial', 'Termination', 'Liability', 'Responsibilities', 'Governance'];

  const filteredItems = COMPARISON_DEMO_DATA.comparisonItems.filter((item) => {
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
          <p className="text-slate-500 text-sm mt-1">
            Evaluate clause variations, identify shifted liabilities, and compare negotiation drafts side-by-side.
          </p>
        </div>

        <Link
          href="/analyze"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle transition"
        >
          <span>Return to Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Side-by-side Document Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Document A Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle border-t-4 border-t-indigo-600 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Document A (Baseline)
            </span>
            <span className="text-xs text-slate-400">Draft 1.0</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              {COMPARISON_DEMO_DATA.docA.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Type: {COMPARISON_DEMO_DATA.docA.type} • Term: {COMPARISON_DEMO_DATA.docA.duration}
            </p>
          </div>
        </div>

        {/* Document B Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle border-t-4 border-t-purple-600 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Document B (Counter-Offer / Revision)
            </span>
            <span className="text-xs text-slate-400">Draft 2.0</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              {COMPARISON_DEMO_DATA.docB.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Type: {COMPARISON_DEMO_DATA.docB.type} • Term: {COMPARISON_DEMO_DATA.docB.duration}
            </p>
          </div>
        </div>
      </div>

      {/* 3. AI Comparative Executive Synthesis */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-white border border-purple-200/80 shadow-subtle space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-950 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>AI Comparative Synthesis & Trade-Off Analysis</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {COMPARISON_DEMO_DATA.summaryAI}
        </p>
      </div>

      {/* 4. Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          Filter:
        </span>
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap',
              selectedFilter === filter
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 5. Detailed Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 w-1/4">Category & Covenant</th>
                <th className="py-3.5 px-4 sm:px-6 w-1/4 bg-indigo-50/30 text-indigo-950">
                  Agreement A
                </th>
                <th className="py-3.5 px-4 sm:px-6 w-1/4 bg-purple-50/30 text-purple-950">
                  Agreement B
                </th>
                <th className="py-3.5 px-4 sm:px-6 w-1/4">AI Impact Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredItems.map((item, idx) => {
                const badge = getDifferenceBadge(item.differenceType);
                const BadgeIcon = badge.icon;
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    {/* Category & Field */}
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">
                          {item.field}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">
                          Impact: {item.affectedParty}
                        </span>
                      </div>
                    </td>

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
                        <BadgeIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {item.aiExplanation}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
