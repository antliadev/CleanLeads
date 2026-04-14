'use client';

import { LinkedinIcon } from '@/components/icons/Linkedin';
import { Mail, MessageCircle } from 'lucide-react';

interface StagePanelProps {
  stages: {
    order: number;
    count: number;
    channel: string;
    delayDays: number;
  }[];
  totalActive: number;
  selectedStage?: number | null;
  onStageClick?: (stageOrder: number) => void;
}

const CHANNEL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LINKEDIN: LinkedinIcon,
  EMAIL: Mail,
  WHATSAPP: MessageCircle,
};

const CHANNEL_COLORS: Record<string, string> = {
  LINKEDIN: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
  EMAIL: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400',
  WHATSAPP: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
};

export function AgendaStagePanel({ stages, totalActive, selectedStage, onStageClick }: StagePanelProps) {
  if (stages.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Pipeline de Estágios</h3>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {totalActive} leads ativos
        </span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {stages.map((stage) => {
          const IconComponent = CHANNEL_ICONS[stage.channel] || Mail;
          const colorClass = CHANNEL_COLORS[stage.channel] || 'bg-slate-50 text-slate-600';
          const isSelected = selectedStage === stage.order;
          
          return (
            <button
              key={stage.order}
              onClick={() => onStageClick?.(stage.order)}
              className={`
                flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border min-w-[100px] transition-all
                ${isSelected 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-500 shadow-lg shadow-indigo-500/20' 
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md cursor-pointer'
                }
              `}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Estágio {stage.order}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{stage.count}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400">
                  {stage.delayDays === 0 ? 'Imediato' : `${stage.delayDays}d`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}