'use client';

import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { useTransition, useState, useEffect, useCallback } from 'react';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Filtros da página de Leads.
 *
 * Comportamento de busca (texto): execucao somente por Enter ou lupa.
 *
 * Filtros de Status e Estágio disparam imediatamente ao mudar o select.
 *
 * Normalização e busca fuzzy são feitas no backend (Prisma + PostgreSQL).
 */
export function LeadFilters() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // ─── Lê URL atual (SSR-safe) ────────────────────────────────────────────────
  const getUrlParams = () => {
    if (typeof window === 'undefined') return { search: '', status: '', stage: '' };
    const p = new URLSearchParams(window.location.search);
    return {
      search: p.get('search') || '',
      status: p.get('status') || '',
      stage:  p.get('stage')  || '',
    };
  };

  const { search: urlSearch, status: urlStatus, stage: urlStage } = getUrlParams();

  // Estado local do campo — atualiza sem ir ao servidor
  const [localSearch, setLocalSearch] = useState(urlSearch);

  // Sincroniza campo quando URL muda externamente (ex: botão Limpar, popstate)
  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const updateUrl = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(window.location.search);
      Object.entries(newParams).forEach(([k, v]) => {
        if (v) {
          params.set(k, v);
        } else {
          params.delete(k);
        }
      });
      params.delete('page'); // reseta paginação ao filtrar
      const qs = params.toString();
      const href = qs ? `/leads?${qs}` : '/leads';
      startTransition(() => router.push(href));
    },
    [router]
  );

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleInputChange = (value: string) => {
    setLocalSearch(value);
  };

  // Limpa o campo de texto e remove filtro de busca da URL
  const handleClearSearch = () => {
    setLocalSearch('');
    updateUrl({ search: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ search: localSearch.trim() });
  };

  // Limpa TODOS os filtros e volta à lista completa
  const clearAll = () => {
    setLocalSearch('');
    startTransition(() => router.push('/leads'));
  };

  const hasFilters = urlSearch || urlStatus || urlStage;

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">

      {/* ── Campo de busca ──────────────────────────────────────────────────── */}
      <div className="relative flex-1 min-w-[280px] max-w-sm">
        <input
          id="lead-search-input"
          type="text"
          value={localSearch}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Buscar por nome, empresa, e-mail..."
          autoComplete="off"
          className={cn(
            'w-full pl-4 pr-20 py-2.5 border rounded-xl text-sm shadow-sm transition-all',
            'text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-900',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
            'border-slate-200 dark:border-slate-800',
            isPending && 'opacity-60'
          )}
          aria-label="Buscar leads"
        />

        {/* Botão limpar texto (X) — só aparece quando há texto no campo */}
        {localSearch && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-10 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors"
            title="Limpar busca"
            tabIndex={-1}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Botão lupa — busca imediata ao clicar */}
        <button
          id="lead-search-button"
          type="submit"
          disabled={isPending}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8',
            'flex items-center justify-center rounded-lg transition-all disabled:opacity-50',
            isPending
              ? 'text-indigo-600 animate-pulse'
              : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
          )}
          title="Pesquisar (Enter)"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Filtro de Status ────────────────────────────────────────────────── */}
      <select
        id="lead-status-filter"
        value={urlStatus}
        onChange={(e) => updateUrl({ status: e.target.value })}
        disabled={isPending}
        className={cn(
          'border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5',
          'text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer',
          isPending && 'opacity-60'
        )}
      >
        <option value="">Todos os status</option>
        {Object.entries(LEAD_STATUS_MAP).map(([value, { label }]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {/* ── Filtro de Estágio ───────────────────────────────────────────────── */}
      <select
        id="lead-stage-filter"
        value={urlStage}
        onChange={(e) => updateUrl({ stage: e.target.value })}
        disabled={isPending}
        className={cn(
          'border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5',
          'text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer',
          isPending && 'opacity-60'
        )}
      >
        <option value="">Todos os estágios</option>
        <option value="none">Sem Cadência</option>
        <option value="1">Passo 1 - LinkedIn</option>
        <option value="2">Passo 2 - LinkedIn</option>
        <option value="3">Passo 3 - E-mail</option>
        <option value="4">Passo 4 - WhatsApp</option>
        <option value="5">Passo 5 - LinkedIn</option>
        <option value="6">Passo 6 - E-mail</option>
      </select>

      {/* ── Botão Limpar todos os filtros ──────────────────────────────────── */}
      {hasFilters && (
        <button
          id="lead-clear-filters"
          type="button"
          onClick={clearAll}
          disabled={isPending}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Limpar
        </button>
      )}
    </form>
  );
}
