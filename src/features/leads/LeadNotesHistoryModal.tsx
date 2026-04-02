'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, MessageSquare, Loader2, User, Clock, Plus } from 'lucide-react';
import { getLeadNotes, updateLeadStatus, addLeadNote } from '@/actions/leads';
import { formatDateTime, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useOperator } from '@/components/providers/OperatorProvider';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
  operator?: {
    name: string;
  } | null;
}

interface LeadNotesHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
}

export function LeadNotesHistoryModal({
  isOpen,
  onClose,
  leadId,
  leadName,
}: LeadNotesHistoryModalProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newNote, setNewNote] = useState('');
  const { activeOperator } = useOperator();

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getLeadNotes(leadId);
      if (result.success && result.notes) {
        setNotes(result.notes as any);
      }
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    if (isOpen && leadId) {
      fetchNotes();
      setNewNote('');
    }
  }, [isOpen, leadId, fetchNotes]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !activeOperator) return;

    setIsSubmitting(true);
    try {
      const result = await addLeadNote(leadId, activeOperator.id, newNote.trim());
      
      if (result.success) {
        setNewNote('');
        fetchNotes();
      }
    } catch (error) {
      console.error('Erro ao adicionar nota:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Histórico de Notas</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Timeline de interações com <span className="font-semibold text-slate-700 dark:text-slate-300">{leadName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="text-sm font-medium">Carregando histórico...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm font-medium">Nenhuma nota registrada ainda.</p>
            </div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800 transition-colors">
              {notes.map((note) => {
                const isSystem = note.content.startsWith('[SISTEMA]');
                const displayContent = isSystem ? note.content.replace('[SISTEMA]', '').trim() : note.content;

                return (
                  <div key={note.id} className="relative pl-12 group">
                    {/* Dot */}
                    <div className={cn(
                      "absolute left-3.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 z-10 transition-colors",
                      isSystem ? "bg-slate-300 dark:bg-slate-600" : "bg-indigo-500"
                    )} />
                    
                    <div className={cn(
                      "p-4 rounded-2xl border transition-all",
                      isSystem 
                        ? "bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50" 
                        : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm"
                    )}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          <User className="w-3 h-3" />
                          <span>{note.operator?.name || 'Sistema'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatDateTime(note.createdAt)}</span>
                        </div>
                      </div>
                      <p className={cn(
                        "text-sm leading-relaxed",
                        isSystem ? "text-slate-500 dark:text-slate-400 italic" : "text-slate-700 dark:text-slate-200"
                      )}>
                        {displayContent}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Add Note */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors">
          <form onSubmit={handleAddNote} className="relative">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Adicionar rápida anotação..."
              rows={2}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-4 pr-12 py-3 outline-none focus:border-indigo-500 text-sm text-slate-700 dark:text-slate-200 transition-colors resize-none"
              disabled={isSubmitting || isLoading}
            />
            <button
              type="submit"
              disabled={!newNote.trim() || isSubmitting || isLoading || !activeOperator}
              className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
              title="Salvar nota"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </button>
          </form>
          {!activeOperator && (
            <p className="text-[10px] text-rose-500 mt-1 ml-1 font-medium italic">
              Selecione um operador para adicionar notas.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
