'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  User,
  Building2,
  Phone,
  Calendar,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Linkedin } from '@/components/icons/Linkedin';
import { motion } from 'framer-motion';
import { LeadTimeline } from '@/features/leads/LeadTimeline';

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeadDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/leads/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setLead(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetail();
  }, [id]);

  if (isLoading) return <div className="p-10 animate-pulse bg-slate-50 min-h-screen" />;
  if (!lead) return <div className="p-10">Lead não encontrado.</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header / Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para a Base
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <MoreHorizontal className="w-5 h-5" />
            Mais Ações
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 rounded-2xl font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Zap className="w-5 h-5" />
            Agendar Automação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lead Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-32 bg-slate-950 -z-10" />
            <div className="w-24 h-24 rounded-[32px] bg-white border-4 border-slate-50 mx-auto mt-6 flex items-center justify-center text-indigo-600 text-3xl font-extrabold shadow-lg">
              {lead.fullName.charAt(0)}
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-slate-900">{lead.fullName}</h2>
              <p className="text-slate-500 flex items-center justify-center gap-2 mt-1">
                <Building2 className="w-4 h-4" />
                {lead.company}
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Status Geral</p>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-indigo-600 font-bold text-xs uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {lead.generalStatus}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Score</p>
                <p className="text-sm font-bold text-slate-900 mt-1">A+</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a 
                href={lead.linkedinNormalized || '#'} 
                target="_blank"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-blue-50 text-blue-700 font-bold text-sm hover:bg-blue-100 transition-all"
              >
                <Linkedin className="w-4 h-4" />
                Perfil LinkedIn
              </a>
              <a 
                href={lead.whatsappLink || '#'} 
                target="_blank"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Iniciar WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 space-y-6">
            <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-4">Informações de Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 truncate">
                  <p className="text-xs text-slate-400 font-bold uppercase">E-mail Corporativo</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">{lead.emailOriginal || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 font-bold uppercase">Telefone</p>
                  <p className="text-sm font-semibold text-slate-700">{lead.phoneOriginal || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 font-bold uppercase">Data Importação</p>
                  <p className="text-sm font-semibold text-slate-700">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-10 min-h-[600px]">
            <LeadTimeline 
              interactions={lead.interactions || []} 
              statusHistory={lead.statusHistories || []} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
