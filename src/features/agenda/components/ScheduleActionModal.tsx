'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CalendarPlus,
  Search,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createManualAction, getLeadsForActionSelect } from '@/actions/manual-actions';
import { useOperator } from '@/components/providers/OperatorProvider';
import { toast } from 'sonner';
import type { ManualActionType, ManualActionChannel } from '@/types/agenda';
import { MANUAL_ACTION_TYPE_LABELS, MANUAL_ACTION_TYPE_ICONS } from '@/types/agenda';

interface ScheduleActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  /** Pre-selects a specific lead (optional, used from lead view) */
  preselectedLeadId?: string;
  preselectedLeadName?: string;
}

interface LeadOption {
  id: string;
  fullName: string;
  company: string | null;
}

const ACTION_TYPES: Array<{ value: ManualActionType; emoji: string; label: string }> = [
  { value: 'LIGACAO',  emoji: '📞', label: 'Ligação' },
  { value: 'REUNIAO',  emoji: '📅', label: 'Reunião' },
  { value: 'LINKEDIN', emoji: '🔗', label: 'LinkedIn' },
  { value: 'EMAIL',    emoji: '✉️', label: 'E-mail' },
  { value: 'WHATSAPP', emoji: '💬', label: 'WhatsApp' },
  { value: 'TAREFA',   emoji: '✅', label: 'Tarefa' },
];

const CHANNELS: Array<{ value: ManualActionChannel; label: string }> = [
  { value: 'LINKEDIN',   label: 'LinkedIn' },
  { value: 'EMAIL',      label: 'E-mail' },
  { value: 'WHATSAPP',   label: 'WhatsApp' },
  { value: 'TELEFONE',   label: 'Telefone' },
  { value: 'PRESENCIAL', label: 'Presencial' },
  { value: 'OUTRO',      label: 'Outro' },
];

/** Converte datetime-local (YYYY-MM-DDTHH:mm) para Date em UTC */
function localInputToUtc(localValue: string): Date | null {
  if (!localValue) return null;
  return new Date(localValue);
}

