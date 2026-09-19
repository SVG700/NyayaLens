'use client';

import React, { useState, useEffect } from 'react';
import { useDocument } from '@/context/DocumentContext';
import {
  Settings,
  Key,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
  Check,
  AlertTriangle,
  Server,
  Layers
} from 'lucide-react';
import { ResponsibleAIModal } from '@/components/ResponsibleAIModal';

export default function SettingsPage() {
  const { loadDemoDocument } = useDocument();

  const [apiKey, setApiKey] = useState('');
  const [modelChoice, setModelChoice] = useState('gemini-1.5-flash');
  const [demoMode, setDemoMode] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [responsibleModalOpen, setResponsibleModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('nyayalens_custom_api_key');
      if (savedKey) setApiKey(savedKey);
      const savedModel = localStorage.getItem('nyayalens_custom_model');
      if (savedModel) setModelChoice(savedModel);
    } catch {
      // ignore
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (apiKey) {
        localStorage.setItem('nyayalens_custom_api_key', apiKey);
      } else {
        localStorage.removeItem('nyayalens_custom_api_key');
      }
      localStorage.setItem('nyayalens_custom_model', modelChoice);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleResetData = () => {
    if (confirm('Reset all analyzed documents to default demo state?')) {
      localStorage.clear();
      loadDemoDocument('doc-rental-001');
      alert('Application reset to initial demo configuration.');
    }
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Application Settings
          </h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
            Preferences & AI
          </span>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Configure GenAI provider keys, manage demo documents, and review data privacy protocols.
        </p>
      </div>

      {/* 1. GenAI Provider Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Generative AI Provider Setup (Optional)
            </h3>
            <p className="text-xs text-slate-500">
              The application works 100% in Hackathon Demo Mode without an API key using built-in legal heuristics.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Google Gemini / GenAI API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy... (leave blank to use instant demo mode)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              You can also define <code>GENAI_API_KEY</code> in your <code>.env.local</code> file on the server.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Selected AI Model
            </label>
            <select
              value={modelChoice}
              onChange={(e) => setModelChoice(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium"
            >
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ultra fast, recommended)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep legal reasoning)</option>
              <option value="local-heuristics">NyayaLens Built-In Heuristics (Offline / Zero-latency)</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {savedSuccess && (
                <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
                  <Check className="w-4 h-4" /> Preferences saved successfully
                </span>
              )}
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle transition"
            >
              Save AI Settings
            </button>
          </div>
        </form>
      </div>

      {/* 2. Privacy & Sandbox */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Client-Side Data Privacy & Sandbox
            </h3>
            <p className="text-xs text-slate-500">
              No legal documents or personal information are stored on external database servers.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          NyayaLens executes within your browser and temporary local session. All contract text, dates, and identified review items are stored only in your local browser session storage.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setResponsibleModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-semibold border border-indigo-200 transition"
          >
            Review AI Ethics Policy
          </button>

          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-200 transition inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      <ResponsibleAIModal
        isOpen={responsibleModalOpen}
        onClose={() => setResponsibleModalOpen(false)}
      />
    </div>
  );
}
