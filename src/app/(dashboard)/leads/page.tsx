'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, Loader2 } from 'lucide-react';
import { LeadsTable } from '@/features/leads/LeadsTable';
import { LeadFilters } from '@/features/leads/LeadFilters';
import type { LeadWithHistory } from '@/features/leads/types';
import type { Template } from '@prisma/client';

interface LeadsData {
  leads: LeadWithHistory[];
  total: number;
  totalPages: number;
  error?: string;
}

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estado
  const [leads, setLeads] = useState<LeadWithHistory[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Obter parâmetros da URL
  const getUrlParams = () => {
    return {
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
      stage: searchParams.get('stage') || '',
      page: parseInt(searchParams.get('page') || '1'),
    };
  };

  // Carregar dados do servidor
  const loadLeads = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { getLeads } = await import('@/actions/leads');
      const { getTemplates } = await import('@/actions/templates');
      
      const params = getUrlParams();
      
      // Carregar leads e templates em paralelo
      const [leadsResult, templatesResult] = await Promise.all([
        getLeads({ page: params.page, search: params.search, status: params.status, stage: params.stage }),
        getTemplates().catch(() => [])
      ]);
      
      if (leadsResult.error) {
        setError(leadsResult.error);
        setLeads([]);
        setTotal(0);
        setTotalPages(1);
      } else {
        setLeads(leadsResult.leads || []);
        setTotal(leadsResult.total || 0);
        setTotalPages(leadsResult.totalPages || 1);
      }
      
      setTemplates(Array.isArray(templatesResult) ? templatesResult : []);
      setCurrentPage(params.page);
      
    } catch (err: any) {
      console.error('Erro ao carregar leads:', err);
      setError(err?.message || 'Erro ao carregar dados');
      setLeads([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar ao iniciar e quando URL mudar
  useEffect(() => {
    loadLeads();
  }, [searchParams.toString()]);

  // Handler de mudança de página
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/leads?${params.toString()}`);
  };

  // Se está carregando
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Leads</h1>
        <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  // Se houve erro
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Leads</h1>
        <div className="bg-white rounded-2xl border border-red-200 p-8 flex flex-col items-center justify-center text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button 
            onClick={loadLeads}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Render normal
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Users className="w-5 h-5 text-white" />
            </div>
            Leads
          </h1>
          <p className="text-slate-500 mt-1 text-sm ml-[52px]">
            Gerencie seus contatos comerciais
          </p>
        </div>
      </div>

      {/* Filtros */}
      <LeadFilters />

      {/* Tabela */}
      <LeadsTable
        leads={leads}
        total={total}
        page={currentPage}
        totalPages={totalPages}
        templates={templates}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// Wrapper com Suspense para o useSearchParams
export function LeadsPageWithSuspense() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Leads</h1>
        <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      </div>
    }>
      <LeadsPage />
    </Suspense>
  );
}