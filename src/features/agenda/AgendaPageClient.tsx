'use client';

import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { CalendarDays, X, CalendarPlus } from 'lucide-react';
import { getAgendaLeads, getStageCounts, getAgendaCounts } from '@/actions/cadence';
import { getManualActions } from '@/actions/manual-actions';
import { useOperator } from '@/components/providers/OperatorProvider';
import { AgendaList } from '@/features/agenda/components/AgendaList';
import { AgendaStagePanel } from '@/features/agenda/components/AgendaStagePanel';
import { ScheduleActionModal } from '@/features/agenda/components/ScheduleActionModal';
import type { ManualAgendaItem } from '@/types/agenda';

interface AgendaPageClientProps {
  initialLeads: any[];
  initialTotalPending: number;
  initialTemplates: any[];
  initialStages: any[];
  initialTotalActive: number;
  initialTodayCount: number;
  initialOverdueCount: number;
  initialManualActions: ManualAgendaItem[];
  initialManualTotal: number;
}

export function AgendaPageClient({ 
  initialLeads, 
  initialTotalPending, 
  initialTemplates, 
  initialStages,
  initialTotalActive,
  initialTodayCount,
  initialOverdueCount,
  initialManualActions,
  initialManualTotal,
}: AgendaPageClientProps) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [leads, setLeads] = useState(initialLeads);
  const [totalPending, setTotalPending] = useState(initialTotalPending);
  const [stages, setStages] = useState(initialStages);
  const [totalActive, setTotalActive] = useState(initialTotalActive);
  const [todayCount, setTodayCount] = useState(initialTodayCount);
  const [overdueCount, setOverdueCount] = useState(initialOverdueCount);
  const [isLoading, setIsLoading] = useState(false);

  // Ações manuais
  const [manualActions, setManualActions] = useState<ManualAgendaItem[]>(initialManualActions);
  const [manualTotal, setManualTotal] = useState(initialManualTotal);

  // Modal de agendamento manual
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const { activeOperator } = useOperator();

  // Total combinado para exibição na lista
  const combinedTotal = totalPending; // getAgendaCounts já soma cadência + manual

  // Função de refresh completo da agenda (cadência + ações manuais + contadores)
  const refreshAgenda = useCallback(async () => {
    setIsLoading(true);
    try {
      const [leadsResult, stagesResult, countsResult, manualResult] = await Promise.all([
        getAgendaLeads({ stageFilter: selectedStage || undefined }),
        getStageCounts(),
        getAgendaCounts({
          stageFilter: selectedStage || undefined,
          operatorId: activeOperator?.id,
        }),
        getManualActions({
          operatorId: activeOperator?.id,
        }),
      ]);

      setLeads(leadsResult.leads);
      setTotalPending(leadsResult.totalPending + manualResult.totalPending);
      setStages(stagesResult.stages);
      setTotalActive(stagesResult.totalActive);
      setTodayCount(countsResult.todayCount);
      setOverdueCount(countsResult.overdueCount);
      setManualActions(manualResult.actions);
      setManualTotal(manualResult.totalPending);
    } catch (error) {
      console.error('Erro ao atualizar agenda:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStage, activeOperator?.id]);

  // Recalcula ao trocar de operador
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refreshAgenda();
  }, [refreshAgenda]);

  const handleStageClick = async (stageOrder: number) => {
    const newStage = selectedStage === stageOrder ? null : stageOrder;
    setSelectedStage(newStage);
    setIsLoading(true);

    try {
      const [leadsResult, countsResult] = await Promise.all([
        getAgendaLeads({ stageFilter: newStage || undefined }),
        getAgendaCounts({
          stageFilter: newStage || undefined,
          operatorId: activeOperator?.id,
        }),
      ]);
      setLeads(leadsResult.leads);
      setTotalPending(leadsResult.totalPending + manualTotal);
      setTodayCount(countsResult.todayCount);
      setOverdueCount(countsResult.overdueCount);
    } catch (error) {
      console.error('Erro ao filtrar estágio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilter = async () => {
    setSelectedStage(null);
    setIsLoading(true);
    try {
      const [leadsResult, countsResult] = await Promise.all([
        getAgendaLeads({}),
        getAgendaCounts({ operatorId: activeOperator?.id }),
      ]);
      setLeads(leadsResult.leads);
      setTotalPending(leadsResult.totalPending + manualTotal);
      setTodayCount(countsResult.todayCount);
      setOverdueCount(countsResult.overdueCount);
    } catch (error) {
      console.error('Erro ao limpar filtro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      label: 'Vencidos',
      value: overdueCount.toString().padStart(2, '0'),
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      borderColor: 'border-rose-100 dark:border-rose-900/30',
    },
    {
      label: 'Para Hoje',
      value: todayCount.toString().padStart(2, '0'),
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-100 dark:border-amber-900/30',
    },
    {
      label: 'Total Fila',
      value: combinedTotal.toString(),
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-950/20',
      borderColor: 'border-indigo-100 dark:border-indigo-900/30',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Cards de Estatísticas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-5 rounded-2xl border shadow-sm transition-all hover:shadow-md ${stat.bg} ${stat.borderColor}`}
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

      {/* Painel de Estágios */}
      <AgendaStagePanel
        stages={stages}
        totalActive={totalActive}
        selectedStage={selectedStage}
        onStageClick={handleStageClick}
      />

      {/* Filtro de estágio ativo */}
      {selectedStage && (
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl">
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Filtrando: Estágio {selectedStage}
          </span>
          <button
            onClick={handleClearFilter}
            className="p-1 hover:bg-indigo-100 dark:hover:bg-indigo-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-indigo-500" />
          </button>
        </div>
      )}

      {/* Cabeçalho + botão Agendar Ação */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Agenda Operacional
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">
            {selectedStage
              ? `Exibindo leads do estágio ${selectedStage}`
              : 'Os leads mais prioritários para seu follow-up hoje.'}
          </p>
        </div>

        {/* Botão principal: Agendar Ação Manual */}
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-violet-600 text-white rounded-2xl font-black text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-100 dark:shadow-none active:scale-95"
        >
          <CalendarPlus className="w-4 h-4" />
          Agendar Ação
        </button>
      </div>

      {/* Lista Unificada */}
      <Suspense fallback={
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      }>
        <AgendaList
          initialLeads={leads}
          manualActions={manualActions}
          totalPending={combinedTotal}
          templates={initialTemplates}
          isLoading={isLoading}
          stageFilter={selectedStage}
          onActionComplete={refreshAgenda}
        />
      </Suspense>

      {/* Modal de Agendamento Manual */}
      <ScheduleActionModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSuccess={refreshAgenda}
      />
    </div>
  );
}
