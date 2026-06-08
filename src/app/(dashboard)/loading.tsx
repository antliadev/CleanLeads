import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-2">
          <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-64 rounded bg-slate-100 dark:bg-slate-900" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-28 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" />
        ))}
      </div>

      <div className="h-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
      </div>
    </div>
  );
}
