'use client';

import { useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { X, Loader2, Eye, Sparkles } from 'lucide-react';
import { createTemplate, updateTemplate, improveTemplateText, type TemplateFormResult } from '@/actions/templates';
import { TEMPLATE_CHANNEL_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Template } from '@prisma/client';

interface TemplateFormProps {
  template?: Template;
  onClose: () => void;
}

const PLACEHOLDER_LEAD = {
  firstName: 'João',
  fullName: 'João Silva',
  company: 'Tech Corp',
  jobTitle: 'CEO',
};

function resolveBody(body: string): string {
  return body
    .replace(/\{\{firstName\}\}/g, PLACEHOLDER_LEAD.firstName)
    .replace(/\{\{fullName\}\}/g, PLACEHOLDER_LEAD.fullName)
    .replace(/\{\{company\}\}/g, PLACEHOLDER_LEAD.company)
    .replace(/\{\{jobTitle\}\}/g, PLACEHOLDER_LEAD.jobTitle);
}

export function TemplateForm({ template, onClose }: TemplateFormProps) {
  const isEdit = !!template;
  const action = isEdit ? updateTemplate.bind(null, template.id) : createTemplate;

  const [state, formAction, isPending] = useActionState<TemplateFormResult | null, FormData>(
    action,
    null
  );

  const [channel, setChannel] = useState(template?.channel ?? 'LINKEDIN');
  const [body, setBody] = useState(template?.body ?? '');
  const [showPreview, setShowPreview] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const variables = [
    { label: 'Nome', value: '{{firstName}}' },
    { label: 'Empresa', value: '{{company}}' },
    { label: 'Cargo', value: '{{jobTitle}}' },
  ];

  const handleInsertVariable = (variable: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = body;
    const newText = currentText.substring(0, start) + variable + currentText.substring(end);

    setBody(newText);

    // Ajusta o cursor para logo após a variável inserida
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + variable.length, start + variable.length);
    }, 0);
  };

  // Fecha modal APÓS o ciclo de render (evita setState-during-render)
  useEffect(() => {
    if (state?.success) onClose();
  }, [state?.success]);

  const handleImproveText = async () => {
    if (!body.trim()) return;
    setIsImproving(true);
    try {
      const improved = await improveTemplateText(body);
      setBody(improved);
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-transparent dark:border-slate-800 shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800 transition-colors">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {isEdit ? 'Editar Template' : 'Novo Template'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              className={cn(
                'flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl border transition-all',
                showPreview
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              )}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          {showPreview ? (
            <div className="px-8 py-6 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 transition-colors">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  Preview com dados de exemplo
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {resolveBody(body) || 'Nenhum conteúdo para prévia...'}
                </p>
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500 flex flex-wrap gap-2">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Variáveis disponíveis:</span>
                {['{{firstName}}', '{{fullName}}', '{{company}}', '{{jobTitle}}'].map((v) => (
                  <code key={v} className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-lg transition-colors">{v}</code>
                ))}
              </div>
            </div>
          ) : (
            <form action={formAction} className="px-8 py-6 space-y-5">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nome do Template <span className="text-rose-500">*</span>
                </label>
                <input
                  name="name"
                  defaultValue={template?.name}
                  required
                  className="w-full bg-transparent dark:bg-slate-950 border border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="Abordagem inicial LinkedIn"
                />
              </div>

              {/* Canal */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Canal</label>
                <div className="flex gap-3">
                  {Object.entries(TEMPLATE_CHANNEL_MAP).map(([value, { label }]) => (
                    <label key={value} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="channel"
                        value={value}
                        checked={channel === value}
                        onChange={() => setChannel(value as any)}
                        className="sr-only"
                      />
                      <div className={cn(
                        'text-center py-2.5 rounded-xl border-2 text-sm font-semibold transition-all',
                        channel === value
                          ? 'border-indigo-500 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      )}>
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Assunto (só e-mail) */}
              {channel === 'EMAIL' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Assunto</label>
                  <input
                    name="subject"
                    defaultValue={template?.subject ?? ''}
                    className="w-full bg-transparent dark:bg-slate-950 border border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="Assunto do e-mail"
                  />
                </div>
              )}

              {/* Corpo */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Mensagem <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleImproveText}
                    disabled={isImproving || !body.trim()}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 disabled:opacity-50 transition-all px-2 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  >
                    {isImproving ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Ajustar Texto
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={6}
                  className="w-full bg-transparent dark:bg-slate-950 border border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder={`Olá {{firstName}},\n\nVi seu trabalho na {{company}}...`}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {variables.map((v) => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => handleInsertVariable(v.value)}
                      className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-all active:scale-95"
                    >
                      + {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ativo */}
              <div className="flex items-center gap-3">
                <input
                  id="isActive"
                  type="checkbox"
                  name="isActive"
                  value="on"
                  defaultChecked={template?.isActive ?? true}
                  className="w-4 h-4 rounded text-indigo-600"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Template ativo
                </label>
              </div>

              {state?.error && (
                <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-4 py-3 text-rose-600 dark:text-rose-400 text-sm transition-colors">
                  {state.error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition-all">
                  Cancelar
                </button>
                <button type="submit" disabled={isPending}
                  className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200/50 dark:shadow-none">
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isEdit ? 'Salvar' : 'Criar Template'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
