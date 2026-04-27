'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  
  // Estado para carregar mais leads
  const [leads, setLeads] = useState<LeadWithHistory[]>(initialLeads);
  const [total, setTotal] = useState(initialTotal);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Verifica se há filtros ativos
  const hasFilters = Boolean(
    searchParams.get('search') || 
    searchParams.get('status') || 
    searchParams.get('stage')
  );

  // Carrega leads basado nos parâmetros atuais da URL
  const loadLeads = useCallback(async (page: number = 1, forceRefresh: boolean = false) => {
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const stage = searchParams.get('stage') || '';
    
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
  }, [searchParams, leads.length]);

  // Atualiza quando a URL muda (filtros alterados ou limpeza)
  useEffect(() => {
    // Reset para página 1 quando filtros mudam
    setCurrentPage(1);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const stage = searchParams.get('stage') || '';
    
    // Se não há filtros, carrega todos os leads
    if (!search && !status && !stage) {
      loadLeads(1, true);
    } else {
      loadLeads(1);
    }
  }, [searchParams.get('search'), searchParams.get('status'), searchParams.get('stage')]);

  // Server action para carregar mais leads (import dinâmico para evitar bundling grande)
  async function loadMoreLeads() {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const { getLeads } = await import('@/actions/leads');
      const result = await getLeads({ 
        page: nextPage, 
        search: searchParams.get('search') || '',
        status: searchParams.get('status') || '',
        stage: searchParams.get('stage') || ''
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
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/leads?${params.toString()}`);
  }

  // Se o usuário navegar para uma página específica, volta ao comportamento padrão
  if (searchParams.get('page') && parseInt(searchParams.get('page')!) !== 1 && parseInt(searchParams.get('page')!) !== currentPage) {
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
      filtersActive={hasFilters}
    />
  );
}
