'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  Clock, 
  AlertCircle, 
  Mail,
  PauseCircle,
  ArrowRight,
  Loader2,
  Pencil,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LinkedinIcon } from '@/components/icons/Linkedin';
import { LeadActionDrawer } from './LeadActionDrawer';
import { ManualActionDrawer } from './ManualActionDrawer';
import { LeadEditModal } from '@/components/shared/LeadEditModal';
import { useLeadDataActions } from '@/lib/stores/lead-store';
import type { UnifiedAgendaItem, CadenceAgendaItem, ManualAgendaItem } from '@/types/agenda';
import { MANUAL_ACTION_TYPE_ICONS, MANUAL_ACTION_TYPE_LABELS } from '@/types/agenda';

interface AgendaListProps {
  initialLeads: any[]; // Itens de cadência (formato atual)
  manualActions?: ManualAgendaItem[]; // Ações manuais (novo)
  totalPending: number; // Total combinado
  templates: any[];
  isLoading?: boolean;
  stageFilter?: number | null;
  onActionComplete?: () => void;
}

/**
 * Combina e ordena itens de cadência e ações manuais em uma lista unificada.
 * Ordenação: vencidos primeiro (mais antigos primeiro), depois por scheduledAt asc.
 */
function buildUnifiedList(
  cadenceLeads: any[],
  manualActions: ManualAgendaItem[]
): UnifiedAgendaItem[] {
  const cadenceItems: CadenceAgendaItem[] = cadenceLeads.map((lead) => ({
    type: 'CADENCE' as const,
    ...lead,
    sortDate: new Date(lead.nextScheduledAt),
  }));

  const manualItems: ManualAgendaItem[] = manualActions.map((a) => ({
    ...a,
    sortDate: new Date(a.scheduledAt),
  }));

  const all: UnifiedAgendaItem[] = [...cadenceItems, ...manualItems];

  // Ordena: data ascendente (vencidos aparecem primeiro por serem datas no passado)
  return all.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());
}

