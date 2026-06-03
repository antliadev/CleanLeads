'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  User,
  MessageSquare,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { completeManualAction, cancelManualAction } from '@/actions/manual-actions';
import { useOperator } from '@/components/providers/OperatorProvider';
import { toast } from 'sonner';
import type { ManualAgendaItem } from '@/types/agenda';
import { MANUAL_ACTION_TYPE_LABELS, MANUAL_ACTION_TYPE_ICONS } from '@/types/agenda';

interface ManualActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  action: ManualAgendaItem | null;
  onActionComplete?: () => void;
}

export function ManualActionDrawer({
  isOpen,
  onClose,
  action,
  onActionComplete,
}: ManualActionDrawerProps) {
  const [completionNotes, setCompletionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeOperator } = useOperator();

  // Trava scroll quando drawer abre
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (!isOpen || !action) return null;

  const scheduledDate = new Date(action.scheduledAt);
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(scheduledDate);
  const timeFormatted = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(scheduledDate);

  const handleComplete = async () => {
    if (!activeOperator) {
      toast.error('Selecione um operador antes de concluir.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await completeManualAction(
        action.id,
        activeOperator.id,
        completionNotes.trim() || undefined
      );

      if (result.success) {
        toast.success('Ação concluída com sucesso!');
        onClose();
        onActionComplete?.();
      } else {
        toast.error(result.error || 'Erro ao concluir ação');
      }
    } catch {
      toast.error('Erro inesperado ao concluir ação');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!activeOperator) {
      toast.error('Selecione um operador antes de cancelar.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await cancelManualAction(
        action.id,
        activeOperator.id,
        completionNotes.trim() || undefined
      );

      if (result.success) {
        toast.success('Ação cancelada.');
        onClose();
        onActionComplete?.();
      } else {
        toast.error(result.error || 'Erro ao cancelar ação');
      }
    } catch {
      toast.error('Erro inesperado ao cancelar ação');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl h-full flex flex-col border-l border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={onClose}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge Manual */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-black text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                  <span>{MANUAL_ACTION_TYPE_ICONS[action.actionType]}</span>
                  Ação Manual
                </span>
              </div>
            </div>

            {/* Nome do lead */}
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                {action.lead.fullName}
              </h2>
              <p className="text-slate-500 font-medium">
                {action.lead.company || 'Sem empresa'}{action.lead.jobTitle ? ` | ${action.lead.jobTitle}` : ''}
              </p>
            </div>

            {/* Indicador de vencimento */}
            {action.isOverdue && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-5 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-3"
              >
                <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <p className="text-sm font-bold text-rose-700 dark:text-rose-300">
                  {action.nextActionPrimary} — Esta ação está vencida!
                </p>
              </motion.div>
            )}
          </div>

          {/* Conteúdo */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">

            {/* Detalhes da ação */}
            <div className="bg-violet-50/50 dark:bg-violet-950/20 border-2 border-violet-100 dark:border-violet-900/30 p-6 rounded-[2rem] space-y-5">
              {/* Título da ação */}
              <div className="space-y-1">
                <p className="text-[10px] font-black text-violet-900/40 dark:text-violet-300/40 uppercase tracking-widest">
                  Título da Ação
                </p>
                <h3 className="text-xl font-black text-violet-900 dark:text-violet-100 leading-tight">
                  {action.title}
                </h3>
              </div>

              {/* Grid de informações */}
              <div className="grid grid-cols-2 gap-4">
                {/* Tipo */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 space-y-1 border border-violet-100 dark:border-violet-900/30">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {MANUAL_ACTION_TYPE_ICONS[action.actionType]} {MANUAL_ACTION_TYPE_LABELS[action.actionType]}
                  </p>
                </div>

                {/* Canal */}
                {action.channel && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 space-y-1 border border-violet-100 dark:border-violet-900/30">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Canal</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{action.channel}</p>
                  </div>
                )}

                {/* Data */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 space-y-1 border border-violet-100 dark:border-violet-900/30">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Data
                  </p>
                  <p className={cn(
                    "text-sm font-bold",
                    action.isOverdue ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-200"
                  )}>
                    {dateFormatted}
                  </p>
                </div>

                {/* Horário */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 space-y-1 border border-violet-100 dark:border-violet-900/30">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Horário
                  </p>
                  <p className={cn(
                    "text-sm font-bold",
                    action.isOverdue ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-200"
                  )}>
                    {timeFormatted}
                  </p>
                </div>
              </div>

              {/* Criado por */}
              {action.createdByOperatorName && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  <span>Criado por <span className="font-bold">{action.createdByOperatorName}</span></span>
                </div>
              )}

              {/* Observação original */}
              {action.notes && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-violet-900/40 dark:text-violet-300/40 uppercase tracking-widest flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Observação
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-white dark:bg-slate-900/50 p-3 rounded-xl border border-violet-100 dark:border-violet-900/20">
                    {action.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Nota de conclusão */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Nota de Conclusão (opcional)
              </h4>
              <textarea
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                disabled={isSubmitting}
                className="w-full h-28 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl outline-none focus:border-violet-500 transition-all text-sm font-medium resize-none disabled:opacity-50"
                placeholder="Registre o resultado ou motivo do cancelamento..."
              />
            </div>
          </div>

          {/* Footer com ações */}
          <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            {/* Botão Concluir */}
            <button
              disabled={isSubmitting}
              onClick={handleComplete}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-3xl bg-emerald-600 text-white font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 dark:shadow-none active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
              {isSubmitting ? 'Salvando...' : 'Concluir Ação'}
            </button>

            {/* Botões secundários */}
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={isSubmitting}
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-3xl border-2 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                Cancelar Ação
              </button>

              <button
                disabled={isSubmitting}
                onClick={onClose}
                className="px-6 py-3 rounded-3xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Fechar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
