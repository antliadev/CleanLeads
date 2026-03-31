'use client';

import { useActionState } from 'react';
import { Loader2, X } from 'lucide-react';
import { createLead, updateLead, type LeadFormResult } from '@/actions/leads';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import type { Lead } from '@prisma/client';

interface LeadFormProps {
  lead?: Lead;
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

  // Fecha modal após sucesso
  if (state?.success) {
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {isEdit ? 'Editar Lead' : 'Novo Lead'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form action={formAction} className="px-8 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nome */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nome completo <span className="text-rose-500">*</span>
              </label>
              <input
                name="fullName"
                defaultValue={lead?.fullName}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                placeholder="João Silva"
              />
            </div>

            {/* Empresa */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Empresa</label>
              <input
                name="company"
                defaultValue={lead?.company ?? ''}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                placeholder="Empresa Ltda"
              />
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cargo</label>
              <input
                name="jobTitle"
                defaultValue={lead?.jobTitle ?? ''}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                placeholder="CEO, Diretor..."
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-mail</label>
              <input
                name="email"
                type="email"
                defaultValue={lead?.email ?? ''}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                placeholder="joao@empresa.com"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefone</label>
              <input
                name="phone"
                defaultValue={lead?.phone ?? ''}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">LinkedIn URL</label>
              <input
                name="linkedinUrl"
                defaultValue={lead?.linkedinUrl ?? ''}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                placeholder="https://linkedin.com/in/joao"
              />
            </div>

            {/* Status (só em edição) */}
            {isEdit && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                <select
                  name="status"
                  defaultValue={lead.status}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                >
                  {Object.entries(LEAD_STATUS_MAP).map(([value, { label }]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Notas */}
            <div className={isEdit ? '' : 'md:col-span-2'}>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notas</label>
              <textarea
                name="notes"
                defaultValue={lead?.notes ?? ''}
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none"
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
              className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm"
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
