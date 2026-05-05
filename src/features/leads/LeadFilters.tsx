'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { useTransition, useState, useEffect, useRef, useCallback } from 'react';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Filtros da página de Leads com busca fuzzy client-side.
 * - Busca em tempo real com debounce (300ms)
 * - Limpar filtros restaura todos os leads
 * - Busca via server action com normalização de acentos
 */
export function LeadFilters() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const getParams = () => {
    if (typeof window === 'undefined') {
      return { search: '', status: '', stage: '' };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      status: params.get('status') || '',
      stage: params.get('stage') || ''
    };
  };

  const { search: currentSearch, status: currentStatus, stage: currentStage } = getParams();

  const [localSearch, setLocalSearch] = useState(currentSearch);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sincroniza localSearch quando a URL muda (popstate, navegação)
  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  const updateUrl = useCallback((newParams: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.delete('page'); // reset paginação ao filtrar

    startTransition(() => {
      router.push(`/leads?${params.toString()}`);
    });
  }, [router]);

  // Busca com debounce (300ms)
  const handleSearch = useCallback((query: string) => {
    updateUrl({ search: query.trim() });
  }, [updateUrl]);

  const handleInputChange = (value: string) => {
    setLocalSearch(value);

    // Limpa timer anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Agenda nova busca
    debounceTimerRef.current = setTimeout(() => {
      if (value.trim().length >= 2) {
        handleSearch(value);
      } else if (value.trim() === '') {
        // Limpa busca quando campo está vazio
        updateUrl({ search: '' });
      }
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Busca imediata ao submeter
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    handleSearch(localSearch);
  };

  const clearAll = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setLocalSearch('');
    startTransition(() => {
      router.push('/leads');
    });
  };

  const hasFilters = currentSearch || currentStatus || currentStage;

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
      {/* Campo de busca com debounce */}
      <div className="relative flex-1 min-w-[280px] max-w-sm group">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Buscar por nome, empresa, e-mail..."
          className={cn(
            'w-full pl-4 pr-12 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-900 shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
            isPending && 'opacity-60'
          )}
          aria-label="Buscar leads"
        />
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
            "hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50",
            isPending && "animate-pulse"
          )}
          title="Clique para pesquisar"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Filtro de status */}
      <select
        value={currentStatus}
        onChange={(e) => updateUrl({ status: e.target.value })}
        className={cn(
          'border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer',
          isPending && 'opacity-60'
        )}
      >
        <option value="">Todos os status</option>
        {Object.entries(LEAD_STATUS_MAP).map(([value, { label }]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {/* Filtro de Estágio */}
      <select
        value={currentStage}
        onChange={(e) => updateUrl({ stage: e.target.value })}
        className={cn(
          'border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer',
          isPending && 'opacity-60'
        )}
      >
        <option value="">Todos os estágios</option>
        <option value="none">Sem Cadência</option>
        <option value="1">Passo 1 - LinkedIn</option>
        <option value="2">Passo 2 - LinkedIn</option>
        <option value="3">Passo 3 - E-mail</option>
        <option value="4"> Passo 4 - WhatsApp</option>
        <option value="5">Passo 5 - LinkedIn</option>
        <option value="6">Passo 6 - E-mail</option>
      </select>

      {/* Botão Limpar */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50"
        >
          <X className="w-4 h-4" />
          Limpar
        </button>
      )}
    </form>
  );
}