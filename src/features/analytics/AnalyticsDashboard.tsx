'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from 'recharts';
import { 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  PauseCircle, 
  Clock, 
  MessageCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import { LEAD_STATUS_MAP, LEAD_SOURCE_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  NOVO: '#3b82f6',
  AGUARDANDO_CONEXAO: '#0ea5e9',
  AGUARDANDO_RETORNO: '#f97316',
  CONTATADO: '#06b6d4',
  EM_NEGOCIACAO: '#8b5cf6',
  CONVERTIDO: '#10b981',
  PERDIDO: '#f43f5e',
  PAUSADO: '#94a3b8',
};

// Cores dinâmicas para estágios (gradiente indigo → rose)
const STAGE_COLORS = [
  '#6366f1', // Estágio 1 - Indigo
  '#8b5cf6', // Estágio 2 - Violet
  '#a855f7', // Estágio 3 - Purple
  '#d946ef', // Estágio 4 - Fuchsia
  '#ec4899', // Estágio 5 - Pink
  '#f43f5e', // Estágio 6 - Rose
  '#fb923c', // Estágio 7 - Orange
  '#84cc16', // Estágio 8 - Lime
];

interface Props {
  data: {
    totalLeads: number;
    activeLeads: number;
    pausedLeads: number;
    convertedLeads: number;
    awaitingReturnLeads: number;
    contactedLeads: number;
    totalInCadence: number;
    byStatus: { status: string; count: number }[];
    bySource: { source: string; count: number }[];
    cadenceStats: { stage: number; count: number }[];
    stages: { order: number; channel: string; delayDays: number }[];
  };
}

interface KPICardProps {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor?: string;
}

function KPICard({ label, value, icon: Icon, color, bgColor, borderColor }: KPICardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden p-5 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-0.5",
      bgColor,
      borderColor || "border-transparent"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">{label}</p>
          <p className="text-3xl font-black">{value}</p>
        </div>
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", `bg-${color}-500/20`)}>
          <Icon className={cn("w-5 h-5", `text-${color}-600`)} />
        </div>
      </div>
      <div className={cn("absolute bottom-0 left-0 right-0 h-1", `bg-${color}-500`)} />
    </div>
  );
}

function StageProgressBar({ stages, stats, total }: { stages: any[]; stats: any[]; total: number }) {
  if (stages.length === 0 || stats.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-slate-400">
        Nenhum estágio configurado
      </div>
    );
  }

  // Mapear dados
  const data = stages.map((stage) => {
    const stat = stats.find((s: any) => s.stage === stage.order);
    return {
      ...stage,
      count: stat?.count || 0,
      percentage: total > 0 ? ((stat?.count || 0) / total) * 100 : 0,
    };
  }).filter(d => d.count > 0);

  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-slate-400">
        Nenhum lead em cadência
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((stage, index) => (
        <div key={stage.order} className="group">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white"
                style={{ backgroundColor: STAGE_COLORS[index % STAGE_COLORS.length] }}
              >
                {stage.order}
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Estágio {stage.order}
              </span>
              <span className="text-xs text-slate-400 capitalize">
                ({stage.channel?.toLowerCase()})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {stage.count}
              </span>
              <span className="text-xs text-slate-400">
                ({stage.percentage.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
              style={{ 
                width: `${stage.percentage}%`,
                backgroundColor: STAGE_COLORS[index % STAGE_COLORS.length]
              }}
            />
          </div>
        </div>
      ))}
      
      {data.length > 1 && (
        <div className="flex items-center justify-center gap-1 pt-2 text-xs text-slate-400">
          <ArrowRight className="w-3 h-3" />
          <span>Fluxo de prospecção</span>
        </div>
      )}
    </div>
  );
}

