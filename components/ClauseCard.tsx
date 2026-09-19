'use client';

import React, { useState } from 'react';
import { Clause } from '@/lib/types';
import {
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
  Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ClauseCardProps {
  clause: Clause;
  onExplainWhy: (clause: Clause) => void;
  isHighlighted?: boolean;
}

export const ClauseCard: React.FC<ClauseCardProps> = ({
  clause,
  onExplainWhy,
  isHighlighted = false
}) => {
  const [showOriginal, setShowOriginal] = useState(false);

  // Tag coloring
  const getTagBadgeClass = (tag: string) => {
    switch (tag) {
      case 'Potential Concern':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Review Recommended':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Important':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Informational':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Financial':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Responsibilities':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div
      id={clause.id}
      className={cn(
        'bg-white rounded-xl border transition-all duration-200 p-5 shadow-subtle hover:shadow-card',
        isHighlighted
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20'
          : 'border-slate-200'
      )}
    >
      {/* Clause Header & Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
            {clause.sectionNumber}
          </span>
          <h3 className="font-bold text-slate-900 text-base">{clause.title}</h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-600 mr-1 font-mono">
            Page {clause.pageNumber}
          </span>
          {clause.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'text-[11px] px-2 py-0.5 rounded-full font-medium border',
                getTagBadgeClass(tag)
              )}
            >
              {tag}
            </span>
          ))}
          {clause.category && (
            <span
              className={cn(
                'text-[11px] px-2 py-0.5 rounded-full font-medium border',
                getTagBadgeClass(clause.category)
              )}
            >
              {clause.category}
            </span>
          )}
        </div>
      </div>

      {/* AI Plain Language Explanation */}
      <div className="bg-indigo-50/50 border border-indigo-100/80 rounded-xl p-3.5 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>NyayaLens Plain Language Interpretation</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {clause.simplifiedText}
        </p>
      </div>

      {/* Original Contract Excerpt (Expandable) */}
      <div className="border border-slate-200 rounded-lg overflow-hidden mb-3">
        <button
          type="button"
          onClick={() => setShowOriginal(!showOriginal)}
          aria-expanded={showOriginal}
          aria-controls={`original-clause-text-${clause.id}`}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition"
        >
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            {showOriginal ? 'Hide Original Contract Clause' : 'View Original Contract Clause'}
          </span>
          {showOriginal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showOriginal && (
          <div
            id={`original-clause-text-${clause.id}`}
            className="p-3 bg-white text-xs font-mono text-slate-700 italic border-t border-slate-200 leading-relaxed bg-slate-50/40"
          >
            "{clause.originalText}"
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onExplainWhy(clause)}
          aria-label={`Explain why for clause ${clause.sectionNumber}: ${clause.title}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition shadow-2xs"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-300" />
          Explain Why
        </button>

        <div className="flex items-center gap-2">
          <Link
            href={`/ask?q=Explain ${encodeURIComponent(clause.title)} in detail`}
            aria-label={`Ask a question about clause ${clause.sectionNumber}: ${clause.title}`}
            className="inline-flex items-center gap-1 text-xs text-slate-700 hover:text-indigo-600 font-medium px-2 py-1 rounded hover:bg-slate-100 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Ask Question
          </Link>
        </div>
      </div>
    </div>
  );
};