/** Badge de tipo de ação */
function ActionTypeBadge({ item }: { item: UnifiedAgendaItem }) {
  if (item.type === 'CADENCE') {
    return (
      <span className="inline-flex items-center gap-1 text-[9px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/50 px-2 py-0.5 rounded-full uppercase tracking-widest">
        ⚡ Cadência
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-black text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 px-2 py-0.5 rounded-full uppercase tracking-widest">
      {MANUAL_ACTION_TYPE_ICONS[item.actionType]} Manual
    </span>
  );
}

/** Ícone de canal para o card */
function ChannelIcon({ item }: { item: UnifiedAgendaItem }) {
  if (item.type === 'CADENCE') {
    const ch = item.currentStage?.channel;
    if (ch === 'LINKEDIN') return <LinkedinIcon className="w-6 h-6 text-blue-600" />;
    if (ch === 'WHATSAPP') return <span className="text-xl">💬</span>;
    return <Mail className="w-6 h-6 text-indigo-600" />;
  }
  return (
    <span className="text-xl">
      {MANUAL_ACTION_TYPE_ICONS[item.actionType]}
    </span>
  );
}

/** Subtítulo do canal/tipo */
function ChannelLabel({ item }: { item: UnifiedAgendaItem }) {
  if (item.type === 'CADENCE') {
    return (
      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
        Estágio {item.currentStageOrder} ({item.currentStage?.channel ?? '—'})
      </span>
    );
  }
  return (
    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
      {MANUAL_ACTION_TYPE_LABELS[item.actionType]}
      {item.channel ? ` · ${item.channel}` : ''}
    </span>
  );
}

export function AgendaList({
  initialLeads,
  manualActions = [],
  totalPending,
  templates,
  isLoading,
  stageFilter,
  onActionComplete,
}: AgendaListProps) {
  const { setLeads } = useLeadDataActions();

  // Cadência drawer state
  const [selectedCadenceLead, setSelectedCadenceLead] = useState<any | null>(null);
  const [isCadenceDrawerOpen, setIsCadenceDrawerOpen] = useState(false);

  // Manual drawer state
  const [selectedManualAction, setSelectedManualAction] = useState<ManualAgendaItem | null>(null);
  const [isManualDrawerOpen, setIsManualDrawerOpen] = useState(false);

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLeadData, setEditingLeadData] = useState<any | null>(null);

  // Paginação
  const [displayedCadenceLeads, setDisplayedCadenceLeads] = useState(initialLeads);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(totalPending > (initialLeads.length + manualActions.length));

  // Callback para ação concluída
  const handleActionComplete = useCallback(() => {
    onActionComplete?.();
  }, [onActionComplete]);

  // Sync quando initialLeads muda (refresh da agenda)
  useEffect(() => {
    setDisplayedCadenceLeads(initialLeads);
    setHasMore(totalPending > (initialLeads.length + manualActions.length));

    // Atualiza store para edição compartilhada
    const storeLeads = initialLeads.map((l: any) => ({
      ...l.lead,
      histories: [],
      lastOperator: null,
      leadNotes: [],
      cadenceEngine: {
        status: l.status,
        currentStageOrder: l.currentStageOrder,
        cadence: { stages: l.cadence?.stages || [] }
      }
    }));
    setLeads(storeLeads);
  }, [initialLeads, manualActions.length, setLeads, totalPending]);

  // Lista unificada e ordenada
  const unifiedList = useMemo(
    () => buildUnifiedList(displayedCadenceLeads, manualActions),
    [displayedCadenceLeads, manualActions]
  );

  const handleOpenCadenceAction = (lead: any) => {
    setSelectedCadenceLead(lead);
    setIsCadenceDrawerOpen(true);
  };

  const handleOpenManualAction = (action: ManualAgendaItem) => {
    setSelectedManualAction(action);
    setIsManualDrawerOpen(true);
  };

  const handleItemClick = (item: UnifiedAgendaItem) => {
    if (item.type === 'CADENCE') {
      handleOpenCadenceAction(item);
    } else {
      handleOpenManualAction(item);
    }
  };

  const handleEditLead = (e: React.MouseEvent, lead: any) => {
    e.stopPropagation();
    setEditingLeadData({
      ...lead.lead,
      histories: [],
      lastOperator: null,
      leadNotes: [],
      cadenceEngine: {
        status: lead.status,
        currentStageOrder: lead.currentStageOrder,
        cadence: { stages: lead.cadence?.stages || [] }
      }
    });
    setIsEditOpen(true);
  };

  async function loadMoreLeads() {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const { getAgendaLeadsMore } = await import('@/actions/cadence');
      const result = await getAgendaLeadsMore(displayedCadenceLeads.length, stageFilter || undefined);
      if (result.leads && result.leads.length > 0) {
        setDisplayedCadenceLeads(prev => [...prev, ...result.leads]);
        setHasMore(
          displayedCadenceLeads.length + result.leads.length + manualActions.length < totalPending
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais leads da agenda:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (unifiedList.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-slate-300" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Agenda Vazia</h3>
          <p className="text-slate-500 font-medium">Tudo em dia! Sem leads para follow-up agora.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {unifiedList.map((item, idx) => {
        const isManual = item.type === 'MANUAL';
        const isExtremeUrgent = item.isExtremeUrgent;

        return (
          <motion.div
            key={`${item.type}-${item.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => handleItemClick(item)}
            className={cn(
              "group relative bg-white dark:bg-slate-900 border p-6 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer overflow-hidden",
              isExtremeUrgent
                ? "border-rose-100 dark:border-rose-900/30"
                : isManual
                ? "border-violet-100 dark:border-violet-900/30"
                : "border-slate-100 dark:border-slate-800"
            )}
          >
            {/* Barra lateral colorida */}
            {isExtremeUrgent && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            )}
            {isManual && !isExtremeUrgent && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-400 dark:bg-violet-600" />
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Lado esquerdo: ícone + nome */}
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors",
                  isManual
                    ? "bg-violet-50 dark:bg-violet-950/40 border-violet-100 dark:border-violet-800 group-hover:border-violet-300 dark:group-hover:border-violet-600"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 group-hover:border-indigo-200 dark:group-hover:border-indigo-800"
                )}>
                  <ChannelIcon item={item} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 tracking-tight flex-wrap">
                    {item.lead.fullName}
                    {isExtremeUrgent && (
                      <span className="flex items-center gap-1 text-[10px] bg-rose-50 dark:bg-rose-950/30 text-rose-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-rose-100 dark:border-rose-800/50">
                        <AlertCircle className="w-3 h-3" /> Urgente
                      </span>
                    )}
                    <ActionTypeBadge item={item} />
                  </h3>
                  <p className="text-slate-400 font-medium text-sm">
                    {item.lead.company || 'Empresa não informada'}
                    {isManual && (item as ManualAgendaItem).title !== `${MANUAL_ACTION_TYPE_ICONS[(item as ManualAgendaItem).actionType]} ${MANUAL_ACTION_TYPE_LABELS[(item as ManualAgendaItem).actionType]}`
                      ? ` · ${(item as ManualAgendaItem).title}`
                      : ''
                    }
                  </p>
                </div>
              </div>

              {/* Lado direito: canal + próxima ação + botões */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Canal</p>
                  <div className="flex items-center gap-2">
                    <ChannelLabel item={item} />
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    {isManual ? 'Agendado para' : 'Próxima Ação'}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-0.5 text-sm">
                    <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                      {item.nextActionPrimary || 'Pronto'}
                    </span>
                    <span className="text-slate-300">•</span>
                    {item.nextActionIsToday && (
                      <span className="text-sm font-bold text-blue-600 whitespace-nowrap">Hoje</span>
                    )}
                    {item.nextActionIsTomorrow && (
                      <span className="text-sm font-bold text-blue-600 whitespace-nowrap">Amanhã</span>
                    )}
                    {item.nextActionSecondary && !item.nextActionIsToday && !item.nextActionIsTomorrow && (
                      <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
                        {item.nextActionSecondary}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="flex items-center gap-3">
                  {/* Editar lead — apenas para cadência */}
                  {item.type === 'CADENCE' && (
                    <>
                      <button
                        onClick={(e) => handleEditLead(e, item)}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                        title="Editar lead"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                      >
                        <PauseCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Botão principal */}
                  <div className={cn(
                    "flex items-center gap-2 pl-6 pr-4 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 group/btn",
                    isManual
                      ? "bg-violet-600 text-white hover:bg-violet-700 shadow-violet-100 dark:shadow-none"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none"
                  )}>
                    {isManual ? 'Executar' : 'Executar'}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Botão Mostrar Mais */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-4"
        >
          <button
            onClick={loadMoreLeads}
            disabled={isLoadingMore}
            className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all disabled:opacity-50"
          >
            {isLoadingMore ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Carregando...</>
            ) : (
              <><Clock className="w-5 h-5" /> Mostrar mais</>
            )}
          </button>
        </motion.div>
      )}

      {/* Drawers */}
      <LeadActionDrawer
        isOpen={isCadenceDrawerOpen}
        onClose={() => setIsCadenceDrawerOpen(false)}
        leadProgress={selectedCadenceLead}
        templates={templates}
        onActionComplete={handleActionComplete}
      />

      <ManualActionDrawer
        isOpen={isManualDrawerOpen}
        onClose={() => setIsManualDrawerOpen(false)}
        action={selectedManualAction}
        onActionComplete={handleActionComplete}
      />

      {/* Modal de Edição de Lead */}
      {editingLeadData && (
        <LeadEditModal
          lead={editingLeadData}
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setEditingLeadData(null);
          }}
        />
      )}
    </div>
  );
}