/** Retorna string no formato datetime-local para agora + 1h */
function defaultDateTimeLocal(): string {
  const d = new Date();
  d.setHours(d.getHours() + 1, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function ScheduleActionModal({
  isOpen,
  onClose,
  onSuccess,
  preselectedLeadId,
  preselectedLeadName,
}: ScheduleActionModalProps) {
  const { activeOperator } = useOperator();

  // Form state
  const [selectedLeadId, setSelectedLeadId] = useState(preselectedLeadId ?? '');
  const [selectedLeadName, setSelectedLeadName] = useState(preselectedLeadName ?? '');
  const [actionType, setActionType] = useState<ManualActionType>('LIGACAO');
  const [channel, setChannel] = useState<ManualActionChannel | ''>('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [dateTimeLocal, setDateTimeLocal] = useState(defaultDateTimeLocal);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lead search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadOptions, setLeadOptions] = useState<LeadOption[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);
  const [leadSearchError, setLeadSearchError] = useState<string | null>(null);

  // Reset ao abrir
  useEffect(() => {
    if (isOpen) {
      setSelectedLeadId(preselectedLeadId ?? '');
      setSelectedLeadName(preselectedLeadName ?? '');
      setLeadSearch(preselectedLeadName ?? '');
      setActionType('LIGACAO');
      setChannel('');
      setTitle('');
      setNotes('');
      setDateTimeLocal(defaultDateTimeLocal());
      setLeadOptions([]);
      setShowLeadDropdown(false);
      setLeadSearchError(null);
    }
  }, [isOpen, preselectedLeadId, preselectedLeadName]);

  // Auto-gera título quando muda tipo de ação
  useEffect(() => {
    if (!title || ACTION_TYPES.some(t => t.label === title || `${t.emoji} ${t.label}` === title)) {
      setTitle(`${MANUAL_ACTION_TYPE_ICONS[actionType]} ${MANUAL_ACTION_TYPE_LABELS[actionType]}`);
    }
  }, [actionType, title]);

  const searchLeads = useCallback(async (query: string) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setLeadOptions([]);
      setShowLeadDropdown(true);
      setLeadSearchError('Digite um nome ou empresa para pesquisar.');
      return;
    }

    setLeadSearchError(null);
    setIsLoadingLeads(true);
    setShowLeadDropdown(true);
    try {
      const results = await getLeadsForActionSelect(normalizedQuery);
      setLeadOptions(results);
    } catch {
      setLeadOptions([]);
      setLeadSearchError('Erro ao buscar leads.');
    } finally {
      setIsLoadingLeads(false);
    }
  }, []);

  const handleSelectLead = (lead: LeadOption) => {
    setSelectedLeadId(lead.id);
    setSelectedLeadName(lead.fullName);
    setLeadSearch(lead.fullName);
    setShowLeadDropdown(false);
    setLeadSearchError(null);
  };

  const handleLeadSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    searchLeads(leadSearch);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLeadId) {
      toast.error('Selecione um lead para esta ação');
      return;
    }
    if (!title.trim()) {
      toast.error('Informe um título para a ação');
      return;
    }
    if (!dateTimeLocal) {
      toast.error('Selecione a data e horário');
      return;
    }

    const scheduledAt = localInputToUtc(dateTimeLocal);
    if (!scheduledAt) {
      toast.error('Data/hora inválida');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createManualAction({
        leadId: selectedLeadId,
        title: title.trim(),
        actionType,
        channel: channel || null,
        notes: notes.trim() || undefined,
        scheduledAt,
        createdByOperatorId: activeOperator?.id ?? undefined,
      });

      if (result.success) {
        toast.success('Ação agendada com sucesso!');
        onClose();
        onSuccess?.();
      } else {
        toast.error(result.error || 'Erro ao agendar ação');
      }
    } catch {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/20 dark:to-slate-900">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/50 rounded-2xl">
                  <CalendarPlus className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Agendar Ação Manual
              </h2>
              <p className="text-slate-500 font-medium mt-1">
                Agenda uma ação independente do fluxo de cadência.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-7">

                {/* Seleção de Lead */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Lead *
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={leadSearch}
                        onChange={(e) => {
                          setLeadSearch(e.target.value);
                          setSelectedLeadId('');
                          setSelectedLeadName('');
                          setLeadOptions([]);
                          setShowLeadDropdown(false);
                          setLeadSearchError(null);
                        }}
                        onFocus={() => setShowLeadDropdown(leadOptions.length > 0 || !!leadSearchError)}
                        onKeyDown={handleLeadSearchKeyDown}
                        placeholder="Buscar lead pelo nome ou empresa..."
                        className="w-full pl-10 pr-12 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:border-violet-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => searchLeads(leadSearch)}
                        disabled={isLoadingLeads}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors disabled:opacity-50"
                        title="Pesquisar lead"
                        aria-label="Pesquisar lead"
                      >
                        {isLoadingLeads ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Dropdown de resultados */}
                    {showLeadDropdown && (leadOptions.length > 0 || leadSearchError || (!isLoadingLeads && leadSearch.trim() && leadOptions.length === 0)) && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-10 overflow-hidden max-h-48 overflow-y-auto"
                      >
                        {leadSearchError ? (
                          <div className="px-4 py-3 text-sm font-medium text-rose-500">
                            {leadSearchError}
                          </div>
                        ) : leadOptions.length > 0 ? (
                          leadOptions.map((lead) => (
                            <button
                              key={lead.id}
                              type="button"
                              onClick={() => handleSelectLead(lead)}
                              className="w-full text-left px-4 py-3 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0"
                            >
                              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{lead.fullName}</p>
                              {lead.company && (
                                <p className="text-xs text-slate-400 font-medium">{lead.company}</p>
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm font-medium text-slate-400">
                            Nenhum lead encontrado
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Lead selecionado */}
                    {selectedLeadId && (
                      <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-xl">
                        <span className="w-2 h-2 rounded-full bg-violet-500" />
                        <span className="text-sm font-bold text-violet-700 dark:text-violet-300">
                          {selectedLeadName}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLeadId('');
                            setSelectedLeadName('');
                            setLeadSearch('');
                            setLeadOptions([]);
                            setShowLeadDropdown(false);
                            setLeadSearchError(null);
                          }}
                          className="ml-auto text-violet-400 hover:text-violet-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tipo de Ação */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Tipo de Ação *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ACTION_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setActionType(type.value)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl border-2 transition-all",
                          actionType === type.value
                            ? "bg-violet-100 dark:bg-violet-900/30 border-violet-500 text-violet-700 dark:text-violet-300"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700"
                        )}
                      >
                        <span className="text-lg">{type.emoji}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider leading-none">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Título */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={200}
                    placeholder="Ex: Follow-up pós demo, Apresentação de proposta..."
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                {/* Canal (opcional) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Canal (opcional)
                  </label>
                  <div className="relative">
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as ManualActionChannel | '')}
                      className="w-full appearance-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-medium outline-none focus:border-violet-500 transition-all cursor-pointer"
                    >
                      <option value="">Sem canal específico</option>
                      {CHANNELS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Data e Hora */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Data e Horário *
                  </label>
                  <input
                    type="datetime-local"
                    value={dateTimeLocal}
                    onChange={(e) => setDateTimeLocal(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                {/* Observação */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Observação (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={2000}
                    rows={3}
                    placeholder="Contexto, objetivo da ação, informações relevantes..."
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:border-violet-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 pt-2 space-y-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedLeadId || !title.trim() || !dateTimeLocal}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-3xl bg-violet-600 text-white font-black hover:bg-violet-700 transition-all shadow-xl shadow-violet-100 dark:shadow-none active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Agendando...</>
                  ) : (
                    <><CalendarPlus className="w-5 h-5" /> Agendar Ação</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-3xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
