import Link from 'next/link';
import { Scale, ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <Scale className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          The legal section or document route you requested could not be located.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
