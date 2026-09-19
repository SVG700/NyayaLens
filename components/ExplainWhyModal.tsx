'use client';

import React from 'react';
import { Clause } from '@/lib/types';
import {
  X,
  HelpCircle,
  AlertTriangle,
  Users,
  CheckSquare,
  MessageSquareQuote,
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface ExplainWhyModalProps {
  clause: Clause | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainWhyModal: React.FC<ExplainWhyModalProps> = ({
  clause,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusableEls || focusableEls.length === 0) return;
          const firstEl = focusableEls[0];
          const lastEl = focusableEls[focusableEls.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !clause) return null;

  const handleCopyQuestion = () => {
    navigator.clipboard.writeText(clause.explanation.suggestedQuestionForLawyer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {clause.sectionNumber}
                </span>
                <span className="text-xs text-slate-600">Page {clause.pageNumber}</span>
              </div>
              <h3 id="modal-title" className="text-lg font-bold text-slate-900 mt-0.5">
                AI Deep Dive: {clause.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal dialog"
            className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Original Text Excerpt */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              Original Contract Language
            </div>
            <p className="text-xs text-slate-700 font-mono italic leading-relaxed bg-white/80 p-3 rounded-lg border border-slate-100">
              "{clause.originalText}"
            </p>
          </div>

          {/* 1. What the clause says */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">What the clause says</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {clause.explanation.whatItSays}
              </p>
            </div>
          </div>

          {/* 2. Why it matters */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Why it matters</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {clause.explanation.whyItMatters}
              </p>
            </div>
          </div>

          {/* 3. Who it affects */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Who it affects</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {clause.explanation.whoItAffects}
              </p>
            </div>
          </div>

          {/* 4. What to verify */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">What to verify before signing</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {clause.explanation.whatToVerify}
              </p>
            </div>
          </div>

          {/* 5. Suggested question for a lawyer */}
          <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
                <MessageSquareQuote className="w-4 h-4 text-indigo-600" />
                Suggested Question for a Lawyer
              </div>
              <button
                type="button"
                onClick={handleCopyQuestion}
                aria-label="Copy suggested question for lawyer"
                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 hover:text-indigo-900 bg-white/80 px-2 py-1 rounded border border-indigo-200 shadow-2xs transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Question</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-indigo-950 font-medium italic">
              "{clause.explanation.suggestedQuestionForLawyer}"
            </p>
            <p className="text-[11px] text-indigo-700 mt-2">
              Note: Bring this tailored question when consulting a legal advisor to receive rapid, jurisdiction-specific clarity.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-600">
            Informational assistance only. Does not constitute legal counsel.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-subtle transition"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
};
