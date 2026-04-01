'use client';

import { useActionState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { createLead, updateLead, type LeadFormResult } from '@/actions/leads';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import type { Prisma } from '@prisma/client';

type LeadWithHistory = Prisma.LeadGetPayload<{
  include: { histories: true };
}>;

interface LeadFormProps {
  lead?: LeadWithHistory;
  onClose: () => void;
}

export function LeadForm({ lead, onClose }: LeadFormProps) {
  const isEdit = !!lead;

  const action = isEdit
    ? updateLead.bind(null, lead.id)
    : createLead;

  const [state, formAction, isPending] = useActionState<LeadFormResult | null, FormData>(
    action,
    null
  );

  // Fecha modal APÓS o ciclo de render (evita setState-during-render)
  useEffect(() => {
    if (state?.success) onClose();
  }, [state?.success]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800 transition-colors">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {isEdit ? 'Editar Lead' : 'Novo Lead'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form action={formAction} className="px-8 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nome */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Nome completo <span className="text-rose-500">*</span>
              </label>
              <input
                name="fullName"
                defaultValue={lead?.fullName}
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
                defaultValue={lead?.company ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="Empresa Ltda"
              />
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Cargo</label>
              <input
                name="jobTitle"
                defaultValue={lead?.jobTitle ?? ''}
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
                defaultValue={lead?.email ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="joao@empresa.com"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Telefone</label>
              <input
                name="phone"
                defaultValue={lead?.phone ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">LinkedIn URL</label>
              <input
                name="linkedinUrl"
                defaultValue={lead?.linkedinUrl ?? ''}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                placeholder="https://linkedin.com/in/joao"
              />
            </div>

            {/* Status (só em edição) */}
            {isEdit && (
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
            )}

            {/* Notas */}
            <div className={isEdit ? '' : 'md:col-span-2'}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Notas</label>
              <textarea
                name="notes"
                defaultValue={lead?.notes ?? ''}
                rows={3}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors resize-none"
                placeholder="Informações adicionais..."
              />
            </div>
          </div>

          {/* Seção de Histórico */}
          {isEdit && lead?.histories && lead.histories.length > 0 && (
            <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                Histórico de Atualizações (Imports)
              </h3>
              <div className="space-y-3">
                {lead.histories.map((h, i) => (
                  <div key={h.id} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm transition-colors">
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                      <span>Atualizado via: <span className="text-indigo-600 dark:text-indigo-400">{h.actionBy}</span></span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                        {new Date(h.createdAt).toLocaleString('pt-BR')}
                      </span>
                    </p>
                    <details className="cursor-pointer">
                      <summary className="text-xs text-slate-500 dark:text-slate-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400">Ver Dados Anteriores vs Novos</summary>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-xs font-mono bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 max-h-40 overflow-auto transition-colors">
                        <div>
                          <p className="text-slate-400 dark:text-slate-500 mb-1 uppercase font-bold text-[10px]">Antes</p>
                          <pre className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                            {JSON.stringify(h.previousData, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <p className="text-indigo-400 mb-1 uppercase font-bold text-[10px]">Depois</p>
                          <pre className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                            {JSON.stringify(h.newData, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          )}

          {state?.error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-rose-600 text-sm font-medium">
              {state.error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? 'Salvar alterações' : 'Criar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
