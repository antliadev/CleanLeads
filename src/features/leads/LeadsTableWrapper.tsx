'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LeadsTable } from './LeadsTable';
import type { Template } from '@prisma/client';
import type { Prisma } from '@prisma/client';
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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialPage);

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
      total={initialTotal}
      page={currentPage}
      totalPages={initialTotalPages}
      templates={templates}
      onPageChange={handlePageChange}
      hasMore={hasMore}
      onLoadMore={loadMoreLeads}
      isLoadingMore={isLoadingMore}
    />
  );
}
