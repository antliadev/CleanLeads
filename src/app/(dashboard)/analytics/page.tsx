import { LayoutDashboard } from 'lucide-react';
import { getAnalytics } from '@/actions/analytics';
import { AnalyticsDashboard } from '@/features/analytics/AnalyticsDashboard';

export const metadata = {
  title: 'Dashboard – LimpaLeads',
  description: 'Visão geral do desempenho dos seus leads',
};

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-sm ml-[52px]">
          Visão geral do desempenho dos seus leads
        </p>
      </div>
      <AnalyticsDashboard data={data} />
    </div>
  );
}
