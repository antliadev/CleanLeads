'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Info,
  MessageSquare,
  BadgeCheck,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssistedAutomationModalProps {
  lead: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (interactionType: string) => void;
}

export function AssistedAutomationModal({ 
  lead, 
  isOpen, 
  onClose, 
  onConfirm 
}: AssistedAutomationModalProps) {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !lead) return null;

  const defaultMessage = `Olá ${lead.firstName}, vi seu perfil na ${lead.company} e fiquei impressionado com seu trabalho. Gostaria de conectar!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenProfile = () => {
    if (lead.linkedinNormalized) {
      window.open(lead.linkedinNormalized, '_blank');
    }
  };

  const handleFinish = async () => {
    setIsProcessing(true);
    try {
      await onConfirm('LINKEDIN_MESSAGE');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden border border-slate-200"
        >
          {/* Header */}
          <div className="bg-slate-950 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Abordagem LinkedIn</h3>
                <p className="text-xs text-slate-400">Fluxo Assistido v1.0</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Step 1: Lead Info */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xl uppercase">
                  {lead.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{lead.fullName}</h4>
                  <p className="text-sm text-slate-500">{lead.company}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                <p className="text-xs font-bold text-emerald-600 uppercase">Apto para contato</p>
              </div>
            </div>

            {/* Step 2: Open Profile */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs">1</div>
                Abra o perfil no LinkedIn
              </div>
              <button 
                onClick={handleOpenProfile}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-slate-100 hover:border-blue-500/30 hover:bg-blue-50/20 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Ver perfil de {lead.firstName}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 translate-x-0 group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            {/* Step 3: Copy Message */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs">2</div>
                Copie a mensagem personalizada
              </div>
              <div className="relative">
                <textarea 
                  readOnly 
                  value={defaultMessage}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 h-32 resize-none focus:outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className={`absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    copied 
                      ? 'bg-emerald-500 text-white shadow-emerald-200' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {copied ? <BadgeCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Mensagem'}
                </button>
              </div>
            </div>

            {/* Step 4: Confirm Action */}
            <div className="pt-2">
              <button 
                onClick={handleFinish}
                disabled={isProcessing}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? 'Gravando...' : 'Confirmar que enviei no LinkedIn'}
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-4 flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                Ao confirmar, o status do lead será atualizado para "Aguardando Resposta".
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ChevronRight(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
}
