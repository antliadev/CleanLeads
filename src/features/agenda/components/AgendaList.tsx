'use client';

import { useState, useCallback } from 'react';
import { 
  Clock, 
  AlertCircle, 
  Mail,
  PauseCircle,
  ArrowRight,
  Loader2,
  Pencil
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LinkedinIcon } from '@/components/icons/Linkedin';
import { LeadActionDrawer } from './LeadActionDrawer';
import { LeadEditModal } from '@/components/shared/LeadEditModal';
import { useLeadStore } from '@/lib/stores/lead-store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AgendaListProps {
  initialLeads: any[];
  totalPending: number;
  templates: any[];
  isLoading?: boolean;
  stageFilter?: number | null;
  onActionComplete?: () => void;
}

export function AgendaList({ initialLeads, totalPending, templates, isLoading, stageFilter, onActionComplete }: AgendaListProps) {
  const router = useRouter();
  const { openLeadEditor, setLeads } = useLeadStore();
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [displayedLeads, setDisplayedLeads] = useState(initialLeads);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(totalPending > initialLeads.length);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLeadData, setEditingLeadData] = useState<any | null>(null);

  // Callback para quando uma ação for concluída
  const handleActionComplete = useCallback(() => {
    if (onActionComplete) {
      onActionComplete();
    }
  }, [onActionComplete]);

  // Popula o store com leads da agenda para edição compartilhada
  const [prevInitialLeads, setPrevInitialLeads] = useState(initialLeads);
  if (initialLeads !== prevInitialLeads) {
    setDisplayedLeads(initialLeads);
    setPrevInitialLeads(initialLeads);
    setHasMore(totalPending > initialLeads.length);
    // Converte lead da agenda para formato LeadWithHistory
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
  }

  const handleOpenAction = (lead: any) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleEditLead = (lead: any) => {
    // Abre modal de edição inline na agenda
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
      // Pegar o stageFilter do componente pai via prop ou contexto
      const result = await getAgendaLeadsMore(displayedLeads.length);
      
      if (result.leads && result.leads.length > 0) {
        setDisplayedLeads(prev => [...prev, ...result.leads]);
        setHasMore(displayedLeads.length + result.leads.length < totalPending);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais leads da agenda:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (displayedLeads.length === 0) {
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
      {displayedLeads.map((lead, idx) => (
        <motion.div
          key={lead.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => handleOpenAction(lead)}
          className={cn(
            "group relative bg-white dark:bg-slate-900 border p-6 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer overflow-hidden",
            lead.isExtremeUrgent 
              ? "border-rose-100 dark:border-rose-900/30" 
              : "border-slate-100 dark:border-slate-800"
          )}
        >
          {lead.isExtremeUrgent && (
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 transition-colors group-hover:border-indigo-200 dark:group-hover:border-indigo-800">
                {lead.currentStage?.channel === 'LINKEDIN' ? <LinkedinIcon className="w-6 h-6 text-blue-600" /> : <Mail className="w-6 h-6 text-indigo-600" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 tracking-tight">
                  {lead.lead.fullName}
                  {lead.isExtremeUrgent && (
                    <span className="flex items-center gap-1 text-[10px] bg-rose-50 dark:bg-rose-950/30 text-rose-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-rose-100 dark:border-rose-800/50">
                      <AlertCircle className="w-3 h-3" /> Urgente
                    </span>
                  )}
                </h3>
                <p className="text-slate-400 font-medium text-sm">{lead.lead.company || 'Empresa não informada'}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Canal</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Estágio {lead.currentStageOrder} ({lead.currentStage?.channel})
                  </span>
                </div>
              </div>

              <div className="space-y-1 min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Próxima Ação</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-0.5 text-sm">
                  {/* Tempo restante - menor, sem destaque */}
                  <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                    {lead.nextActionPrimary || lead.timeDisplay || 'Pronto'}
                  </span>
                  {/* Separador */}
                  <span className="text-slate-300">•</span>
                  {/* Data em destaque azul */}
                  {lead.nextActionIsToday && (
                    <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
                      Hoje
                    </span>
                  )}
                  {lead.nextActionIsTomorrow && (
                    <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
                      Amanhã
                    </span>
                  )}
                  {lead.nextActionSecondary && !lead.nextActionIsToday && !lead.nextActionIsTomorrow && (
                    <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
                      {lead.nextActionSecondary}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleEditLead(lead); }}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Editar lead"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <PauseCircle className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 bg-indigo-600 text-white pl-6 pr-4 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95 group/btn">
                  Executar
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
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
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                <Clock className="w-5 h-5" />
                Mostrar mais ({totalPending - displayedLeads.length} restantes)
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Mensagem quando não há mais */}
      {!hasMore && totalPending > displayedLeads.length && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl p-6 text-center"
        >
          <p className="text-indigo-600 dark:text-indigo-400 font-medium">
            Todos os {totalPending} leads da agenda foram exibidos.
          </p>
        </motion.div>
      )}

      {/* Modal Lateral */}
      <LeadActionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        leadProgress={selectedLead}
        templates={templates}
        onActionComplete={handleActionComplete}
      />

      {/* Modal de Edição Inline */}
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