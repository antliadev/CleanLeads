'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  BadgeCheck,
  ChevronRight,
  UserCheck,
  Clock,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLinkedinProfileUrl, getGmailComposeUrl } from '@/utils/url-helpers';

interface InteractionAssistedModalProps {
  lead: any;
  isOpen: boolean;
  initialChannel?: 'LINKEDIN' | 'EMAIL' | null;
  onClose: () => void;
  onUpdateStatus: (leadId: string, newStatus: string) => Promise<void>;
}

export function InteractionAssistedModal({ 
  lead, 
  isOpen, 
  initialChannel = null,
  onClose, 
  onUpdateStatus 
}: InteractionAssistedModalProps) {
  const [step, setStep] = useState<'CHOICE' | 'TEMPLATE_SELECTION' | 'ACTION' | 'OUTCOME'>('CHOICE');
  const [channel, setChannel] = useState<'LINKEDIN' | 'EMAIL' | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Buscar templates ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      fetch(`http://localhost:3000/templates`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => res.json())
      .then(data => setTemplates(Array.isArray(data) ? data : []))
      .catch(err => console.error('Erro ao buscar templates:', err));
    }
  }, [isOpen]);

  // Efeito para disparar a ação inicial se o usuário clicou no ícone direto na tabela
  React.useEffect(() => {
    if (isOpen && initialChannel) {
      setChannel(initialChannel);
      setStep('TEMPLATE_SELECTION');
    } else if (isOpen) {
      setStep('CHOICE');
      setChannel(null);
      setSelectedTemplate(null);
    }
  }, [isOpen, initialChannel]);

  if (!isOpen || !lead) return null;

  const replaceVariables = (text: string) => {
    if (!text) return '';
    return text
      .replace(/{{firstName}}/gi, lead.firstName || 'parceiro')
      .replace(/{{fullName}}/gi, lead.fullName || '')
      .replace(/{{company}}/gi, lead.company || '');
  };

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    const processedBody = replaceVariables(template.bodyTemplate);
    const processedSubject = replaceVariables(template.subjectTemplate || '');

    if (channel === 'LINKEDIN') {
      // Copiar para o clipboard no LinkedIn
      navigator.clipboard.writeText(processedBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      
      const url = getLinkedinProfileUrl(lead.linkedinOriginal, lead.fullName);
      if (url) window.open(url, '_blank');
    } else {
      // E-mail dinâmico
      const url = getGmailComposeUrl(lead.emailNormalized, lead.fullName, processedSubject, processedBody);
      if (url) window.open(url, '_blank');
    }

    setStep('ACTION');
  };

  const handleStatusUpdate = async (status: string) => {
    setIsProcessing(true);
    try {
      await onUpdateStatus(lead.id, status);
      setStep('OUTCOME');
      setTimeout(() => {
        onClose();
        setStep('CHOICE');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredTemplates = templates.filter(t => t.channel === channel);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-slate-200"
        >
          {/* Header */}
          <div className="bg-slate-950 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight uppercase">Assistente de Abordagem</h3>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Fluxo Manual Otimizado</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            {step === 'CHOICE' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-black text-slate-900 uppercase">Qual o Canal?</h4>
                  <p className="text-sm text-slate-500 font-medium">Escolha como deseja abordar o lead agora.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { setChannel('LINKEDIN'); setStep('TEMPLATE_SELECTION'); }}
                    className="group p-8 rounded-[32px] border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/30 transition-all flex flex-col items-center gap-4 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </div>
                    <span className="font-black text-slate-900 group-hover:text-blue-700 uppercase text-xs tracking-widest">LinkedIn</span>
                  </button>

                  <button 
                    onClick={() => { setChannel('EMAIL'); setStep('TEMPLATE_SELECTION'); }}
                    className="group p-8 rounded-[32px] border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all flex flex-col items-center gap-4 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      <Mail className="w-8 h-8" />
                    </div>
                    <span className="font-black text-slate-900 group-hover:text-indigo-700 uppercase text-xs tracking-widest">E-mail</span>
                  </button>
                </div>
              </div>
            )}

            {step === 'TEMPLATE_SELECTION' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-black text-slate-900 uppercase">Selecione o Modelo</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Canal: {channel}</p>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map(t => (
                      <button 
                        key={t.id}
                        onClick={() => handleSelectTemplate(t)}
                        className="w-full text-left p-5 rounded-[24px] border border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-black text-slate-700 uppercase truncate">{t.name}</span>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-all" />
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 italic">"{replaceVariables(t.bodyTemplate)}"</p>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-sm text-slate-400 italic">Nenhum template encontrado para este canal.</p>
                      <button 
                        onClick={() => handleSelectTemplate({ bodyTemplate: channel === 'LINKEDIN' ? 'Olá {{firstName}}!' : '', name: 'Manual' })}
                        className="mt-4 text-xs font-black text-indigo-600 uppercase underline"
                      >
                        Continuar sem template
                      </button>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => setStep('CHOICE')}
                  className="w-full py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
                >
                  Voltar
                </button>
              </div>
            )}

            {step === 'ACTION' && (
              <div className="space-y-8">
                {channel === 'LINKEDIN' && (
                  <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[32px] mb-6 flex items-start gap-4 animate-pulse">
                    <div className="p-3 bg-blue-600 text-white rounded-2xl">
                      <Copy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900">Texto Copiado!</p>
                      <p className="text-[11px] text-blue-700 mt-1 leading-relaxed">
                        O template foi processado e copiado para sua área de transferência. **Cole na mensagem do LinkedIn.**
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 font-bold shadow-sm">
                    {lead.fullName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{lead.fullName}</h4>
                    <p className="text-xs text-slate-500 uppercase font-black">{lead.company}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Ação concluída! Qual o próximo status?</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => handleStatusUpdate('AGUARDANDO_CONTATO')}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
                    >
                      <span className="text-sm font-bold text-slate-700">Aguardando Conexão</span>
                      <Clock className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate('AGUARDANDO_RESPOSTA')}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:bg-blue-50 hover:border-blue-200 transition-all group"
                    >
                      <span className="text-sm font-bold text-slate-700">Enviei e aguardo retorno</span>
                      <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate('EM_CONTATO')}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 transition-all group"
                    >
                      <span className="text-sm font-bold text-slate-700">Já estou em conversa</span>
                      <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'OUTCOME' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-xl shadow-emerald-50 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 uppercase">Atividade Registrada!</h4>
                <p className="text-sm text-slate-500">Seu dashboard já reflete as mudanças.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
