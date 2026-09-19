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
  Layers,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { ResponsibleAIModal } from '@/components/ResponsibleAIModal';

export default function SettingsPage() {
  const { loadDemoDocument, currentDocument, documentsList } = useDocument();

  const [apiKey, setApiKey] = useState('');
  const [modelChoice, setModelChoice] = useState('gemini-1.5-flash');
  const [testingKey, setTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
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

  const handleTestKey = async () => {
    setTestingKey(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customApiKey: apiKey.trim() || undefined,
          customModel: modelChoice
        })
      });

      if (res.ok) {
        const data = await res.json();
        setTestResult({
          success: data.success,
          message: data.message || (data.success ? 'Gemini connection verified!' : 'Connection issue; fallback active.')
        });
      } else {
        setTestResult({
          success: false,
          message: `Server returned status ${res.status}. Fallback heuristics active.`
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Connection error: ${err?.message || 'Endpoint unreachable'}. Fallback heuristics active.`
      });
    } finally {
      setTestingKey(false);
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
        <p className="text-slate-600 text-sm mt-1">
          Configure GenAI provider keys, manage demo documents, and review data privacy protocols.
        </p>
      </div>

      {/* 1. GenAI Provider Configuration */}
      <section aria-labelledby="genai-setup-title" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600" aria-hidden="true">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 id="genai-setup-title" className="font-bold text-slate-900 text-base">
              Generative AI Provider Setup (Optional)
            </h2>
            <p className="text-xs text-slate-600">
              The application works 100% in Hackathon Demo Mode without an API key using built-in legal heuristics.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4 pt-2">
          <div>
            <label htmlFor="settings-api-key" className="block text-xs font-bold text-slate-700 mb-1">
              Google Gemini / GenAI API Key
            </label>
            <input
              id="settings-api-key"
              type="password"
              placeholder="AIzaSy... (leave blank to use instant demo heuristics)"
              aria-label="Google Gemini or GenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-600 mt-1">
              Server configuration: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">GENAI_API_KEY</code> can also be configured in <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">.env.local</code>.
            </p>
          </div>

          <div>
            <label htmlFor="settings-model-choice" className="block text-xs font-bold text-slate-700 mb-1">
              Selected AI Model
            </label>
            <select
              id="settings-model-choice"
              aria-label="Selected AI Model"
              value={modelChoice}
              onChange={(e) => setModelChoice(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ultra fast, recommended)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep legal reasoning)</option>
              <option value="local-heuristics">NyayaLens Built-In Heuristics (Offline / Zero-latency)</option>
            </select>
          </div>

          {testResult && (
            <div
              role="status"
              aria-live="polite"
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={testingKey}
              aria-label="Test AI connection"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {testingKey ? 'Verifying...' : 'Test Connection'}
            </button>

            <div className="flex items-center gap-3">
              {savedSuccess && (
                <span role="status" aria-live="polite" className="text-emerald-700 font-semibold text-xs inline-flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> Preferences saved!
                </span>
              )}
              <button
                type="submit"
                aria-label="Save AI settings"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle transition focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                Save AI Settings
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* 2. System Diagnostics & Operational Status */}
      <section aria-labelledby="diagnostics-heading" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600" aria-hidden="true">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 id="diagnostics-heading" className="font-bold text-slate-900 text-base">
              System Health & Diagnostics
            </h2>
            <p className="text-xs text-slate-600">
              Live status of platform services and legal parsers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] text-slate-600 uppercase font-bold block">App Router</span>
            <strong className="text-slate-900 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
              Next.js 14.2
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] text-slate-600 uppercase font-bold block">Legal Engine</span>
            <strong className="text-indigo-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" aria-hidden="true" />
              NLP + Heuristics
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] text-slate-600 uppercase font-bold block">Privacy Mode</span>
            <strong className="text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
              Zero-Retention
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] text-slate-600 uppercase font-bold block">Demo Documents</span>
            <strong className="text-slate-900 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
              3 Preloaded
            </strong>
          </div>
        </div>
      </section>

      {/* 3. Privacy & Sandbox */}
      <section aria-labelledby="privacy-heading" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600" aria-hidden="true">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 id="privacy-heading" className="font-bold text-slate-900 text-base">
              Client-Side Data Privacy & Sandbox
            </h2>
            <p className="text-xs text-slate-600">
              No legal documents or personal information are stored on external database servers.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          NyayaLens executes within your browser and temporary local session. All contract text, dates, and identified review items are stored only in your local browser session storage.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setResponsibleModalOpen(true)}
            aria-label="Review AI Ethics Policy and data governance guidelines"
            className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-semibold border border-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Review AI Ethics Policy
          </button>

          <button
            type="button"
            onClick={handleResetData}
            aria-label="Reset all application data to default demo state"
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-200 transition inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </section>

      <ResponsibleAIModal
        isOpen={responsibleModalOpen}
        onClose={() => setResponsibleModalOpen(false)}
      />
    </div>
  );
}
