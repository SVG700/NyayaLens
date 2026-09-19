'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDocument } from '@/context/DocumentContext';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const UploadZone: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const { uploadDocumentFile } = useDocument();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stageText, setStageText] = useState('Uploading...');
  const [progressPercent, setProgressPercent] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setErrorMsg(null);

    // Validate size (< 25MB)
    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File exceeds 25 MB. Please upload a smaller document.');
      return;
    }

    // Validate extension
    const validExtensions = ['.pdf', '.docx', '.txt', '.doc'];
    const hasValidExt = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!hasValidExt) {
      setErrorMsg('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    setIsProcessing(true);
    setProgressPercent(10);
    setStageText('Uploading file securely...');

    try {
      await uploadDocumentFile(file, (stage, pct) => {
        setStageText(stage);
        setProgressPercent(pct);
      });

      // Complete and navigate
      setProgressPercent(100);
      setStageText('Generating AI intelligence report...');
      setTimeout(() => {
        router.push('/analyze');
      }, 500);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error analyzing document. Falling back to default demo.');
      setIsProcessing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl border-2 border-dashed transition-all duration-200 p-8 text-center bg-white shadow-subtle',
        isDragging
          ? 'border-indigo-600 bg-indigo-50/40 scale-[1.005]'
          : 'border-slate-300 hover:border-slate-400',
        className
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt,.doc"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {isProcessing ? (
        <div className="py-6 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 animate-pulse-subtle">
              <Loader2 className="w-7 h-7 animate-spin text-indigo-600" />
            </div>
            <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1" />
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>{stageText}</span>
              <span className="font-mono text-indigo-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Applying legal NLP, clause identification, and liability detection...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Upload a legal document
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Drag & drop PDF / DOCX here, or browse your local files
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle hover:shadow-card transition"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-300" />
              <span>Browse File</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 font-medium tracking-wide">
            Rental agreements • Employment Contracts • Service Agreements • NDAs
          </p>

          {errorMsg && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
