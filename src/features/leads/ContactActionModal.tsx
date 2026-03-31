'use client';

import { useState, useEffect } from 'react';
import { X, Copy, ExternalLink, Check } from 'lucide-react';
import { Lead, Template, TemplateChannel } from '@prisma/client';
import { parseTemplate } from '@/lib/template-parser';
import { updateLeadStatus } from '@/actions/leads'; // Opcional: para atualizar o status do lead
import { LinkedinIcon } from '@/components/icons/Linkedin';

interface ContactActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  channel: TemplateChannel;
  templates: Template[];
}

export function ContactActionModal({ isOpen, onClose, lead, channel, templates }: ContactActionModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [compiledText, setCompiledText] = useState('');
  const [copied, setCopied] = useState(false);

  // Filtra apenas templates ativos para o canal
  const activeTemplates = templates.filter(t => t.isActive && t.channel === channel);

  useEffect(() => {
    if (isOpen && activeTemplates.length > 0 && !selectedTemplateId) {
      // Auto-selecionar o primeiro template por padrão
      setSelectedTemplateId(activeTemplates[0].id);
    }
  }, [isOpen, activeTemplates, selectedTemplateId]);

  useEffect(() => {
    // Quando mudar o template selecionado, re-compila o texto
    const template = activeTemplates.find(t => t.id === selectedTemplateId);
    if (template && lead) {
      setCompiledText(parseTemplate(template.body, lead));
    } else {
      setCompiledText('');
    }
    setCopied(false);
  }, [selectedTemplateId, lead, activeTemplates]);

  if (!isOpen || !lead) return null;

  const handleCopy = async () => {
    try {
      if (compiledText.trim() === '') return;
      await navigator.clipboard.writeText(compiledText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleCopyAndGo = async () => {
    await handleCopy();

    // Redirecionamento
    if (channel === 'LINKEDIN' && lead.linkedinUrl) {
      window.open(lead.linkedinUrl, '_blank', 'noopener,noreferrer');
      // Opcional: Atualizar Status do lead para "CONTATADO" automaticamente
      // se ele estiver como NOVO. Mas podemos deixar manual na grid se for melhor, 
      // ou perguntar ao usuário.
    } else if (channel === 'EMAIL' && lead.email) {
      const template = activeTemplates.find(t => t.id === selectedTemplateId);
      const subject = template?.subject ? `?subject=${encodeURIComponent(template.subject)}` : '';
      window.open(`mailto:${lead.email}${subject}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              {channel === 'LINKEDIN' ? <LinkedinIcon className="w-5 h-5 text-blue-600" /> : <ExternalLink className="w-5 h-5 text-indigo-600" />}
              Contato via {channel === 'LINKEDIN' ? 'LinkedIn' : 'E-mail'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Preparando mensagem para <strong className="text-slate-700">{lead.fullName}</strong>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Seleção de Template */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Escolha um Template</label>
            {activeTemplates.length > 0 ? (
              <select 
                value={selectedTemplateId} 
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium"
              >
                <option value="" disabled>Selecione um template de {channel}</option>
                {activeTemplates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            ) : (
               <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-sm">
                 Nenhum template ativo encontrado para {channel}. Crie um na guia Templates.
               </div>
            )}
          </div>

          {/* Preview Textarea */}
          {selectedTemplateId && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Mensagem Personalizada</label>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  {copied ? <><Check className="w-3 h-3" /> Copiado!</> : <><Copy className="w-3 h-3" /> Copiar Cópia Limpa</>}
                </button>
              </div>
              <textarea
                value={compiledText}
                onChange={(e) => setCompiledText(e.target.value)}
                rows={6}
                className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:border-indigo-500 text-slate-700 font-medium font-sans leading-relaxed resize-y"
                placeholder="A mensagem será renderizada aqui..."
              />
              <p className="text-xs text-slate-400 mt-2">
                Os dados de <strong>{lead.fullName}</strong> já foram preenchidos (se as variáveis do template corresponderem). Você pode editar este texto antes de copiar.
              </p>
            </div>
          )}

        </div>

        {/* Formulário/Ação */}
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
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {!compiledText ? (
              'Escolha um template'
            ) : copied ? (
              <><Check className="w-4 h-4" /> Redirecionando...</>
            ) : (
               <><Copy className="w-4 h-4" /> {channel === 'LINKEDIN' ? 'Copiar & Abrir LinkedIn' : 'Copiar & Abrir E-mail'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
