'use client';

import React from 'react';
import { 
  History, 
  MessageSquare, 
  UserPlus, 
  Mail, 
  Linkedin, 
  BadgeCheck, 
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, any> = {
  LINKEDIN_INVITE: <UserPlus className="w-4 h-4" />,
  LINKEDIN_MESSAGE: <MessageSquare className="w-4 h-4" />,
  EMAIL_INITIAL: <Mail className="w-4 h-4" />,
  STATUS_CHANGE: <Clock className="w-4 h-4" />,
  AUDIT: <BadgeCheck className="w-4 h-4" />,
  ERROR: <AlertCircle className="w-4 h-4" />,
};

export function LeadTimeline({ interactions, statusHistory }: { interactions: any[], statusHistory: any[] }) {
  const allEvents = [
    ...interactions.map(i => ({ ...i, type: 'INTERACTION', date: new Date(i.sentAt || i.scheduledAt).getTime() })),
    ...statusHistory.map(sh => ({ ...sh, type: 'STATUS', date: new Date(sh.createdAt).getTime() })),
  ].sort((a, b) => b.date - a.date);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
          <History className="w-5 h-5 text-indigo-600" />
          Timeline de Atividades
        </h3>
        <span className="text-xs text-slate-400 font-bold uppercase">{allEvents.length} Eventos</span>
      </div>

      <div className="relative pl-6 space-y-12 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {allEvents.length === 0 ? (
          <p className="text-sm text-slate-400 italic">Nenhuma atividade registrada ainda.</p>
        ) : allEvents.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline ball */}
            <div className={`absolute -left-[24.5px] top-1.5 w-4 h-4 rounded-full border-4 bg-white z-10 ${
              event.type === 'STATUS' ? 'border-indigo-600' : 'border-slate-300'
            }`} />

            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    event.channel === 'LINKEDIN' ? 'bg-blue-50 text-blue-600' : 
                    event.channel === 'EMAIL' ? 'bg-indigo-50 text-indigo-600' : 
                    'bg-slate-50 text-slate-600'
                  }`}>
                    {ICON_MAP[event.actionType] || <History className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {event.type === 'STATUS' ? `Status alterado para ${event.newStatus}` : event.actionType}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {new Date(event.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
                {event.messageId && (
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg border border-slate-200 font-mono">
                    ID: {event.messageId.slice(0, 8)}
                  </span>
                )}
              </div>

              {event.messageBodySnapshot && (
                <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 border border-slate-100 leading-relaxed italic">
                  "{event.messageBodySnapshot.slice(0, 150)}{event.messageBodySnapshot.length > 150 ? '...' : ''}"
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md">RESULTADO: {event.result || 'OK'}</span>
                  {event.type === 'STATUS' && <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">POR: {event.changeOrigin || 'SISTEMA'}</span>}
                </div>
                <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  Detalhes
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
