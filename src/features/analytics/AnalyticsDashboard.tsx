'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid,
} from 'recharts';
import { Users, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { LEAD_STATUS_MAP, LEAD_SOURCE_MAP } from '@/lib/constants';

const STATUS_COLORS: Record<string, string> = {
  NOVO: '#3b82f6',
  AGUARDANDO_CONEXAO: '#0ea5e9',
  AGUARDANDO_RETORNO: '#f97316',
  CONTATADO: '#f59e0b',
  EM_NEGOCIACAO: '#8b5cf6',
  CONVERTIDO: '#10b981',
  PERDIDO: '#f43f5e',
};

const SOURCE_COLORS = ['#6366f1', '#06b6d4', '#10b981'];

interface Props {
  data: {
    totalLeads: number;
    byStatus: { status: string; count: number }[];
    bySource: { source: string; count: number }[];
    leadsByDay: { date: string; count: number }[];
  };
}

export function AnalyticsDashboard({ data }: Props) {
  const { totalLeads, byStatus, bySource, leadsByDay } = data;

  const converted = byStatus.find((s) => s.status === 'CONVERTIDO')?.count ?? 0;
  const conversionRate = totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : '0';
  const newLeads = byStatus.find((s) => s.status === 'NOVO')?.count ?? 0;

  const statusChartData = byStatus.map((s) => ({
    name: LEAD_STATUS_MAP[s.status as keyof typeof LEAD_STATUS_MAP]?.label ?? s.status,
    value: s.count,
    color: STATUS_COLORS[s.status] ?? '#94a3b8',
  }));

  const sourceChartData = bySource.map((s) => ({
    name: LEAD_SOURCE_MAP[s.source as keyof typeof LEAD_SOURCE_MAP]?.label ?? s.source,
    value: s.count,
  }));

  return (
    <div className="space-y-8">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total de Leads', value: totalLeads, icon: Users, color: 'indigo' },
          { label: 'Novos', value: newLeads, icon: TrendingUp, color: 'blue' },
          { label: 'Convertidos', value: converted, icon: CheckCircle2, color: 'emerald' },
          { label: 'Taxa de Conversão', value: `${conversionRate}%`, icon: Target, color: 'violet' },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all">
            <div className={`w-10 h-10 rounded-2xl bg-${card.color}-50 dark:bg-${card.color}-950/50 flex items-center justify-center mb-4`}>
              <card.icon className={`w-5 h-5 text-${card.color}-600 dark:text-${card.color}-400`} />
            </div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funil por status */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Funil por Status</h3>
          {statusChartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
              Nenhum dado disponível
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={statusChartData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
                  formatter={(v: any) => [`${v} leads`, '']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={30}>
                  {statusChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Distribuição por Status */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Distribuição por Status</h3>
          {statusChartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
              Nenhum dado disponível
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statusChartData} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                    {statusChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {statusChartData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                      <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Evolução temporal */}
      {leadsByDay.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Leads – Últimos 30 dias</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={leadsByDay}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
