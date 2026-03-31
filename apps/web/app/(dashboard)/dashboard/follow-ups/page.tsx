'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Clock, 
  Zap,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function LinkedinIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
}

function ArrowRight(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}

export default function FollowUpsPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalLeads: 0, pendingResponse: 0, readyToContact: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [tasksRes, statsRes] = await Promise.all([
        fetch('http://localhost:3000/follow-ups/tasks', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:3000/follow-ups/stats', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const tasksData = await tasksRes.json();
      const statsData = await statsRes.json();

      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setStats(statsData);
    } catch (err) {
      console.error('Erro ao buscar follow-ups:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
            <MessageSquare className="w-10 h-10 text-indigo-600" />
            Painel de Atividades
          </h1>
          <p className="text-slate-500 mt-2 text-lg italic">Gerencie sua cadência e não perca nenhum lead no pipeline.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status da Automação</span>
             <span className="text-sm font-bold text-emerald-500 flex items-center gap-1">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Operacional
             </span>
          </div>
          <button 
            onClick={fetchData}
            className="p-4 bg-white border border-slate-200 rounded-[20px] shadow-sm hover:bg-slate-50 transition-all"
          >
            <Clock className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"
        >
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Prontos p/ Contato</p>
          <h3 className="text-3xl font-extrabold text-slate-900">{stats.readyToContact}</h3>
          <div className="mt-4 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500" style={{ width: '45%' }} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"
        >
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Aguardando Resposta</p>
          <h3 className="text-3xl font-extrabold text-slate-900">{stats.pendingResponse}</h3>
          <div className="mt-4 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500" style={{ width: '70%' }} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-indigo-600 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-100"
        >
          <p className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-1">Taxa de Conversão</p>
          <h3 className="text-3xl font-extrabold">12.4%</h3>
          <p className="text-[10px] mt-4 font-bold opacity-80">+2.1% em relação ao mês anterior</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Tarefas Prioritárias
            <span className="text-sm font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500">{tasks.length}</span>
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
               <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200 p-20 text-center">
               <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
               <h4 className="text-lg font-bold text-slate-700">Tudo em dia!</h4>
               <p className="text-slate-500 mt-1">Você não tem tarefas de acompanhamento pendentes no momento.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {tasks.map((task, idx) => (
                  <motion.div 
                    key={task.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white border border-slate-200 rounded-[32px] p-6 hover:shadow-lg hover:shadow-slate-100 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                           {task.linkedinNormalized ? <LinkedinIcon className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                        </div>
                        <div>
                          <Link href={`/dashboard/leads/${task.id}`}>
                            <h4 className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer">{task.fullName}</h4>
                          </Link>
                          <p className="text-xs text-slate-500">{task.company} • {task.generalStatus.replace(/_/g, ' ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <Link href={`/dashboard/leads/${task.id}`}>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                              Retomar <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                         </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-10 rounded-[48px] text-white relative overflow-hidden group">
              <Zap className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-all duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Automação Inteligente</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                  Ative o fluxo automático para que o sistema execute as interações nos dias corretos seguindo seus templates.
                </p>
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/40 transition-all">
                  <Zap className="w-4 h-4 fill-white" /> Ativar Cadência
                </button>
              </div>
           </div>

           <div className="p-10 bg-slate-50 rounded-[48px] border border-slate-100 border-dashed">
              <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-600" /> Dicas SDR
              </h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="flex gap-2"><span>•</span> <span>Contatos no Dia 0 aumentam a resposta em 65%.</span></li>
                <li className="flex gap-2"><span>•</span> <span>Personalize o primeiro parágrafo mesmo usando templates.</span></li>
                <li className="flex gap-2"><span>•</span> <span>Leads parados há mais de 7 dias perdem 20% do interesse.</span></li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
