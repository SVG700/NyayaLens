'use client';

import React, { useState } from 'react';
import { useDocument } from '@/context/DocumentContext';
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Bell,
  ArrowRight,
  FileText,
  Sparkles,
  CalendarCheck,
  Check,
  Download,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function TimelinePage() {
  const { currentDocument } = useDocument();
  const [reminderSetId, setReminderSetId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('all');

  const handleSetReminder = (id: string) => {
    setReminderSetId(id);
    setTimeout(() => setReminderSetId(null), 3000);
  };

  const handleExportICS = () => {
    // Generate .ics iCalendar file for all document dates
    const calendarHeader = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NyayaLens//Legal Intelligence//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ].join('\r\n');

    const calendarEvents = currentDocument.dates.map((dt) => {
      // format YYYYMMDD
      const cleanDate = dt.date.replace(/-/g, '');
      return [
        'BEGIN:VEVENT',
        `UID:nyayalens-${dt.id}-${Date.now()}@nyayalens.local`,
        `DTSTAMP:${cleanDate}T090000Z`,
        `DTSTART;VALUE=DATE:${cleanDate}`,
        `SUMMARY:[NyayaLens] ${dt.event}`,
        `DESCRIPTION:${dt.explanation}\\n\\nAction Required: ${dt.actionRequired}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      ].join('\r\n');
    }).join('\r\n');

    const calendarFooter = '\r\nEND:VCALENDAR';
    const icsContent = `${calendarHeader}\r\n${calendarEvents}${calendarFooter}`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentDocument.name.replace(/\s+/g, '_')}_Deadlines.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getUpcomingActions = () => {
    const docType = (currentDocument.type || '').toLowerCase();
    const docId = currentDocument.id || '';

    if (docId === 'doc-employment-002' || docType.includes('employment')) {
      return [
        {
          title: 'Submit Schedule A Prior Inventions Carve-out',
          due: 'Before Employment Start Date',
          detail: 'Protect personal open-source projects and code repositories from retroactive company ownership claims.'
        },
        {
          title: 'Consult CPA regarding Section 83(b) Tax Election',
          due: 'Within 30 days of equity option grant',
          detail: 'Determine whether to file an 83(b) election with the IRS for early exercise tax advantages.'
        },
        {
          title: 'Track 1-Year Cliff Equity Vesting Milestone',
          due: 'At month 12 of service',
          detail: 'Verify 25% option tranche (6,250 shares) populates accurately in equity portal.'
        }
      ];
    }

    if (docId === 'doc-service-003' || docType.includes('service') || docType.includes('consulting')) {
      return [
        {
          title: 'Configure staging cloud VPC access and security credentials',
          due: 'Prior to project sprint kickoff',
          detail: 'Ensure Provider technicians have restricted IAM access without granting root credentials.'
        },
        {
          title: 'Execute milestone integration tests within 5-day window',
          due: 'Within 5 business days of deliverable submission',
          detail: 'Avoid automatic deemed acceptance under Section 3.1 by logging any bug reports in writing.'
        },
        {
          title: 'Conduct final architecture review & sign off final payment tranche',
          due: 'Milestone 4 delivery',
          detail: 'Verify database benchmark reports and handover documentation prior to Net-30 remittance.'
        }
      ];
    }

    return [
      {
        title: 'Review renewal terms & rental inflation rates',
        due: '30 days prior to term end',
        detail: 'Confirm whether landlord intends to propose an automatic escalation or new 11-month contract.'
      },
      {
        title: 'Prepare written notice if terminating or moving',
        due: 'By 31 Oct 2026 (Section 7.1 deadline)',
        detail: 'Send registered digital or physical certified letter to avoid premature vacation penalty.'
      },
      {
        title: 'Schedule pre-moveout inspection & verify deposit return conditions',
        due: '14 days before handover',
        detail: 'Request joint walk-through to prevent unexpected deductions under Section 3.2.'
      }
    ];
  };

  const upcomingActions = getUpcomingActions();

  const filteredDates = currentDocument.dates.filter((dt) => {
    if (filterType === 'upcoming') return dt.isUpcoming;
    if (filterType === 'past') return !dt.isUpcoming;
    return true;
  });

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Important Dates & Deadlines
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
              Chronological Roadmap
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Grounded milestone schedule for <strong>{currentDocument.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportICS}
            aria-label="Export all document deadlines and milestones to iCalendar (.ics)"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Export deadlines to Apple Calendar, Google Calendar, or Outlook"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
            <span>Export to Calendar (.ics)</span>
          </button>

          <Link
            href="/checklist"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-subtle transition"
            aria-label="View action checklist for this document"
          >
            <span>View Action Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* 2. Upcoming Actions Card */}
      <section
        aria-labelledby="upcoming-actions-heading"
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4 border-l-4 border-l-indigo-600"
      >
        <h2 id="upcoming-actions-heading" className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <CalendarCheck className="w-4 h-4 text-indigo-600" aria-hidden="true" />
          <span>Upcoming Actions to Take</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingActions.map((action, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-700 block uppercase">
                  {action.due}
                </span>
                <h3 className="font-bold text-slate-900 text-xs mt-1">
                  {action.title}
                </h3>
                <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                  {action.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Filter Controls */}
      <div role="group" aria-label="Filter milestones by timeframe" className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            Filter:
          </span>
          {(['all', 'upcoming', 'past'] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filterType === t}
              onClick={() => setFilterType(t)}
              className={cn(
                'px-3 py-1 text-xs font-semibold rounded-lg transition capitalize focus:outline-none focus:ring-2 focus:ring-slate-500',
                filterType === t
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              )}
            >
              {t === 'all' ? 'All Milestones' : t}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-600 font-mono font-medium">
          {filteredDates.length} milestones
        </span>
      </div>

      {/* 4. Vertical Interactive Timeline */}
      <section aria-labelledby="milestone-roadmap-heading" className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
        <h2 id="milestone-roadmap-heading" className="sr-only">Milestone Roadmap</h2>
        {filteredDates.map((item) => {
          const isPast = !item.isUpcoming;
          const isReminderSet = reminderSetId === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div
                aria-hidden="true"
                className={cn(
                  'absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white shadow-xs',
                  isPast
                    ? 'bg-slate-500 text-white'
                    : 'bg-indigo-600 text-white animate-pulse-subtle'
                )}
              >
                {isPast ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Event Content Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle hover:shadow-card transition-all duration-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                      {item.formattedDate}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {item.event}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.sourceSection && (
                      <span className="text-[11px] font-mono text-slate-600 font-medium">
                        {item.sourceSection}
                      </span>
                    )}
                    <span
                      className={cn(
                        'text-[11px] font-semibold px-2 py-0.5 rounded-full border',
                        isPast
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      )}
                    >
                      {isPast ? 'Commenced' : `${item.daysRemaining} days remaining`}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {item.explanation}
                </p>

                <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-indigo-950">Action Required: </strong>
                    <span className="text-indigo-900">{item.actionRequired}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSetReminder(item.id)}
                    aria-label={isReminderSet ? `Calendar synced for ${item.event}` : `Set reminder for ${item.event}`}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs shadow-2xs transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {isReminderSet ? (
                      <span role="status" aria-live="polite" className="inline-flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        <span>Calendar Synced</span>
                      </span>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
                        <span>Set Reminder</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
