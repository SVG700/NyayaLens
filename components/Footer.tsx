'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Info, ShieldCheck, Heart } from 'lucide-react';
import { ResponsibleAIModal } from './ResponsibleAIModal';

export const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-extrabold text-base">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Scale className="w-3.5 h-3.5" />
                </div>
                <span>NyayaLens</span>
              </div>
              <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                Empowering individuals and businesses to understand complex legal documents with Generative AI intelligence, grounded source references, and lawyer-ready preparation.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4 transition"
                >
                  <Info className="w-3.5 h-3.5" />
                  Read our Responsible AI & Legal Ethics Framework
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
                Capabilities
              </h2>
              <ul className="space-y-2">
                <li><Link href="/analyze" className="hover:text-white transition">Document Analysis</Link></li>
                <li><Link href="/compare" className="hover:text-white transition">Contract Comparison</Link></li>
                <li><Link href="/ask" className="hover:text-white transition">Ask Your Document</Link></li>
                <li><Link href="/timeline" className="hover:text-white transition">Legal Deadlines Timeline</Link></li>
                <li><Link href="/checklist" className="hover:text-white transition">Actionable Checklists</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
                Ethics & Trust
              </h2>
              <ul className="space-y-2">
                <li><button type="button" onClick={() => setModalOpen(true)} className="hover:text-white transition text-left">Grounded AI Verification</button></li>
                <li><Link href="/settings" className="hover:text-white transition">Model Transparency</Link></li>
                <li><button type="button" onClick={() => setModalOpen(true)} className="hover:text-white transition text-left">Attorney Preparation Protocol</button></li>
              </ul>
            </div>
          </div>

          {/* Mandatory Responsible AI Notice */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs leading-relaxed">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Important Legal Notice:</strong> NyayaLens provides AI-generated legal information for understanding and preparation. It does not replace advice from a qualified legal professional.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 shrink-0 font-medium underline transition text-xs"
            >
              Why Informational Only?
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} NyayaLens AI Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Synthetic Legal Demonstrations</span>
              <span>•</span>
              <span>Zero Retention Privacy Sandbox</span>
            </div>
          </div>
        </div>
      </footer>

      <ResponsibleAIModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
