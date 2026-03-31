'use client';

import { useState, useEffect } from 'react';
import { X, Copy, ExternalLink, Check, Mail } from 'lucide-react';
import { Template, TemplateChannel } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { parseTemplate } from '@/lib/template-parser';
import { LinkedinIcon } from '@/components/icons/Linkedin';
import { getGmailComposeUrl } from '@/lib/utils';

type LeadWithHistory = Prisma.LeadGetPayload<{
  include: { histories: true };
}>;

interface ContactActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadWithHistory | null;
  channel: TemplateChannel;
  templates: Template[];
}

export function ContactActionModal({
  isOpen,
  onClose,
  lead,
  channel,
  templates,
}: ContactActionModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [compiledText, setCompiledText] = useState('');
  const [copied, setCopied] = useState(false);

  // Filtra apenas templates ativos para o canal atual
  const activeTemplates = templates.filter(
    (t) => t.isActive && t.channel === channel
  );

  // Estabilidade: quando o modal abre ou muda de canal, reinicia o estado
  useEffect(() => {
    if (!isOpen) return;
    // Reseta seleção para o primeiro template do canal atual
    const firstTemplate = activeTemplates[0];
    setSelectedTemplateId(firstTemplate?.id ?? '');
    setCopied(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, channel]);

  // Quando muda o template selecionado, recompila o texto substituindo as variáveis
  useEffect(() => {
    if (!lead) {
      setCompiledText('');
      return;
    }
    const template = activeTemplates.find((t) => t.id === selectedTemplateId);
    if (template) {
      setCompiledText(parseTemplate(template.body, lead));
    } else {
      setCompiledText('');
    }
    setCopied(false);
  // activeTemplates depende de templates+channel, selectedTemplateId e lead
  }, [selectedTemplateId, lead, templates, channel]);

  if (!isOpen || !lead) return null;

  const selectedTemplate = activeTemplates.find((t) => t.id === selectedTemplateId);

  const handleCopy = async () => {
    try {
      if (!compiledText.trim()) return;
      await navigator.clipboard.writeText(compiledText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
    }
  };

  const handleCopyAndGo = async () => {
    await handleCopy();

    if (channel === 'LINKEDIN') {
      // Usa a URL real do lead cadastrada — sem construção artificial
      if (lead.linkedinUrl) {
        const url = lead.linkedinUrl.startsWith('http')
          ? lead.linkedinUrl
          : `https://${lead.linkedinUrl}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else if (channel === 'EMAIL' && lead.email) {
      // Abre o Gmail com a composição já preenchida
      const gmailUrl = getGmailComposeUrl(
        lead.email,
        lead.fullName,
        selectedTemplate?.subject ?? undefined,
        compiledText || undefined
      );
      if (gmailUrl) {
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const isLinkedIn = channel === 'LINKEDIN';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      // Fechar ao clicar fora do modal
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              {isLinkedIn ? (
                <LinkedinIcon className="w-5 h-5 text-blue-600" />
              ) : (
                <Mail className="w-5 h-5 text-indigo-600" />
              )}
              Contato via {isLinkedIn ? 'LinkedIn' : 'E-mail'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Preparando mensagem para{' '}
              <strong className="text-slate-700">{lead.fullName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-6 space-y-6">
          {/* Seleção de Template */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Escolha um Template
            </label>
            {activeTemplates.length > 0 ? (
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium transition-colors"
              >
                <option value="" disabled>
                  Selecione um template de {isLinkedIn ? 'LinkedIn' : 'E-mail'}
                </option>
                {activeTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-sm">
                Nenhum template ativo encontrado para{' '}
                {isLinkedIn ? 'LinkedIn' : 'E-mail'}. Crie um na guia Templates.
              </div>
            )}
          </div>

          {/* Preview da Mensagem Personalizada */}
          {selectedTemplateId && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">
                  Mensagem Personalizada
                </label>
                <button
                  onClick={handleCopy}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copiar apenas o texto
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={compiledText}
                onChange={(e) => setCompiledText(e.target.value)}
                rows={6}
                className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:border-indigo-500 text-slate-700 font-medium font-sans leading-relaxed resize-y transition-colors"
                placeholder="A mensagem será renderizada aqui..."
              />
              <p className="text-xs text-slate-400 mt-2">
                As variáveis do template foram preenchidas com os dados de{' '}
                <strong>{lead.fullName}</strong>. Você pode editar o texto antes
                de copiar.
              </p>
            </div>
          )}
        </div>

        {/* Rodapé com Ações */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={handleCopyAndGo}
            disabled={!compiledText}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {!compiledText ? (
              'Escolha um template'
            ) : copied ? (
              <>
                <Check className="w-4 h-4" /> Redirecionando...
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {isLinkedIn ? 'Copiar & Abrir LinkedIn' : 'Copiar & Abrir Gmail'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
