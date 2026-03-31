'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Mail, ToggleLeft, ToggleRight, MessageSquare } from 'lucide-react';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { TemplateForm } from './TemplateForm';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { deleteTemplate } from '@/actions/templates';
import { TEMPLATE_CHANNEL_MAP } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Template } from '@prisma/client';

interface TemplatesClientProps {
  templates: Template[];
}

export function TemplatesClient({ templates }: TemplatesClientProps) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [filterChannel, setFilterChannel] = useState<string>('');

  const filtered = filterChannel
    ? templates.filter((t) => t.channel === filterChannel)
    : templates;

  async function handleDelete(id: string) {
    await deleteTemplate(id);
  }

  return (
    <div className="space-y-6">
      {/* Ações */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Filtro de canal */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-1.5">
          <button
            onClick={() => setFilterChannel('')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              filterChannel === '' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterChannel('LINKEDIN')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              filterChannel === 'LINKEDIN' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
          </button>
          <button
            onClick={() => setFilterChannel('WHATSAPP')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              filterChannel === 'WHATSAPP' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </button>
          <button
            onClick={() => setFilterChannel('EMAIL')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              filterChannel === 'EMAIL' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            <Mail className="w-3.5 h-3.5" /> E-mail
          </button>
        </div>

        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          Novo Template
        </button>
      </div>

      {/* Grid de cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum template cadastrado</h3>
          <p className="text-sm text-slate-400 mt-1">Crie seu primeiro modelo de mensagem</p>
          <button
            onClick={() => setCreating(true)}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all"
          >
            Criar Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((template) => {
            const channelConfig = TEMPLATE_CHANNEL_MAP[template.channel];

            return (
              <div
                key={template.id}
                className={cn(
                  'bg-white rounded-3xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all group',
                  !template.isActive && 'opacity-60'
                )}
              >
                {/* Header do card */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${channelConfig.color}`}>
                      {channelConfig.label}
                    </span>
                    <h3 className="font-bold text-slate-900 mt-2 leading-tight">{template.name}</h3>
                    {template.subject && (
                      <p className="text-xs text-slate-500 mt-0.5">Assunto: {template.subject}</p>
                    )}
                  </div>
                  <div className={cn('mt-0.5', template.isActive ? 'text-emerald-500' : 'text-slate-300')}>
                    {template.isActive
                      ? <ToggleRight className="w-6 h-6" />
                      : <ToggleLeft className="w-6 h-6" />
                    }
                  </div>
                </div>

                {/* Preview da mensagem */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                  {template.body}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-400">{formatDate(template.createdAt)}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(template)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <ConfirmDialog
                      title="Excluir template"
                      description={`Excluir "${template.name}"?`}
                      onConfirm={() => handleDelete(template.id)}
                    >
                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </ConfirmDialog>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modais */}
      {creating && <TemplateForm onClose={() => setCreating(false)} />}
      {editing && <TemplateForm template={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
