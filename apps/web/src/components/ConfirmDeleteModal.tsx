'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description,
  isLoading = false 
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
        >
          {/* Header/Banner de Alerta */}
          <div className="bg-rose-50 p-8 flex flex-col items-center text-center">
            <div className="bg-rose-100 p-4 rounded-3xl mb-4">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          </div>

          {/* Conteúdo */}
          <div className="p-8 text-center">
            <p className="text-slate-500 font-medium leading-relaxed">
              {description}
            </p>
            <p className="mt-4 text-xs font-black text-rose-500 uppercase tracking-widest">
              Esta ação não pode ser desfeita.
            </p>
          </div>

          {/* Ações */}
          <div className="p-8 pt-0 flex flex-col gap-3">
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-rose-600 text-white py-4 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-rose-700 transition-all shadow-xl shadow-rose-100 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
              {isLoading ? 'Excluindo...' : 'Confirmar Exclusão'}
            </button>
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
