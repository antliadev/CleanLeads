import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Mail, Phone, Plus, ChevronLeft, ChevronRight, MessageSquare, RefreshCw, Loader2 } from 'lucide-react';

import { LinkedinIcon } from '@/components/icons/Linkedin';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { LeadForm } from './LeadForm';
import { deleteLead, deleteAllLeads } from '@/actions/leads';
import { formatDate, formatDateTime, getLinkedinProfileUrl, getGmailComposeUrl, cn } from '@/lib/utils';
import { ContactActionModal } from './ContactActionModal';
import { LeadNotesHistoryModal } from './LeadNotesHistoryModal';
import { LEAD_SOURCE_MAP } from '@/lib/constants';
import { startLeadCadenceBulk } from '@/actions/cadence';
import { toast } from 'sonner';
import { useOperator } from '@/components/providers/OperatorProvider';
import type { Template, TemplateChannel } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import type { LeadWithHistory } from './types';

interface LeadsTableProps {
  leads: LeadWithHistory[];
  total: number;
  page: number;
  totalPages: number;
  templates: Template[];
  onPageChange: (page: number) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function LeadsTable({ leads, total, page, totalPages, templates, onPageChange, hasMore, onLoadMore, isLoadingMore }: LeadsTableProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingLead, setEditingLead] = useState<LeadWithHistory | null>(null);
  const [creating, setCreating] = useState(false);
  const [contactModal, setContactModal] = useState<{ isOpen: boolean; lead: LeadWithHistory | null; channel: TemplateChannel }>({ 
    isOpen: false, lead: null, channel: 'LINKEDIN' 
  });
  const [notesModal, setNotesModal] = useState<{ isOpen: boolean; lead: LeadWithHistory | null }>({
    isOpen: false, lead: null
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkStarting, setIsBulkStarting] = useState(false);
  const [selectedStageForBulk, setSelectedStageForBulk] = useState<string>('');
  const [isBulkUpdatingStage, setIsBulkUpdatingStage] = useState(false);
  const { activeOperator } = useOperator();

  async function handleDelete(id: string) {
    await deleteLead(id);
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    // Simula um delay para o feedback visual da animação
    setTimeout(() => setIsRefreshing(false), 600);
  };

  async function handleBulkUpdateStage() {
    if (!selectedStageForBulk || !activeOperator) return;
    
    const stageNum = parseInt(selectedStageForBulk);
    if (isNaN(stageNum) || stageNum < 1) {
      toast.error('Selecione um estágio válido');
      return;
    }
    
    setIsBulkUpdatingStage(true);
    try {
      const { bulkUpdateLeadStage } = await import('@/actions/cadence');
      await bulkUpdateLeadStage(selectedIds, stageNum, activeOperator.id);
      toast.success(`${selectedIds.length} leads movidos para o estágio ${selectedStageForBulk}.`);
      setSelectedIds([]);
      setSelectedStageForBulk('');
      router.refresh();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsBulkUpdatingStage(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Barra de ações */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">
          {total} {total === 1 ? 'lead encontrado' : 'leads encontrados'}
        </p>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <>
              {/* Seleção de Estágio para Alteração em Massa */}
              <select
                value={selectedStageForBulk}
                onChange={(e) => setSelectedStageForBulk(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Selecione estágio...</option>
                <option value="1">Estágio 1</option>
                <option value="2">Estágio 2</option>
                <option value="3">Estágio 3</option>
                <option value="4">Estágio 4</option>
                <option value="5">Estágio 5</option>
                <option value="6">Estágio 6</option>
              </select>

              {/* Botão Alterar Estágio - com confirmação */}
              {selectedStageForBulk ? (
                <ConfirmDialog
                  title="Alterar Estágio em Massa"
                  description={`Tem certeza que deseja mover ${selectedIds.length} lead(s) para o Estágio ${selectedStageForBulk}? Esta ação não pode ser desfeita.`}
                  onConfirm={handleBulkUpdateStage}
                  destructive={false}
                >
                  <button
                    disabled={isBulkUpdatingStage}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBulkUpdatingStage ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Alterar Estágio ({selectedIds.length})
                  </button>
                </ConfirmDialog>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 bg-amber-300 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all opacity-50 cursor-not-allowed"
                >
                  <RefreshCw className="w-4 h-4" />
                  Alterar Estágio ({selectedIds.length})
                </button>
              )}

              {/* Botão Iniciar Cadência */}
              <button
                onClick={async () => {
                  setIsBulkStarting(true);
                  try {
                    await startLeadCadenceBulk(selectedIds);
                    toast.success(`${selectedIds.length} leads enviados para cadência.`);
                    setSelectedIds([]);
                    router.refresh();
                  } catch (e: any) {
                    toast.error(e.message);
                  } finally {
                    setIsBulkStarting(false);
                  }
                }}
                disabled={isBulkStarting}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isBulkStarting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Iniciar Cadência ({selectedIds.length})
              </button>
            </>
          )}

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-sm font-bold px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
            title="Atualizar dados"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            Atualizar
          </button>
          {leads.length > 0 && (
            <ConfirmDialog
              title="Limpar Base de Leads"
              description="Esta ação excluirá PERMANENTEMENTE todos os leads cadastrados no seu perfil. Esta ação não pode ser desfeita."
              onConfirm={async () => {
                await deleteAllLeads();
              }}
            >
              <button
                className="flex items-center gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-sm font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Base
              </button>
            </ConfirmDialog>
          )}
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-4 h-4" />
            Novo Lead
          </button>
        </div>
      </div>

      {/* Tabela */}
      {leads.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center py-20 text-center transition-colors">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4 transition-colors">
            <Plus className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Nenhum lead encontrado</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Adicione seu primeiro lead ou ajuste os filtros</p>
          <button
            onClick={() => setCreating(true)}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all"
          >
            Adicionar Lead
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors shadow-sm">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 transition-colors">
                  <th className="px-6 py-4 w-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedIds.length === leads.length && leads.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(leads.map(l => l.id));
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Lead</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Contato</th>
                   <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Estágio</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Origem</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Follow-up</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Último Operador</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Notas</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Última atividade</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {leads.map((lead) => {
                  const sourceConfig = LEAD_SOURCE_MAP[lead.source];
                  const linkedinUrl = getLinkedinProfileUrl(lead.linkedinUrl);
                  const gmailUrl = getGmailComposeUrl(lead.email, lead.fullName);

                  return (
                    <tr key={lead.id} className={cn(
                      "hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group",
                      selectedIds.includes(lead.id) && "bg-indigo-50/30 dark:bg-indigo-900/10"
                    )}>
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedIds.includes(lead.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds(prev => [...prev, lead.id]);
                            } else {
                              setSelectedIds(prev => prev.filter(id => id !== lead.id));
                            }
                          }}
                        />
                      </td>
                      {/* Lead info */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{lead.fullName}</p>
                          {lead.company && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lead.company}</p>
                          )}
                          {lead.jobTitle && (
                            <p className="text-xs text-slate-400 dark:text-slate-500">{lead.jobTitle}</p>
                          )}
                        </div>
                      </td>

                      {/* Canais de contato */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {lead.linkedinUrl && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'LINKEDIN' })}
                              className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="LinkedIn"
                            >
                              <LinkedinIcon className="w-4 h-4" />
                            </button>
                          )}
                          {lead.email && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'EMAIL' })}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                              title="Gmail"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                          {lead.phone && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'WHATSAPP' })}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                              title="WhatsApp"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>

                       {/* Status */}
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>

                      <td className="px-6 py-4">
                        {(lead as any).cadenceEngine ? (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <span className={cn(
                                "text-[10px] px-2 py-0.5 rounded-md font-black uppercase border transition-all",
                                (lead as any).cadenceEngine.status === 'ACTIVE' 
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm" 
                                  : "bg-amber-50 text-amber-700 border-amber-200 shadow-sm"
                              )}>
                                {(() => {
                                  const engine = (lead as any).cadenceEngine;
                                  const stage = engine.cadence?.stages?.find((s: any) => s.order === engine.currentStageOrder);
                                  const channel = stage?.channel || 'Ação';
                                  return `Passo ${engine.currentStageOrder} - ${channel}`;
                                })()}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold truncate max-w-[150px] ml-1" title={
                              (() => {
                                const engine = (lead as any).cadenceEngine;
                                const stage = engine.cadence?.stages?.find((s: any) => s.order === engine.currentStageOrder);
                                return stage?.template?.name || 'Sem nome';
                              })()
                            }>
                              {(() => {
                                const engine = (lead as any).cadenceEngine;
                                const stage = engine.cadence?.stages?.find((s: any) => s.order === engine.currentStageOrder);
                                return stage?.template?.name || 'Manual';
                              })()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-600 font-medium italic">Sem Cadência</span>
                        )}
                      </td>

                      {/* Origem */}
                      <td className="px-6 py-4">
                        {lead.customSource ? (
                          <div className="flex flex-col">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-600 text-[10px] font-black uppercase text-white shadow-lg shadow-indigo-500/30 tracking-wider">
                              {lead.customSource}
                            </span>
                          </div>
                        ) : (
                          <span className={cn(
                            "text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 tracking-tight",
                          )}>
                            {sourceConfig.label}
                          </span>
                        )}
                      </td>

                       {/* Follow-up / Cadência */}
                      <td className="px-6 py-4">
                        {(lead as any).cadenceEngine ? (
                          <div className="flex flex-col gap-1">
                            <span className={cn(
                              "text-[10px] inline-flex items-center px-2 py-0.5 rounded-md font-bold uppercase",
                              (lead as any).cadenceEngine.status === 'ACTIVE' 
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                : "bg-orange-50 text-orange-600 border border-orange-100"
                            )}>
                              {(lead as any).cadenceEngine.status === 'ACTIVE' ? 'Ativa' : 'Pausada'}
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                const { startLeadCadence } = await import('@/actions/cadence');
                                await startLeadCadence(lead.id);
                                router.refresh();
                              } catch (e: any) {
                                alert(e.message);
                              }
                            }}
                            className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 hover:bg-slate-50 px-2 py-1 rounded-md border border-slate-100 border-dashed transition-all"
                          >
                            + Iniciar
                          </button>
                        )}
                      </td>

                      {/* Último Operador */}
                      <td className="px-6 py-4">
                        {lead.lastOperator ? (
                          <div title={lead.lastOperator.name} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md inline-flex max-w-[140px]">
                            <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                            <span className="truncate font-medium">{lead.lastOperator.name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500">-</span>
                        )}
                      </td>

                      {/* Notas Preview */}
                      <td className="px-6 py-4">
                        {lead.leadNotes && lead.leadNotes.length > 0 ? (
                          <button 
                            onClick={() => setNotesModal({ isOpen: true, lead })}
                            className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-2 py-1.5 rounded-lg transition-all group/note"
                          >
                            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover/note:opacity-100" />
                            <span className="truncate max-w-[120px]" title={lead.leadNotes[0].content}>
                              {lead.leadNotes[0].content.replace('[SISTEMA]', '').trim()}
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setNotesModal({ isOpen: true, lead })}
                            className="text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-500 px-2 py-1 rounded-lg transition-colors"
                          >
                            -
                          </button>
                        )}
                      </td>

                      {/* Data (Última Atividade) */}
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-700 dark:text-slate-300">{formatDateTime(lead.updatedAt)}</span>
                        </div>
                      </td>

                      {/* Ações */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingLead(lead)}
                            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <ConfirmDialog
                            title="Excluir lead"
                            description={`Tem certeza que deseja excluir "${lead.fullName}"? Esta ação não pode ser desfeita.`}
                            onConfirm={() => handleDelete(lead.id)}
                          >
                            <button
                              className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </ConfirmDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Paginação ou Botão Mostrar Mais */}
          {(hasMore || totalPages > 1) && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 transition-colors bg-slate-50/30 dark:bg-slate-950/30">
              {hasMore ? (
                <div className="flex-1 flex justify-center">
                  <button
                    onClick={onLoadMore}
                    disabled={isLoadingMore}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Carregando...
                      </>
                    ) : (
                      <>
                        Mostrar mais ({total - leads.length} restantes)
                      </>
                    )}
                  </button>
                </div>
              ) : totalPages > 1 ? (
                <>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Página <span className="text-slate-900 dark:text-slate-100">{page}</span> de <span className="text-slate-900 dark:text-slate-100">{totalPages}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPageChange(page - 1)}
                      disabled={page <= 1}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onPageChange(page + 1)}
                      disabled={page >= totalPages}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* Modais */}
      {creating && <LeadForm onClose={() => setCreating(false)} />}
      {editingLead && <LeadForm lead={editingLead} onClose={() => setEditingLead(null)} />}

      <ContactActionModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal(prev => ({ ...prev, isOpen: false }))}
        lead={contactModal.lead}
        channel={contactModal.channel}
        templates={templates}
      />

      <LeadNotesHistoryModal
        isOpen={notesModal.isOpen}
        onClose={() => setNotesModal({ isOpen: false, lead: null })}
        leadId={notesModal.lead?.id || ''}
        leadName={notesModal.lead?.fullName || ''}
      />
    </div>
  );
}
