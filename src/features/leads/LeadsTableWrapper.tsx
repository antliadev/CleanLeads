'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LeadsTable } from './LeadsTable';
import type { Template } from '@prisma/client';
import type { LeadWithHistory } from './types';
import { useLeadStore } from '@/lib/stores/lead-store';

interface LeadsTableWrapperProps {
  initialLeads: LeadWithHistory[];
  initialTotal: number;
  initialPage: number;
  initialTotalPages: number;
  templates: Template[];
}

export function LeadsTableWrapper({ initialLeads, initialTotal, initialPage, initialTotalPages, templates }: LeadsTableWrapperProps) {
  const router = useRouter();
  
  // Garantir que os dados iniciais são sempre válidos
  const safeLeads = Array.isArray(initialLeads) ? initialLeads : [];
  const safeTotal = typeof initialTotal === 'number' && initialTotal >= 0 ? initialTotal : 0;
  const safeTemplates = Array.isArray(templates) ? templates : [];
  
  // Estado inicial
  const [leads, setLeads] = useState<LeadWithHistory[]>(safeLeads);
  const [total, setTotal] = useState(safeTotal);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zustand store para edição de leads
  const { setLeads: syncLeadsToStore } = useLeadStore();

  // ─── CORREÇÃO CRÍTICA ───────────────────────────────────────────────────────
  // Em Next.js App Router, navegações soft (router.push) re-renderizam o
  // Server Component e passam novas props, mas o Client Component NÃO
  // reseta o useState automaticamente. Este useEffect força a sincronização.
  // A key dinâmica em page.tsx já garante o remount, mas este Effect é o
  // fallback de segurança para edge cases.
  useEffect(() => {
    const safeLeadsArray = Array.isArray(initialLeads) ? initialLeads : [];
    setLeads(safeLeadsArray);
    setTotal(typeof initialTotal === 'number' ? initialTotal : 0);
    setCurrentPage(initialPage);
    setHasMore(initialPage < initialTotalPages);
    setError(null);
    
    // Sincroniza com store para permitir edição via modal
    syncLeadsToStore(safeLeadsArray);
  }, [initialLeads, initialTotal, initialPage, initialTotalPages, syncLeadsToStore]);


  // Escuta mudanças na URL via popstate
  useEffect(() => {
    const handlePopState = async () => {
      setIsRefreshing(true);
      setError(null);
      
      try {
        const params = new URLSearchParams(window.location.search);
        const { getLeads } = await import('@/actions/leads');
        const result = await getLeads({ 
          page: 1, 
          search: params.get('search') || '',
          status: params.get('status') || '',
          stage: params.get('stage') || ''
        });
        
        if (result.error) {
          setError(result.error);
        } else if (result.leads) {
          setLeads(result.leads);
          setTotal(result.total);
          setCurrentPage(1);
          setHasMore(1 < result.totalPages);
        }
      } catch (err) {
        console.error('Erro ao recarregar leads:', err);
        setError('Erro ao carregar dados');
      } finally {
        setIsRefreshing(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Carrega mais leads
  async function loadMoreLeads() {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const params = new URLSearchParams(window.location.search);
      const { getLeads } = await import('@/actions/leads');
      const result = await getLeads({ 
        page: nextPage, 
        search: params.get('search') || '',
        status: params.get('status') || '',
        stage: params.get('stage') || ''
      });
      
      if (result.leads && result.leads.length > 0) {
        setLeads(prev => [...prev, ...result.leads]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < result.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Erro ao carregar mais leads:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(newPage));
    window.history.pushState({}, '', `/leads?${params.toString()}`);
    
    setCurrentPage(newPage);
    setIsRefreshing(true);
    
    // Recarrega para a página solicitada
    import('@/actions/leads').then(({ getLeads }) => {
      getLeads({ 
        page: newPage, 
        search: params.get('search') || '',
        status: params.get('status') || '',
        stage: params.get('stage') || ''
      }).then(result => {
        if (result.leads) {
          setLeads(result.leads);
          setTotal(result.total);
          setHasMore(newPage < result.totalPages);
        }
        setIsRefreshing(false);
      });
    });
  }

  // Se há erro, mostra mensagem
  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-8 flex flex-col items-center justify-center text-center">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
        >
          Recarregar página
        </button>
      </div>
    );
  }

  return (
    <LeadsTable
      leads={leads}
      total={total}
      page={currentPage}
      totalPages={Math.ceil(total / 50) || 1}
      templates={templates}
      onPageChange={handlePageChange}
      hasMore={hasMore}
      onLoadMore={loadMoreLeads}
      isLoadingMore={isLoadingMore}
      isRefreshing={isRefreshing}
    />
  );
}