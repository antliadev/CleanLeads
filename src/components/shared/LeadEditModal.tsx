'use client';

import { useActionState, useEffect, useState } from 'react';
import { Loader2, X, Pencil } from 'lucide-react';
import { updateLead, getLeadById, type LeadFormResult } from '@/actions/leads';
import { getCadenceSettings } from '@/actions/cadence';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { useOperator } from '@/components/providers/OperatorProvider';
import type { LeadFullDetails } from '@/features/leads/types';
import { useLeadEditorActions } from '@/lib/stores/lead-store';
import { toast } from 'sonner';

interface LeadEditModalProps {
  lead: { id: string; fullName: string; email?: string | null; company?: string | null; jobTitle?: string | null; phone?: string | null; linkedinUrl?: string | null; customSource?: string | null; status?: string; notes?: string | null } | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal de edição de lead reutilizável.
 * Usado tanto na guia Leads quanto na Agenda.
 * Carrega detalhes completos (históricos, notas) on-demand.
 */
export function LeadEditModal({ lead, isOpen, onClose }: LeadEditModalProps) {
  const { activeOperator } = useOperator();
  const { setSaving, closeLeadEditor: closeEditorFromStore } = useLeadEditorActions();
  const [fullLead, setFullLead] = useState<LeadFullDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  
  // Combina o onClose do props com o close do store
  const handleClose = () => {
    onClose();
    closeEditorFromStore();
    setFullLead(null);
  };

  const [cadenceStages, setCadenceStages] = useState<{ order: number; channel: string; templateName?: string }[]>([]);
  const [selectedStageOrder, setSelectedStageOrder] = useState<string>('');

  // Carrega detalhes completos do lead on-demand quando modal abre
  useEffect(() => {
    if (isOpen && lead?.id) {
      setIsLoadingDetails(true);
      Promise.all([
        getLeadById(lead.id),
        getCadenceSettings()
      ]).then(([fullDetails, cadence]) => {
        setFullLead(fullDetails);
        if (cadence?.stages) {
          setCadenceStages(cadence.stages);
          const currentStage = (fullDetails as any)?.cadenceEngine?.currentStageOrder;
          if (currentStage) {
            setSelectedStageOrder(String(currentStage));
          }
        }
      }).catch((err) => {
        console.error('Erro ao carregar detalhes do lead:', err);
        toast.error('Erro ao carregar dados completos do lead');
      }).finally(() => {
        setIsLoadingDetails(false);
      });
    }
  }, [isOpen, lead?.id]);

  // Trava scroll quando modal abre
  useEffect(() => {
    if (isOpen) {
      const original = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [isOpen]);

  const action = lead ? updateLead.bind(null, lead.id) : null;

  const [state, formAction, isPending] = useActionState<LeadFormResult | null, FormData>(
    action ?? (() => Promise.resolve({ success: false, error: 'Lead não encontrado' })),
    null
  );

  // Loading state
  useEffect(() => {
    setSaving(isPending);
  }, [isPending, setSaving]);

  // Fecha modal após sucesso
  useEffect(() => {
    if (state?.success) {
      toast.success('Lead atualizado com sucesso!');
      handleClose();
    }
  }, [state?.success, handleClose]);

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transition-colors animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30">
              <Pencil className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              Editar Lead
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form action={formAction} className="px-6 sm:px-8 py-5 sm:py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <input type="hidden" name="operatorId" value={activeOperator?.id || ''} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nome */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Nome completo <span className="text-rose-500">*</span>
              </label>
              <input
                name="fullName"
                defaultValue={lead.fullName}
                required
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="João Silva"
              />
            </div>

            {/* Empresa */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Empresa</label>
              <input
                name="company"
                defaultValue={lead.company ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="Empresa Ltda"
              />
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Cargo</label>
              <input
                name="jobTitle"
                defaultValue={lead.jobTitle ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="CEO, Diretor..."
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">E-mail</label>
              <input
                name="email"
                type="email"
                defaultValue={lead.email ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="joao@empresa.com"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Telefone</label>
              <input
                name="phone"
                defaultValue={lead.phone ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">LinkedIn URL</label>
              <input
                name="linkedinUrl"
                defaultValue={lead.linkedinUrl ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="https://linkedin.com/in/joao"
              />
            </div>

            {/* Origem */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Origem</label>
              <input
                name="customSource"
                defaultValue={lead.customSource ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors font-bold text-indigo-600 dark:text-indigo-400"
                placeholder="Ex: Indicação, Evento, etc."
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
              <select
                name="status"
                defaultValue={lead.status}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
              >
                {Object.entries(LEAD_STATUS_MAP).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Estágio da Cadência */}
            {cadenceStages.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Estágio da Cadência
                  <span className="text-xs font-normal text-slate-400 ml-2">(inicie ou reposicione)</span>
                </label>
                <input type="hidden" name="cadenceStageOrder" value={selectedStageOrder} />
                <select
                  value={selectedStageOrder}
                  onChange={(e) => setSelectedStageOrder(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                >
                  <option value="">-- Sem cadência --</option>
                  {cadenceStages.map((stage) => (
                    <option key={stage.order} value={stage.order}>
                      Estágio {stage.order} - {stage.channel === 'LINKEDIN' ? 'LinkedIn' : stage.channel === 'EMAIL' ? 'E-mail' : 'WhatsApp'}
                      {stage.templateName ? ` (${stage.templateName})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Notas */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Notas</label>
              <textarea
                name="notes"
                rows={3}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors resize-none"
                placeholder="Informações adicionais..."
              />
            </div>
          </div>

          {state?.error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-rose-600 text-sm font-medium">
              {state.error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors text-sm min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}