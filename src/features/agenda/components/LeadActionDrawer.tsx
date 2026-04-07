'use client';

import { 
  X, 
  Lock,
  UserCheck,
  ArrowRight, 
  Mail, 
  MessageCircle, 
  Send, 
  ChevronRight, 
  Pause, 
  Play,
  XCircle,
  Copy,
  ExternalLink,
  Check,
  ChevronDown,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getLinkedinProfileUrl, getGmailComposeUrl, getWhatsAppUrl } from '@/lib/utils';
import { interpolateTemplate } from '@/lib/templates';
import { useState, useEffect } from 'react';
import { LinkedinIcon } from '@/components/icons/Linkedin';
import { useOperator } from '@/components/providers/OperatorProvider';
import { advanceCadenceStage, pauseLeadCadence, resumeLeadCadence, lockLead, unlockLead } from '@/actions/cadence';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leadProgress: any | null;
  templates: any[];
}

export function LeadActionDrawer({ isOpen, onClose, leadProgress, templates }: LeadActionDrawerProps) {
  const [activeTab, setActiveTab] = useState<'ACTION' | 'NOTES' | 'HISTORY'>('ACTION');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const { activeOperator } = useOperator();

  // Trava o lead ao abrir para evitar conflitos (Smart Locking)
  useEffect(() => {
    if (isOpen && leadProgress?.id && activeOperator) {
      lockLead(leadProgress.id, activeOperator.name);
    }
  }, [isOpen, leadProgress?.id, activeOperator]);

  const currentStage = leadProgress?.currentStage;
  const filteredTemplates = (templates || []).filter(t => t.channel === currentStage?.channel && t.isActive);

  // Inicializa o template do estágio se houver
  useEffect(() => {
    if (isOpen && currentStage?.templateId) {
      setSelectedTemplateId(currentStage.templateId);
    } else if (isOpen && filteredTemplates.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(filteredTemplates[0].id);
    }
  }, [isOpen, currentStage, filteredTemplates, selectedTemplateId]);

  if (!isOpen || !leadProgress) return null;

  // Verifica se está travado por outro (menos de 5 minutos atrás)
  const isLockedByOthers = 
    leadProgress.lockedAt && 
    leadProgress.lockedBy !== activeOperator?.name &&
    (new Date().getTime() - new Date(leadProgress.lockedAt).getTime()) < 5 * 60 * 1000;

  const nextStage = leadProgress.cadence.stages.find((s: any) => s.order === leadProgress.currentStageOrder + 1);

  // Função para processar variáveis no corpo do template (Robusta e Multi-idioma via central lib)
  const processTemplate = (body: string) => {
    return interpolateTemplate(body, leadProgress.lead);
  };

  const selectedTemplate = filteredTemplates.find(t => t.id === selectedTemplateId);

  const handleExecute = async (result: 'SENT' | 'REPLIED' | 'FAILED') => {
    if (!activeOperator) {
      toast.error('Selecione um operador antes de executar.');
      return;
    }

    setIsSubmitting(true);
    try {
      await advanceCadenceStage({
        progressId: leadProgress.id,
        version: leadProgress.version,
        operatorId: activeOperator.id,
        notes,
        result
      });
      toast.success('Ação registrada com sucesso!');
      onClose();
    } catch (error: any) {
      if (error.message.includes('CONCURRENCY_ERROR')) {
        toast.error('Este lead já foi atualizado por outro operador.');
      } else {
        toast.error('Erro ao processar ação.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex justify-end">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl h-full flex flex-col border-l border-slate-200 dark:border-slate-800 transition-colors"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex items-center justify-between mb-4">
              <button onClick={onClose} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ativo - Estágio {leadProgress.currentStageOrder}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">{leadProgress.lead.fullName}</h2>
                 <div className="flex gap-2">
                    {leadProgress.lead.linkedinUrl && (
                      <a href={leadProgress.lead.linkedinUrl} target="_blank" className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100">
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                 </div>
              </div>
              <p className="text-slate-500 font-medium">{leadProgress.lead.company || 'Sem empresa'} | {leadProgress.lead.jobTitle || 'Sem cargo'}</p>
            </div>

            {/* Banner de Travamento Concorrente */}
            {isLockedByOthers && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-start gap-3"
              >
                <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-xl">
                  <Lock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-amber-900 dark:text-amber-200">Lead sendo operado</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    {leadProgress.lockedBy} abriu este lead {formatDistanceToNow(new Date(leadProgress.lockedAt!), { addSuffix: true, locale: ptBR })}.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 px-8">
            {['ACTION', 'NOTES', 'HISTORY'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "py-4 px-4 text-xs font-black uppercase tracking-widest relative transition-all",
                  activeTab === tab ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab === 'ACTION' ? 'Execução' : tab === 'NOTES' ? 'Notas' : 'Histórico'}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {activeTab === 'ACTION' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                
                {/* Canal de Ação */}
                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-indigo-100 dark:border-indigo-900/30 p-8 rounded-[2.5rem] relative overflow-hidden group/stage">
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">{leadProgress.currentStageOrder}</div>
                      <h4 className="font-black text-indigo-900 dark:text-indigo-100">Tarefa para Agora</h4>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-black text-indigo-950 dark:text-indigo-50">
                        {currentStage?.channel === 'LINKEDIN' ? 'Abordagem via LinkedIn' : currentStage?.channel === 'EMAIL' ? 'Envio de E-mail' : 'Contato WhatsApp'}
                      </h3>
                      <p className="text-indigo-700/60 dark:text-indigo-300/60 font-medium">Ação prioritária da cadência {leadProgress.cadence.name}.</p>
                    </div>

                    <div className="space-y-3 pt-2">
                       <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest pl-1">Modelo de Abordagem</label>
                          <div className="relative">
                            <select 
                              value={selectedTemplateId || ''} 
                              onChange={(e) => setSelectedTemplateId(e.target.value)}
                              className="w-full appearance-none bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
                            >
                              {filteredTemplates.length === 0 && <option value="">Nenhum template para este canal</option>}
                              {filteredTemplates.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
                          </div>
                       </div>

                       <button 
                         onClick={() => {
                           if (!selectedTemplate) return toast.error('Selecione um template primeiro');
                           const processed = processTemplate(selectedTemplate.body);
                           navigator.clipboard.writeText(processed);
                           toast.success('Template personalizado copiado!');
                           
                           // Redirecionamento Baseado no Canal
                           const lead = leadProgress.lead;
                           let url: string | null = null;
                           
                           if (currentStage?.channel === 'LINKEDIN') {
                             url = getLinkedinProfileUrl(lead.linkedinUrl);
                           } else if (currentStage?.channel === 'EMAIL') {
                             url = getGmailComposeUrl(lead.email, lead.fullName, selectedTemplate.subject || undefined, processed);
                           } else if (currentStage?.channel === 'WHATSAPP') {
                             url = getWhatsAppUrl(lead.phone, processed);
                           }

                           if (url) {
                             setTimeout(() => {
                               window.open(url!, '_blank');
                             }, 100);
                           }
                         }}
                         className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-2xl text-sm font-black text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-95"
                       >
                          <Copy className="w-4 h-4" /> Copiar & Abrir Canal
                       </button>
                    </div>
                  </div>
                </div>

                {/* Escolha do Resultado */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Qual foi o resultado?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'SENT', label: 'Mensagem Enviada', icon: Send, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
                      { id: 'REPLIED', label: 'Lead Respondeu', icon: Check, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                      { id: 'FAILED', label: 'Não Conseguimos', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50/50' },
                      { 
                        id: leadProgress.status === 'PAUSED' ? 'RESUME' : 'PAUSED', 
                        label: leadProgress.status === 'PAUSED' ? 'Retomar Fluxo' : 'Pausar Cadência', 
                        icon: leadProgress.status === 'PAUSED' ? Play : Pause, 
                        color: 'text-amber-600', 
                        bg: 'bg-amber-50/50' 
                      },
                    ].map((btn) => (
                      <button 
                        key={btn.id}
                        disabled={isSubmitting}
                        onClick={async () => {
                          if (btn.id === 'PAUSED' || btn.id === 'RESUME') {
                            if (!activeOperator) return toast.error('Selecione um operador');
                            setIsSubmitting(true);
                            try {
                              if (btn.id === 'PAUSED') await pauseLeadCadence(leadProgress.id, activeOperator.id);
                              else await resumeLeadCadence(leadProgress.id, activeOperator.id);
                              toast.success(btn.id === 'PAUSED' ? 'Cadência pausada.' : 'Cadência retomada.');
                              onClose();
                            } catch (e: any) {
                              toast.error('Erro ao alterar status da cadência.');
                            } finally {
                              setIsSubmitting(false);
                            }
                          } else {
                            handleExecute(btn.id as any);
                          }
                        }}
                        className={cn(
                          "flex flex-col items-center gap-3 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all text-center",
                          "hover:bg-slate-50 dark:hover:bg-slate-950 group relative disabled:opacity-50"
                        )}
                      >
                        <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", btn.bg, btn.color)}>
                          <btn.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notas */}
                <div className="space-y-4">
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Anotação da Operação</h4>
                   <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl outline-none focus:border-indigo-500 transition-all text-sm font-medium"
                    placeholder="Registrar algum feedback importante..."
                   />
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Próxima Sugestão</span>
                <span className="text-xs font-bold text-indigo-600">{nextStage ? `Estágio ${nextStage.order} em ${nextStage.delayDays} dias` : 'Fim da Linha'}</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={onClose} className="px-6 py-4 rounded-3xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Fechar</button>
                <button 
                  disabled={isSubmitting}
                  onClick={() => handleExecute('SENT')}
                  className="px-6 py-4 rounded-3xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 group/btn disabled:opacity-50"
                >
                  {isSubmitting ? 'Salvando...' : 'Confirmar Envio'}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
