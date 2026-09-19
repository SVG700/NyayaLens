'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDocument } from '@/context/DocumentContext';
import { answerDocumentQuestion } from '@/lib/ai';
import { ChatMessage } from '@/lib/types';
import {
  MessageSquare,
  Send,
  Sparkles,
  FileText,
  User,
  Bot,
  HelpCircle,
  RotateCcw,
  ExternalLink,
  Copy,
  Check,
  Mic,
  MicOff,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function AskDocumentContent() {
  const { currentDocument } = useDocument();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const getSuggestedQuestions = () => {
    const docType = (currentDocument.type || '').toLowerCase();
    const docId = currentDocument.id || '';

    if (docId === 'doc-employment-002' || docType.includes('employment')) {
      return [
        'What is my annual base compensation?',
        'How do the 25,000 stock options vest?',
        'Who owns personal side projects under IP assignment?',
        'What is the non-solicitation window after leaving?',
        'What severance is provided if terminated without cause?'
      ];
    }
    if (docId === 'doc-service-003' || docType.includes('service') || docType.includes('consulting')) {
      return [
        'What is the total contract fee & payment schedule?',
        'What is the milestone acceptance testing deadline?',
        'What is the liability cap for damage claims?',
        'How can either party terminate for convenience?',
        'Who is responsible for project deliverables?'
      ];
    }
    return [
      'What is the termination notice period?',
      'What happens if rent is paid late?',
      'When does this agreement expire?',
      'Who is responsible for repairs?',
      'Can I sublet or list on Airbnb?'
    ];
  };

  const suggestedQuestions = getSuggestedQuestions();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I'm your NyayaLens legal assistant for "${currentDocument.name}". Ask me any question regarding terms, notice windows, financial terms, or obligations. Every answer is grounded directly in the text with section and page citations.`,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Rehydrate welcome message when active document switches
  useEffect(() => {
    setMessages([
      {
        id: `msg-welcome-${currentDocument.id}`,
        sender: 'assistant',
        text: `Hello! I'm your NyayaLens legal assistant for "${currentDocument.name}". Ask me any question regarding terms, notice windows, financial obligations, or risk areas. Every answer is grounded directly in the text with section and page citations.`,
        timestamp: 'Just now'
      }
    ]);
  }, [currentDocument.id, currentDocument.name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle URL pre-filled query
  useEffect(() => {
    if (initialQuery && messages.length === 1) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await answerDocumentQuestion(currentDocument, textToSend, messages);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response.answer,
        timestamp: 'Just now',
        sources: response.sources
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `Based on "${currentDocument.name}", please refer to the relevant section or consult with counsel for specific advice on this question.`,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `Chat reset for "${currentDocument.name}". What would you like to verify today?`,
        timestamp: 'Just now'
      }
    ]);
  };

  const handleCopyMessage = (msg: ChatMessage) => {
    const text = `${msg.text}\n\n${
      msg.sources
        ? msg.sources.map((s) => `Source: ${s.section} • ${s.clauseTitle} (Page ${s.page})`).join('\n')
        : ''
    }`;
    navigator.clipboard.writeText(text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice dictation is supported in Chrome, Edge, and Safari.');
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (!isListening) {
        recognition.start();
        setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch {
      setIsListening(false);
    }
  };

  // Find related clause id for citation jumping
  const findClauseId = (sectionOrTitle: string) => {
    const matched = currentDocument.clauses.find(
      (c) =>
        sectionOrTitle.toLowerCase().includes(c.sectionNumber.toLowerCase()) ||
        sectionOrTitle.toLowerCase().includes(c.title.toLowerCase())
    );
    return matched ? matched.id : currentDocument.clauses[0]?.id;
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Ask Your Document
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
              Grounded AI
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Get answers grounded strictly in <strong>{currentDocument.name}</strong> with exact section references.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-600 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>

          <Link
            href="/analyze"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-subtle transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Full Document</span>
          </Link>
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="py-3 shrink-0 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
          Suggested:
        </span>
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-900 transition whitespace-nowrap shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 overflow-y-auto space-y-5 shadow-subtle my-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex gap-3 max-w-3xl',
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold',
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
              )}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Body */}
            <div
              className={cn(
                'p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 relative group',
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
              )}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Grounded Source Citation Box */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-3 border-t border-slate-200/70 mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      Verified Source Citations
                    </span>
                    <span className="text-[10px] text-emerald-600 font-sans font-semibold">
                      100% Grounded
                    </span>
                  </div>

                  {msg.sources.map((src, sIdx) => {
                    const clauseId = findClauseId(`${src.section} ${src.clauseTitle}`);
                    return (
                      <div
                        key={sIdx}
                        className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between font-mono font-semibold text-slate-900">
                          <span className="text-indigo-700">{src.section} • {src.clauseTitle}</span>
                          <span className="text-[11px] text-slate-400">Page {src.page}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-mono italic leading-relaxed bg-slate-50/80 p-2 rounded border border-slate-100">
                          "{src.snippet}"
                        </p>
                        <div className="pt-1 flex justify-end">
                          <Link
                            href={`/analyze?clause=${clauseId}`}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition"
                          >
                            <span>Jump to Clause in Document</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Message Actions */}
              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                <button
                  onClick={() => handleCopyMessage(msg)}
                  className="hover:text-slate-600 inline-flex items-center gap-1 opacity-80 hover:opacity-100 transition"
                  title="Copy answer"
                >
                  {copiedId === msg.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <span className="font-mono">{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-2xl">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>Scanning document clauses and retrieving exact sources...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-2 shrink-0 relative"
      >
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 p-2 shadow-subtle">
          <input
            type="text"
            placeholder={`Ask a question about ${currentDocument.name}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={cn(
              'p-2.5 rounded-xl transition',
              isListening
                ? 'bg-rose-100 text-rose-600 animate-pulse'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            )}
            title={isListening ? 'Listening... click to stop' : 'Click to dictate question'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white transition shadow-2xs"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-2">
          Responses are grounded in the active document. Verify key clauses with a licensed legal representative.
        </p>
      </form>
    </div>
  );
}

export default function AskDocumentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
          Loading NyayaLens AI conversation engine...
        </div>
      }
    >
      <AskDocumentContent />
    </Suspense>
  );
}
