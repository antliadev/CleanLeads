'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LeadsTable } from './LeadsTable';
import type { Template } from '@prisma/client';
import type { LeadWithHistory } from './types';

interface LeadsTableWrapperProps {
  initialLeads: LeadWithHistory[];
  initialTotal: number;
  initialPage: number;
  initialTotalPages: number;
  templates: Template[];
}

export function LeadsTableWrapper({ initialLeads, initialTotal, initialPage, initialTotalPages, templates }: LeadsTableWrapperProps) {
  const router = useRouter();
  
  // Estado para carregar mais leads
  const [leads, setLeads] = useState<LeadWithHistory[]>(initialLeads);
  const [total, setTotal] = useState(initialTotal);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Carrega leads basado nos parâmetros atuais da URL
  const loadLeads = useCallback(async (page: number = 1, forceRefresh: boolean = false) => {
    // Lê params diretamente da URL
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
    const status = params.get('status') || '';
    const stage = params.get('stage') || '';
    
    // Se não há filtros e não é refresh forçado, mantém estado atual
    if (!search && !status && !stage && !forceRefresh && page === 1 && leads.length > 0) {
      return;
    }

    setIsRefreshing(true);
    try {
      const { getLeads } = await import('@/actions/leads');
      const result = await getLeads({ 
        page, 
        search,
        status,
        stage
      });
      
      if (result.leads) {
        if (page === 1) {
          setLeads(result.leads);
        } else {
          setLeads(prev => [...prev, ...result.leads]);
        }
        setTotal(result.total);
        setCurrentPage(page);
        setHasMore(page < result.totalPages);
      }
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [leads.length]);

  // Escuta mudanças na URL via popstate
  useEffect(() => {
    const handlePopState = () => {
      // Recarrega quando URL muda
      loadLeads(1, true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [loadLeads]);

  // Server action para carregar mais leads
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
    } catch (error) {
      console.error('Erro ao carregar mais leads:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(newPage));
    window.history.pushState({}, '', `/leads?${params.toString()}`);
    loadLeads(newPage);
  }

  // Se o usuário navegar para uma página específica, volta ao comportamento padrão
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get('page') || '1');
    if (pageParam !== 1 && pageParam !== currentPage) {
      return (
        <LeadsTable
          leads={initialLeads}
          total={initialTotal}
          page={initialPage}
          totalPages={initialTotalPages}
          templates={templates}
          onPageChange={handlePageChange}
        />
      );
    }
  }

  return (
    <LeadsTable
      leads={leads}
      total={total}
      page={currentPage}
      totalPages={Math.ceil(total / 50)}
      templates={templates}
      onPageChange={handlePageChange}
      hasMore={hasMore}
      onLoadMore={loadMoreLeads}
      isLoadingMore={isLoadingMore}
      isRefreshing={isRefreshing}
    />
  );
}