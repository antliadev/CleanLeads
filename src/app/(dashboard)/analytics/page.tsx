import { Suspense } from 'react';
import { LayoutDashboard, Loader2 } from 'lucide-react';
import { getAnalytics } from '@/actions/analytics';
import dynamic from 'next/dynamic';

const AnalyticsDashboard = dynamic(
  () => import('@/features/analytics/AnalyticsDashboard').then((mod) => mod.AnalyticsDashboard),
  {
    loading: () => (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5 h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-64" />
          <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-48" />
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-100 dark:bg:sLate-800 rounded-2xl p-5 h-24" />
          <div className="bg-slate-100 dark:bg:sLate-800 rounded-2xl p-5 h-24" />
          <div className="bg-slate-100 dark:bg:sLate-800 rounded-2xl p-5 h-24" />
        </div>
      </div>
    ),
    ssr: true,
  }
);

export const metadata = {
  title: 'Dashboard – LimpaLeads',
  description: 'Visão geral do desempenho dos seus leads',
};

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-sm ml-[52px]">
          Visão geral do desempenho dos seus leads
        </p>
      </div>
      <Suspense fallback={null}>
        <AnalyticsDashboard data={data} />
      </Suspense>
    </div>
  );
}
