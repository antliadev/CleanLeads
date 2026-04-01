'use client';

import { useState, useEffect } from 'react';
import { X, Copy, ExternalLink, Check, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { Template, TemplateChannel } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { parseTemplate } from '@/lib/template-parser';
import { LinkedinIcon } from '@/components/icons/Linkedin';
import { getGmailComposeUrl, getWhatsAppUrl, cn } from '@/lib/utils';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { updateLeadStatus } from '@/actions/leads';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [compiledSubject, setCompiledSubject] = useState('');
  const [compiledText, setCompiledText] = useState('');
  const [copied, setCopied] = useState(false);
  type ModalView = 'PREPARATION' | 'WAITING' | 'FOLLOWUP';
  const [view, setView] = useState<ModalView>('PREPARATION');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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
    setView('PREPARATION');
    setIsUpdatingStatus(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, channel]);

  // Listener para capturar o retorno do usuário à aba após abrir link externo
  useEffect(() => {
    if (view !== 'WAITING' || !isOpen) return;

    const handleWindowFocus = () => {
      // Quando o usuário volta o foco para a janela, assume que terminou o contato
      setTimeout(() => {
        setView('FOLLOWUP');
      }, 500);
    };

    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, [view, isOpen]);

  // Quando muda o template selecionado, recompila o texto substituindo as variáveis
  useEffect(() => {
    if (!lead) {
      setCompiledText('');
      return;
    }
    const template = activeTemplates.find((t) => t.id === selectedTemplateId);
    if (template) {
      setCompiledSubject(parseTemplate(template.subject || '', lead));
      setCompiledText(parseTemplate(template.body, lead));
    } else {
      setCompiledSubject('');
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
      if (lead.linkedinUrl) {
        const url = lead.linkedinUrl.startsWith('http')
          ? lead.linkedinUrl
          : `https://${lead.linkedinUrl}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else if (channel === 'EMAIL' && lead.email) {
      const gmailUrl = getGmailComposeUrl(
        lead.email,
        lead.fullName,
        compiledSubject || undefined,
        compiledText || undefined
      );
      if (gmailUrl) {
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      }
    } else if (channel === 'WHATSAPP' && lead.phone) {
      const whatsappUrl = getWhatsAppUrl(lead.phone, compiledText);
      if (whatsappUrl) {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    }

    // Ativa o modo de espera pelo retorno do usuário
    setView('WAITING');
  };

  const handleStatusUpdate = async (status: any) => {
    setIsUpdatingStatus(true);
    try {
      await updateLeadStatus(lead.id, status);
      onClose();
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const isLinkedIn = channel === 'LINKEDIN';
  const isWhatsApp = channel === 'WHATSAPP';
  const isEmail = channel === 'EMAIL';

  const channelLabel = isLinkedIn ? 'LinkedIn' : isWhatsApp ? 'WhatsApp' : 'E-mail';
  const ChannelIcon = isLinkedIn ? LinkedinIcon : isWhatsApp ? MessageCircle : Mail;
  const iconColor = isLinkedIn ? 'text-blue-600' : isWhatsApp ? 'text-emerald-600' : 'text-indigo-600';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
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
              <ChannelIcon className={`w-5 h-5 ${iconColor}`} />
              {view === 'WAITING' ? 'Aguardando retorno...' : view === 'FOLLOWUP' ? 'Resultado do Contato' : `Contato via ${channelLabel}`}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {view === 'WAITING' 
                ? `Estamos aguardando você completar o contato com ${lead.fullName.split(' ')[0]}`
                : view === 'FOLLOWUP'
                  ? `Registrar o resultado para ${lead.fullName}`
                  : <>Preparando mensagem para <strong className="text-slate-700">{lead.fullName}</strong></>
              }
            </p>
          </div>
          {view === 'PREPARATION' && (
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {view === 'WAITING' ? (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-12 flex flex-col items-center text-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-25" />
                <div className={`p-6 rounded-full bg-indigo-100 ${iconColor} relative`}>
                  <ChannelIcon className="w-12 h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">Contato aberto!</h3>
                <p className="text-slate-500 max-w-sm">
                  Complete o envio na nova guia. Ao voltar para cá, registraremos o resultado.
                </p>
              </div>
              <button 
                onClick={() => setView('FOLLOWUP')}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
              >
                Voltei agora, atualizar status
              </button>
            </motion.div>
          ) : view === 'FOLLOWUP' ? (
            <motion.div
              key="followup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8 space-y-8"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Como foi o contato?</h3>
                <p className="text-slate-500">Selecione o novo status para <strong>{lead.fullName}</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(LEAD_STATUS_MAP)
                  .filter(([key]) => ['AGUARDANDO_RETORNO', 'CONTATADO', 'EM_NEGOCIACAO', 'PERDIDO', 'VITORIA'].includes(key))
                  .map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <button
                        key={key}
                        disabled={isUpdatingStatus}
                        onClick={() => handleStatusUpdate(key)}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all group",
                          "hover:border-indigo-500 hover:bg-indigo-50 active:scale-95 disabled:opacity-50",
                          config.color.includes('border-') ? config.color.split(' ').find(c => c.startsWith('border-')) : 'border-slate-100'
                        )}
                      >
                        <div className={cn("p-4 rounded-2xl mb-3 transition-colors", config.color.split(' ')[0])}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-slate-700">{config.label}</span>
                      </button>
                    );
                  })}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={onClose}
                  className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Pular esta etapa
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
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
                        Selecione um template de {channelLabel}
                      </option>
                      {activeTemplates.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-sm">
                      Nenhum template ativo encontrado para {channelLabel}. Crie um na guia Templates.
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
                      <strong>{lead.fullName}</strong>. Você pode editar o texto antes de copiar.
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
                  disabled={!compiledText || isUpdatingStatus}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-indigo-200"
                >
                  {isUpdatingStatus ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : !compiledText ? (
                    'Escolha um template'
                  ) : copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {isLinkedIn 
                        ? 'Copiar & Abrir LinkedIn' 
                        : isWhatsApp 
                          ? 'Copiar & Abrir WhatsApp' 
                          : 'Copiar & Abrir Gmail'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
