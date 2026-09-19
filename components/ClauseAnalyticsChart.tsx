'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { LegalDocument } from '@/lib/types';
import { PieChart as PieIcon, BarChart3, Sparkles } from 'lucide-react';

interface ClauseAnalyticsChartProps {
  document: LegalDocument;
}

const CATEGORY_COLORS = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

export const ClauseAnalyticsChart: React.FC<ClauseAnalyticsChartProps> = ({ document }) => {
  const [mounted, setMounted] = useState(false);
  const pieContainerRef = useRef<HTMLDivElement>(null);
  const barContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const sanitizeAriaHidden = (container: HTMLDivElement | null) => {
      if (!container) return;
      const elements = container.querySelectorAll('*');
      elements.forEach((el) => {
        if ((el as HTMLElement).tabIndex >= 0 || el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '-1');
        }
      });
    };

    sanitizeAriaHidden(pieContainerRef.current);
    sanitizeAriaHidden(barContainerRef.current);

    const timer = setTimeout(() => {
      sanitizeAriaHidden(pieContainerRef.current);
      sanitizeAriaHidden(barContainerRef.current);
    }, 300);

    return () => clearTimeout(timer);
  }, [mounted, document]);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-slate-400">
        Loading analytics charts...
      </div>
    );
  }

  // 1. Calculate Category breakdown
  const categoryCounts: Record<string, number> = {};
  document.clauses.forEach((c) => {
    const cat = c.category || 'General';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count
  }));

  // 2. Calculate Risk / Severity breakdown
  const riskCounts = {
    Informational: 0,
    Important: 0,
    'Review Recommended': 0,
    'Potential Concern': 0
  };

  document.clauses.forEach((c) => {
    c.tags.forEach((tag) => {
      if (tag in riskCounts) {
        riskCounts[tag as keyof typeof riskCounts]++;
      }
    });
  });

  const riskData = [
    { name: 'Informational', count: riskCounts.Informational, color: '#64748b' },
    { name: 'Important', count: riskCounts.Important, color: '#3b82f6' },
    { name: 'Review Recommended', count: riskCounts['Review Recommended'], color: '#f59e0b' },
    { name: 'Potential Concern', count: riskCounts['Potential Concern'], color: '#f43f5e' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Chart 1: Clause Category Distribution */}
      <div
        role="region"
        aria-label="Clause Category Distribution chart"
        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center" aria-hidden="true">
              <PieIcon className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Category Distribution
            </h3>
          </div>
          <span className="text-[10px] text-slate-600 font-mono">
            {document.clauses.length} total clauses
          </span>
        </div>

        {/* Screen Reader accessible summary */}
        <div className="sr-only">
          <p>Clause breakdown by category:</p>
          <ul>
            {categoryData.map((entry) => (
              <li key={entry.name}>
                {entry.name}: {entry.count} clauses
              </li>
            ))}
          </ul>
        </div>

        <div ref={pieContainerRef} className="h-48 w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="count"
                tabIndex={-1}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '11px',
                  padding: '6px 10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-100">
          {categoryData.map((entry, idx) => (
            <div key={entry.name} className="flex items-center gap-1.5 text-[11px] text-slate-700">
              <span
                className="w-2.5 h-2.5 rounded-full"
                aria-hidden="true"
                style={{ backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }}
              />
              <span>{entry.name}</span>
              <span className="font-bold text-slate-900">({entry.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart 2: Attention & Risk Distribution */}
      <div
        role="region"
        aria-label="Clause Attention and Risk Profile chart"
        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Attention & Risk Profile
            </h3>
          </div>
          <span className="text-[10px] text-slate-600 font-mono">
            Evaluated by NyayaLens
          </span>
        </div>

        {/* Screen Reader accessible summary */}
        <div className="sr-only">
          <p>Clause breakdown by risk level:</p>
          <ul>
            {riskData.map((entry) => (
              <li key={entry.name}>
                {entry.name}: {entry.count} flags
              </li>
            ))}
          </ul>
        </div>

        <div ref={barContainerRef} className="h-48 w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#475569' }} interval={0} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#475569' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '11px',
                  padding: '6px 10px'
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {riskData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-600">
          <span>Objective classifications</span>
          <span className="font-semibold text-amber-800">
            {riskCounts['Review Recommended'] + riskCounts['Potential Concern']} high-attention flags
          </span>
        </div>
      </div>
    </div>
  );
};