function StageDonut({ stages, stats, total }: { stages: any[]; stats: any[]; total: number }) {
  if (stages.length === 0 || stats.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-slate-400">
        Sem dados
      </div>
    );
  }

  const data = stages.map((stage, index) => {
    const stat = stats.find((s: any) => s.stage === stage.order);
    return {
      name: `Estágio ${stage.order}`,
      value: stat?.count || 0,
      color: STAGE_COLORS[index % STAGE_COLORS.length],
    };
  }).filter(d => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-slate-400">
        Nenhum lead ativo
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{total}</p>
            <p className="text-xs text-slate-400">ativos</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {item.name}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusDistribution({ data }: { data: { status: string; count: number }[] }) {
  const total = data.reduce((acc, s) => acc + s.count, 0);
  
  const chartData = data
    .map(s => ({
      name: LEAD_STATUS_MAP[s.status as keyof typeof LEAD_STATUS_MAP]?.label || s.status,
      value: s.count,
      percentage: total > 0 ? (s.count / total) * 100 : 0,
      color: STATUS_COLORS[s.status] || '#94a3b8',
    }))
    .sort((a, b) => b.value - a.value);

  if (total === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-slate-400">
        Nenhum lead encontrado
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {chartData.slice(0, 7).map((item, index) => (
        <div key={index} className="group">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {item.name}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {item.value} <span className="text-slate-400 font-normal">({item.percentage.toFixed(0)}%)</span>
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${item.percentage}%`,
                backgroundColor: item.color
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function OriginDistribution({ data }: { data: { source: string; count: number }[] }) {
  const total = data.reduce((acc, s) => acc + s.count, 0);
  
  const chartData = data
    .map(s => ({
      name: LEAD_SOURCE_MAP[s.source as keyof typeof LEAD_SOURCE_MAP]?.label || s.source,
      value: s.count,
      percentage: total > 0 ? (s.count / total) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);

  if (total === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-slate-400">
        Nenhum lead encontrado
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex-1 space-y-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {item.name}
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={30}
              outerRadius={50}
              paddingAngle={2}
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][index % 5]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AnalyticsDashboard({ data }: Props) {
  const {
    totalLeads,
    activeLeads,
    pausedLeads,
    convertedLeads,
    awaitingReturnLeads,
    contactedLeads,
    totalInCadence,
    byStatus,
    bySource,
    cadenceStats,
    stages,
  } = data;

  // Converter (%)
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard 
          label="Leads Ativos"
          value={activeLeads}
          icon={Users}
          color="indigo"
          bgColor="bg-indigo-50 dark:bg-indigo-950/30"
        />
        <KPICard 
          label="Convertidos"
          value={convertedLeads}
          icon={CheckCircle2}
          color="emerald"
          bgColor="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <KPICard 
          label="Pausados"
          value={pausedLeads}
          icon={PauseCircle}
          color="amber"
          bgColor="bg-amber-50 dark:bg-amber-950/30"
        />
        <KPICard 
          label="Aguardando"
          value={awaitingReturnLeads}
          icon={Clock}
          color="orange"
          bgColor="bg-orange-50 dark:bg-orange-950/30"
        />
        <KPICard 
          label="Em Contato"
          value={contactedLeads}
          icon={MessageCircle}
          color="cyan"
          bgColor="bg-cyan-50 dark:bg-cyan-950/30"
        />
        <KPICard 
          label="Base Total"
          value={totalLeads}
          icon={Target}
          color="violet"
          bgColor="bg-violet-50 dark:bg-violet-950/30"
        />
      </div>

      {/* Seção de Estágios */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Progressão Horizontal */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pipeline de Estágios</h3>
              <p className="text-sm text-slate-500">Fluxo de leads pela cadência</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-700">{totalInCadence} ativos</span>
            </div>
          </div>
          <StageProgressBar stages={stages} stats={cadenceStats} total={totalInCadence} />
        </div>

        {/* Donut de Estágios */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Distribuição</h3>
            <p className="text-sm text-slate-500">Por estágio</p>
          </div>
          <StageDonut stages={stages} stats={cadenceStats} total={totalInCadence} />
        </div>
      </div>

      {/* Status e Origem */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Status dos Leads</h3>
            <p className="text-sm text-slate-500">Distribuição por status comercial</p>
          </div>
          <StatusDistribution data={byStatus} />
        </div>

        {/* Origem */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Origem dos Leads</h3>
            <p className="text-sm text-slate-500">De onde vieram os contacts</p>
          </div>
          <OriginDistribution data={bySource} />
        </div>
      </div>

      {/* Indicadores de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
          <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mb-1">Taxa de Conversão</p>
          <p className="text-4xl font-black">{conversionRate}%</p>
          <p className="text-emerald-200 text-xs mt-1">de todos os leads</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white">
          <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider mb-1">Em Cadência</p>
          <p className="text-4xl font-black">{totalInCadence}</p>
          <p className="text-indigo-200 text-xs mt-1">leads ativos no fluxo</p>
        </div>
        
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-5 text-white">
          <p className="text-violet-100 text-xs font-medium uppercase tracking-wider mb-1">Base Total</p>
          <p className="text-4xl font-black">{totalLeads}</p>
          <p className="text-violet-200 text-xs mt-1">leads cadastrados</p>
        </div>
      </div>
    </div>
  );
}