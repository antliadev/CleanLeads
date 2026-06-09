'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LeadsTable } from './LeadsTable';
import type { Template } from '@prisma/client';
import type { LeadWithHistory } from './types';
import { useLeadDataActions } from '@/lib/stores/lead-store';

interface LeadsTableWrapperProps {
  initialLeads: LeadWithHistory[];
  initialTotal: number;
  initialPage: number;
  initialTotalPages: number;
  templates: Template[];
}

export function LeadsTableWrapper({ initialLeads, initialTotal, initialPage, initialTotalPages, templates }: LeadsTableWrapperProps) {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const safeLeads = Array.isArray(initialLeads) ? initialLeads : [];
  const safeTotal = typeof initialTotal === 'number' && initialTotal >= 0 ? initialTotal : 0;

  const [leads, setLeads] = useState<LeadWithHistory[]>(safeLeads);
  const [total, setTotal] = useState(safeTotal);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [error, setError] = useState<string | null>(null);

  const { setLeads: syncLeadsToStore } = useLeadDataActions();

  useEffect(() => {
    const safeLeadsArray = Array.isArray(initialLeads) ? initialLeads : [];
    setLeads(safeLeadsArray);
    setTotal(typeof initialTotal === 'number' ? initialTotal : 0);
    setCurrentPage(initialPage);
    setTotalPages(initialTotalPages);
    setHasMore(initialPage < initialTotalPages);
    setError(null);
    syncLeadsToStore(safeLeadsArray);
  }, [initialLeads, initialTotal, initialPage, initialTotalPages, syncLeadsToStore]);

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
        stage: params.get('stage') || '',
      });

      if (result.error) {
        setError(result.error);
      } else if (result.leads && result.leads.length > 0) {
        setLeads((prev) => [...prev, ...result.leads]);
        setTotal(typeof result.total === 'number' ? result.total : total);
        setCurrentPage(nextPage);
        setTotalPages(result.totalPages);
        setHasMore(nextPage < result.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Erro ao carregar mais leads:', err);
      setError('Erro ao carregar dados');
    } finally {
      setIsLoadingMore(false);
    }
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(newPage));
    startTransition(() => router.push(`/leads?${params.toString()}`));
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-8 flex flex-col items-center justify-center text-center">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button
          onClick={() => router.refresh()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
        >
          Recarregar pagina
        </button>
      </div>
    );
  }

  return (
    <LeadsTable
      leads={leads}
      total={total}
      page={currentPage}
      totalPages={totalPages || 1}
      templates={templates}
      onPageChange={handlePageChange}
      hasMore={hasMore}
      onLoadMore={loadMoreLeads}
      isLoadingMore={isLoadingMore}
      isRefreshing={isNavigating}
    />
  );
}
