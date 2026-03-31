'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Zap, 
  Mail, 
  Target, 
  ArrowUpRight, 
  Plus, 
  ArrowRight,
  Loader2,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useAutomationSocket } from '@/hooks/useAutomationSocket';

export default function DashboardHome() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutomating, setIsAutomating] = useState(false);
  const { lastUpdate } = useAutomationSocket();

  useEffect(() => {
    if (lastUpdate) {
      // Refresh metrics on any update to see bars moving
      fetchMetrics();
    }
  }, [lastUpdate]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`http://localhost:3000/metrics/summary`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
            <LayoutDashboard className="w-10 h-10 text-indigo-600" />
            Analytics Hub
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Visão geral do desempenho da sua rede de automação.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/import"
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-[20px] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
          >
            <Plus className="w-5 h-5" />
            Novo Lote
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics?.cards.map((card: any, idx: number) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                {idx === 0 ? <Users className="w-6 h-6" /> : 
                 idx === 1 ? <Target className="w-6 h-6" /> : 
                 idx === 2 ? <Zap className="w-6 h-6" /> : 
                 <AlertCircle className="w-6 h-6" />}
              </div>
              <span className="flex items-center text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                12%
              </span>
            </div>
            <div className="mt-6">
              <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest">{card.title}</h4>
              <p className="text-4xl font-black text-slate-900 mt-2">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Charts & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions / Funnel */}
        <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-200 shadow-sm p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Fluxo de Conversão</h3>
            <Link href="/dashboard/leads" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
              Ver todos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-6">
          <div className="space-y-8">
            {metrics?.funnel?.map((step: any, idx: number) => {
              const maxValue = Math.max(...metrics.funnel.map((f: any) => f.value), 1);
              const percentage = (step.value / maxValue) * 100;
              
              return (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                      <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">{step.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      {step.value} <span className="text-[10px] text-slate-400 font-medium ml-1">leads</span>
                    </span>
                  </div>
                  <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50 p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                    />
                  </div>
                </div>
              );
            })}
            {(!metrics?.funnel || metrics.funnel.length === 0) && (
              <div className="h-64 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-3">
                <LayoutDashboard className="w-8 h-8 opacity-20" />
                <p className="text-sm font-medium italic">Nenhum dado de conversão disponível no momento.</p>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Channels Activity */}
        <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl shadow-slate-200">
          <h3 className="text-xl font-bold mb-8">Atividade dos Canais</h3>
          <div className="space-y-6">
            <div className="group">
              <div className="flex items-center justify-between mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  LinkedIn
                </span>
                <span>80%</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  E-mail
                </span>
                <span>45%</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/5 rounded-[32px] border border-white/10">
            <h4 className="font-bold text-sm mb-4">Meta de Prospecção</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Sua meta de 50 contatos/dia está ativa. Utilize a tabela de leads para realizar as abordagens manuais assistidas.
            </p>
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Dica de Performance</p>
              <p className="text-xs text-slate-300 mt-1 italic">
                "Focar em personalização no LinkedIn aumenta sua taxa de aceite em até 40%."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCircle(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12" y1="16" y2="16"/></svg>
}

function LinkedinIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
}
