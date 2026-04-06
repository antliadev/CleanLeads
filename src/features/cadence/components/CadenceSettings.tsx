'use client';

import { useState, useTransition } from 'react';
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Clock, 
  MessageSquare, 
  ChevronUp, 
  ChevronDown,
  Save,
  Loader2,
  Info
} from 'lucide-react';
import { updateCadenceSettings } from '@/actions/cadence';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Stage {
  id?: string;
  order: number;
  channel: 'LINKEDIN' | 'EMAIL' | 'WHATSAPP';
  delayDays: number;
  templateId?: string | null;
}

interface Template {
  id: string;
  name: string;
  channel: string;
}

interface CadenceSettingsProps {
  cadenceId: string;
  initialStages: Stage[];
  templates: Template[];
}

export function CadenceSettings({ cadenceId, initialStages, templates }: CadenceSettingsProps) {
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddStage = () => {
    const newStage: Stage = {
      order: stages.length + 1,
      channel: 'LINKEDIN',
      delayDays: 1,
      templateId: null,
    };
    setStages([...stages, newStage]);
  };

  const handleRemoveStage = (index: number) => {
    const newStages = stages.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 }));
    setStages(newStages);
  };

  const handleUpdateStage = (index: number, updates: Partial<Stage>) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], ...updates };
    setStages(newStages);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === stages.length - 1) return;

    const newStages = [...stages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newStages[index], newStages[targetIndex]] = [newStages[targetIndex], newStages[index]];
    
    // Re-ordenar
    const reordered = newStages.map((s, i) => ({ ...s, order: i + 1 }));
    setStages(reordered);
  };

  const handleSave = async () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const result = await updateCadenceSettings(cadenceId, stages);
        if (result.success) {
          setMessage({ type: 'success', text: 'Configurações de cadência atualizadas com sucesso!' });
        } else {
          setMessage({ type: 'error', text: 'Erro ao salvar configurações.' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Ocorreu um erro inesperado.' });
      }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm transition-all">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Fluxo de Cadência Automática
            <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[10px] uppercase font-black rounded-lg tracking-wider border border-indigo-100 dark:border-indigo-800">
              Configurável
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">Defina a sequência de ações e o tempo de espera entre cada contato.</p>
        </div>
        <button
          onClick={handleAddStage}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Plus className="w-4 h-4" />
          Adicionar Estágio
        </button>
      </div>

      <div className="space-y-3 mb-8">
        <AnimatePresence mode="popLayout">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id || `temp-${index}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-indigo-200 dark:hover:border-indigo-900 transition-all"
            >
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-0 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black text-slate-600 dark:text-slate-400 shadow-sm">
                  {stage.order}
                </div>
                <button 
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === stages.length - 1}
                  className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-0 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Canal</label>
                  <select
                    value={stage.channel}
                    onChange={(e) => handleUpdateStage(index, { channel: e.target.value as any, templateId: null })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="LINKEDIN">LinkedIn</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="EMAIL">E-mail</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Espera (dias)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min="0"
                      value={stage.delayDays}
                      onChange={(e) => handleUpdateStage(index, { delayDays: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Template</label>
                  <select
                    value={stage.templateId || ''}
                    onChange={(e) => handleUpdateStage(index, { templateId: e.target.value || null })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">Sem template</option>
                    {templates
                      .filter(t => t.channel === stage.channel)
                      .map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <button
                onClick={() => handleRemoveStage(index)}
                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                title="Remover estágio"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {stages.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Nenhum estágio configurado.</p>
            <button onClick={handleAddStage} className="text-indigo-600 font-bold text-sm mt-2">Clique para adicionar o primeiro</button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3 max-w-md">
          <div className="mt-0.5 p-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-100 dark:border-amber-800">
            <Info className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">Nota sobre alterações:</strong>
            Ao remover ou reordenar estágios, os leads ativos serão reposicionados automaticamente para manter a integridade do fluxo.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {message && (
            <span className={cn(
              "text-sm font-bold animate-in fade-in slide-in-from-right-2",
              message.type === 'success' ? "text-emerald-600" : "text-red-600"
            )}>
              {message.text}
            </span>
          )}
          
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-2xl text-sm font-black transition-all shadow-xl disabled:opacity-50 min-w-[200px]"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>
    </div>
  );
}
