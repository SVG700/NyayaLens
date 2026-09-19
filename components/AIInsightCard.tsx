'use client';

import React from 'react';
import { ClauseTag } from '@/lib/types';
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  HelpCircle,
  FileText,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AIInsightCardProps {
  type?: 'summary' | 'explanation' | 'important' | 'review' | 'action' | 'concern';
  title?: string;
  tag?: ClauseTag | string;
  content: string;
  source?: {
    section?: string;
    page?: number;
    title?: string;
  };
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  footer?: React.ReactNode;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  type = 'explanation',
  title,
  tag,
  content,
  source,
  actionLabel,
  onAction,
  className,
  footer
}) => {
  // Map tag/type to styling & badge icons
  const getBadgeConfig = () => {
    const t = tag?.toLowerCase() || type;
    if (t.includes('concern')) {
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        icon: ShieldAlert,
        border: 'border-l-rose-500'
      };
    }
    if (t.includes('review')) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: AlertTriangle,
        border: 'border-l-amber-500'
      };
    }
    if (t.includes('important')) {
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: Info,
        border: 'border-l-blue-500'
      };
    }
    if (t.includes('action')) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: CheckCircle2,
        border: 'border-l-emerald-500'
      };
    }
    return {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: Sparkles,
      border: 'border-l-indigo-500'
    };
  };

  const badge = getBadgeConfig();
  const IconComponent = badge.icon;

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 p-5 shadow-subtle hover:shadow-card transition-all duration-200 border-l-4',
        badge.border,
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          {title && (
            <h3 className="font-semibold text-slate-900 text-base leading-snug">
              {title}
            </h3>
          )}
          {tag && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium border',
                badge.bg
              )}
            >
              <IconComponent className="w-3 h-3" />
              {tag}
            </span>
          )}
        </div>
      </div>

      <p className="text-slate-700 text-sm leading-relaxed mb-3">
        {content}
      </p>

      {(source || actionLabel || footer) && (
        <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          {source && (
            <div className="flex items-center gap-1.5 text-slate-600 font-mono bg-slate-50 px-2 py-1 rounded">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>
                {source.section && `${source.section}`}
                {source.page && ` • Page ${source.page}`}
                {source.title && ` (${source.title})`}
              </span>
            </div>
          )}

          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              aria-label={title ? `${actionLabel} for ${title}` : actionLabel}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition ml-auto"
            >
              {actionLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {footer}
        </div>
      )}
    </div>
  );
};
