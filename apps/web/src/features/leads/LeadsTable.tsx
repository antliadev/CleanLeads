'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Mail, 
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Zap,
  Trash2
} from 'lucide-react';
function LinkedinIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
}
import { motion } from 'framer-motion';
import { InteractionAssistedModal } from '../automation/InteractionAssistedModal';
import { EditLeadModal } from './EditLeadModal';
import { Edit2 } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { API_BASE_URL } from '@/config/api';

const STATUS_MAP = {
  NOVO: { label: 'Novo', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Clock },
  PRONTO_PARA_CONTATO: { label: 'Pronto', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  AGUARDANDO_CONTATO: { label: 'Pendente', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: Clock },
  AGUARDANDO_RESPOSTA: { label: 'Em espera', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: MessageCircle },
  EM_CONTATO: { label: 'Conversando', color: 'bg-violet-50 text-violet-600 border-violet-100', icon: MessageCircle },
  REVISAO_MANUAL: { label: 'Revisão', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: AlertCircle },
  BLOQUEADO: { label: 'Bloqueado', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: ShieldAlert },
};
export function LeadsTable() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<any>({ total: 0, page: 1, last_page: 1 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  
  // Interaction State
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialChannel, setInitialChannel] = useState<'LINKEDIN' | 'EMAIL' | null>(null);

  // Edit State
  const [leadToEdit, setLeadToEdit] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Delete State
  const [leadToDeleteId, setLeadToDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLeads = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(status && { status }),
      });

      const response = await fetch(`${API_BASE_URL}/leads?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setLeads(data.items);
      setMeta(data.meta);
    } catch (err) {
      console.error('Erro ao buscar leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchLeads(1), 300);
    return () => clearTimeout(timer);
  }, [search, status]);

  const handleStartInteraction = (lead: any, channel: 'LINKEDIN' | 'EMAIL' | null = null) => {
    setSelectedLead(lead);
    setInitialChannel(channel);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          status: newStatus,
          note: `Atualizado via Assistente Manual para ${newStatus}`,
        }),
      });

      if (response.ok) {
        fetchLeads(meta.page);
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  const handleDeleteLead = async () => {
    if (!leadToDeleteId) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadToDeleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        setIsDeleteModalOpen(false);
        setLeadToDeleteId(null);
        await fetchLeads(1);
      } else {
        const error = await response.json().catch(() => ({}));
        alert(`Erro ao excluir lead: ${error.message || 'Erro no servidor'}`);
      }
    } catch (err: any) {
      console.error('Falha na rede:', err);
      alert('Erro de conexão ao excluir lead.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por nome, empresa ou e-mail..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full md:w-48 bg-white border border-slate-200 rounded-2xl py-2.5 pl-11 pr-10 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none transition-all shadow-sm"
            >
              <option value="">Todos os Status</option>
              {Object.entries(STATUS_MAP).map(([val, { label }]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="max-h-[600px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Canais</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-6 h-16 bg-white" />
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <p className="font-bold text-slate-900">Nenhum lead encontrado</p>
                      <p className="text-sm text-slate-500 mt-1">Tente ajustar seus filtros ou realizar uma nova importação.</p>
                    </div>
                  </td>
                </tr>
              ) : leads.map((lead) => {
                const statusInfo = STATUS_MAP[lead.generalStatus as keyof typeof STATUS_MAP] || STATUS_MAP.NOVO;
                const canInteract = lead.generalStatus !== 'BLOQUEADO' && lead.generalStatus !== 'CONCLUIDO';

                return (
                  <motion.tr 
                    key={lead.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-xs font-bold text-slate-400 font-mono">{lead.code}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                          {lead.fullName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <Link href={`/dashboard/leads/${lead.id}`}>
                            <p className="text-sm font-bold text-slate-900 leading-none hover:text-indigo-600 transition-colors cursor-pointer">{lead.fullName}</p>
                          </Link>
                          <p className="text-xs text-slate-500 mt-1">{lead.emailNormalized || 'Sem e-mail'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm text-slate-600 font-medium">{lead.company}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                        <statusInfo.icon className="w-3.5 h-3.5" />
                        {statusInfo.label}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {lead.linkedinOriginal && (
                          <button 
                            onClick={() => handleStartInteraction(lead)}
                            className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors shadow-sm"
                            title="Abrir LinkedIn"
                          >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {lead.emailNormalized && (
                          <button 
                            onClick={() => handleStartInteraction(lead)}
                            className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors shadow-sm"
                            title="Enviar E-mail"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {lead.phoneValid && (
                          <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-300 transition-colors shadow-sm">
                            <MessageCircle className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                        {canInteract && (
                          <button 
                            onClick={() => handleStartInteraction(lead)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            Abordar
                          </button>
                        )}
                        <button 
                          onClick={() => { setLeadToEdit(lead); setIsEditModalOpen(true); }}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all z-20 relative"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { setLeadToDeleteId(lead.id); setIsDeleteModalOpen(true); }}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all z-20 relative"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500">
            Mostrando <span className="text-slate-900">{leads.length}</span> de <span className="text-slate-900">{meta.total}</span> registros
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => fetchLeads(meta.page - 1)}
              disabled={meta.page <= 1}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: meta.last_page || 1 }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => fetchLeads(i + 1)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    meta.page === i + 1 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => fetchLeads(meta.page + 1)}
              disabled={meta.page >= meta.last_page}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <InteractionAssistedModal 
        isOpen={isModalOpen}
        lead={selectedLead}
        initialChannel={initialChannel}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />

      <EditLeadModal 
        isOpen={isEditModalOpen}
        lead={leadToEdit}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={() => fetchLeads(meta.page)}
      />

      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteLead}
        isLoading={isDeleting}
        title="Excluir Lead Definitivemente?"
        description="Você está prestes a remover este lead e todo o seu histórico de interações. Esta ação não poderá ser revertida."
      />
    </div>
  );
}
