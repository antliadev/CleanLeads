'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid,
} from 'recharts';
import { Users, Target, TrendingUp, CheckCircle2, ArrowRight, TrendingDown, Clock } from 'lucide-react';
import { LEAD_STATUS_MAP, LEAD_SOURCE_MAP } from '@/lib/constants';

const STATUS_COLORS: Record<string, string> = {
  NOVO: '#3b82f6',
  AGUARDANDO_CONEXAO: '#0ea5e9',
  AGUARDANDO_RETORNO: '#f97316',
  CONTATADO: '#f59e0b',
  EM_NEGOCIACAO: '#8b5cf6',
  CONVERTIDO: '#10b981',
  PERDIDO: '#f43f5e',
  PAUSADO: '#94a3b8',
};

const STAGE_COLORS = [
  '#6366f1', // Estágio 1 - Indigo
  '#8b5cf6', // Estágio 2 - Violet
  '#a855f7', // Estágio 3 - Purple
  '#d946ef', // Estágio 4 - Fuchsia
  '#ec4899', // Estágio 5 - Pink
  '#f43f5e', // Estágio 6 - Rose
];

const SOURCE_COLORS = ['#6366f1', '#06b6d4', '#10b981'];

interface Props {
  data: {
    totalLeads: number;
    activeLeads: number;
    byStatus: { status: string; count: number }[];
    bySource: { source: string; count: number }[];
    cadenceStats: { stage: number; count: number }[];
  };
}

export function AnalyticsDashboard({ data }: Props) {
  const { totalLeads, activeLeads, byStatus, bySource } = data;

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

  // Preparar dados dos estágios para o gráfico
  const stageData = (data as any).cadenceStats || [];
  const sortedStages = [...stageData].sort((a: any, b: any) => a.stage - b.stage);
  const totalInPipeline = sortedStages.reduce((acc: number, s: any) => acc + s.count, 0);

  // Calcular percentages e criar dados para o funil
  const funnelData = sortedStages.map((stage: any, index: number) => {
    const percentage = totalInPipeline > 0 ? ((stage.count / totalInPipeline) * 100).toFixed(1) : '0';
    return {
      ...stage,
      percentage: parseFloat(percentage),
      color: STAGE_COLORS[index % STAGE_COLORS.length],
      width: totalInPipeline > 0 ? (stage.count / totalInPipeline) * 100 : 0,
    };
  });

  return (
    <div className="space-y-8">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Leads Ativos', value: activeLeads, icon: Users, color: 'indigo' },
          { label: 'Novos', value: newLeads, icon: TrendingUp, color: 'blue' },
          { label: 'Convertidos', value: converted, icon: CheckCircle2, color: 'emerald' },
          { label: 'Base Total', value: totalLeads, icon: Target, color: 'violet' },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg transition-all">
            <div className={`w-10 h-10 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-950/50 flex items-center justify-center mb-3`}>
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
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Funil por Status</h3>
          {statusChartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
              Nenhum dado disponível
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
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
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Distribuição por Status</h3>
          {statusChartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
              Nenhum dado disponível
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={statusChartData} dataKey="value" innerRadius={40} outerRadius={65} paddingAngle={3}>
                    {statusChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {statusChartData.slice(0, 5).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-slate-600 dark:text-slate-300 truncate max-w-[100px]">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Pipeline de Estágios - Visualização Inteligente */}
      {funnelData.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pipeline de Estágios</h3>
              <p className="text-sm text-slate-500 font-medium">Fluxo de leads pela cadência de prospecção</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{totalInPipeline} ativos</span>
              </div>
            </div>
          </div>

          {/* Visualização do Funil */}
          <div className="relative mb-6">
            <div className="flex items-end justify-center gap-2 h-32">
              {funnelData.map((stage: any, index: number) => (
                <div
                  key={stage.stage}
                  className="relative flex flex-col items-center group"
                  style={{ height: `${Math.max(stage.width * 0.8, 20)}%`, width: `${100 / funnelData.length - 5}%` }}
                >
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-90"
                    style={{
                      height: '100%',
                      background: `linear-gradient(180deg, ${stage.color} 0%, ${stage.color}99 100%)`,
                      boxShadow: `0 -4px 20px ${stage.color}40`
                    }}
                  />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
                    <span className="text-xs font-black text-slate-400 uppercase">E{stage.stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards de Estágio com Detalhes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {funnelData.map((stage: any, index: number) => {
              const prevStage = index > 0 ? funnelData[index - 1] : null;
              const drop = prevStage ? prevStage.count - stage.count : 0;
              const dropPercentage = prevStage ? ((drop / prevStage.count) * 100).toFixed(0) : 0;
              
              return (
                <div
                  key={stage.stage}
                  className="p-4 rounded-xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: `${stage.color}08`,
                    borderColor: `${stage.color}30`
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: stage.color }}
                    >
                      <span className="text-xs font-black text-white">{stage.stage}</span>
                    </div>
                    <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stage.count}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500">{stage.percentage}% do pipeline</p>
                    {drop > 0 && (
                      <div className="flex items-center gap-1 text-xs text-rose-500">
                        <TrendingDown className="w-3 h-3" />
                        <span>-{drop} ({dropPercentage}%)</span>
                      </div>
                    )}
                    {drop < 0 && (
                      <div className="flex items-center gap-1 text-xs text-emerald-500">
                        <TrendingUp className="w-3 h-3" />
                        <span>+{Math.abs(drop)}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gráfico de Barras Detalhado */}
          <div className="mt-8">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Distribuição por Estágio</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart 
                data={funnelData} 
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="stage" 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `Estágio ${value}`}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 8 }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(v: any) => [`${v} leads`, 'Leads']}
                  labelFormatter={(label) => `Estágio ${label}`}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {funnelData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
