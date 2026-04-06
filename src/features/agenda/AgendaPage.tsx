import { Suspense } from 'react';
import { CalendarDays, AlertCircle } from 'lucide-react';
import { getAgendaLeads } from '@/actions/cadence';
import { getTemplates } from '@/actions/templates';
import { AgendaList } from '@/features/agenda/components/AgendaList';

export default async function AgendaPage() {
  const [
    { leads, totalPending }, 
    templates
  ] = await Promise.all([
    getAgendaLeads(),
    getTemplates()
  ]);
  
  // Agrupamento para estatísticas rápidas
  const overdueCount = leads.filter((l: any) => l.isOverdue).length;
  const todayCount = leads.filter((l: any) => !l.isOverdue).length; // Na agenda de 10 prioritários

  const stats = [
    { label: 'Vencidos', value: overdueCount.toString().padStart(2, '0'), color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-100 dark:border-rose-900/30' },
    { label: 'Para Hoje', value: todayCount.toString().padStart(2, '0'), color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-100 dark:border-amber-900/30' },
    { label: 'Total Fila', value: totalPending.toString(), color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-100 dark:border-indigo-900/30' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-10">
      {/* Cabeçalho de Estatísticas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-[2rem] border shadow-sm transition-all hover:shadow-md ${stat.bg} ${stat.borderColor}`}
          >
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className={`text-4xl font-black leading-none ${stat.color}`}>{stat.value}</span>
              <div className="p-2 rounded-xl bg-white/50 dark:bg-slate-900/50">
                <CalendarDays className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Título e Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Agenda Operacional</h1>
          <p className="text-slate-500 font-medium tracking-tight">Os 10 leads mais prioritários para seu follow-up hoje.</p>
        </div>
      </div>

      {/* Lista de Prioridade (Client Component) */}
      <Suspense fallback={
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
          ))}
        </div>
      }>
        <AgendaList 
          initialLeads={leads as any[]} 
          totalPending={totalPending}
          templates={templates} 
        />
      </Suspense>
    </div>
  );
}
