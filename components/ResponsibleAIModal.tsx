'use client';

import React from 'react';
import {
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Scale,
  X,
  ExternalLink
} from 'lucide-react';

interface ResponsibleAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResponsibleAIModal: React.FC<ResponsibleAIModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Responsible AI & Legal Ethics Framework
            </h3>
            <p className="text-xs text-slate-500">
              How NyayaLens safely empowers users with legal understanding
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed mb-6">
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900 text-xs font-medium flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Informational Assistance, Not Legal Counsel</p>
              NyayaLens provides AI-generated legal information for understanding and preparation. It does not replace advice from a qualified legal professional, nor does it create an attorney-client relationship.
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">Grounded Citations & Traceability</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Every summary and answer is mapped directly to corresponding clauses, section numbers, and page references so you can verify the original text.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">Neutral Risk Classification</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  We never make definitive legal determinations such as labeling clauses "Illegal" or "Binding". Instead, we highlight them as <em>Review Recommended</em>, <em>Potential Concern</em>, or <em>Important</em>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">Preparation for Qualified Professionals</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Our system generates targeted, structured questions to take to an attorney, maximizing your consultation efficiency and minimizing expensive legal billable hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-subtle transition"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
