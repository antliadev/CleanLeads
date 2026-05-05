'use client';

import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { useTransition, useState, useEffect, useCallback } from 'react';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Filtros da página de Leads — busca MANUAL.
 * - Busca dispara APENAS ao clicar na lupa ou pressionar Enter
 * - Campo de texto atualiza apenas estado local (sem debounce automático)
 * - Limpar filtros restaura todos os leads
 * - Busca via server action com normalização de acentos no backend
 */
export function LeadFilters() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Lê parâmetros da URL de forma segura (SSR-safe)
  const getParams = () => {
    if (typeof window === 'undefined') {
      return { search: '', status: '', stage: '' };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      status: params.get('status') || '',
      stage: params.get('stage') || '',
    };
  };

  const { search: currentSearch, status: currentStatus, stage: currentStage } = getParams();

  // Estado local do campo de texto — só atualiza a URL ao submeter
  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Indica que o campo tem texto diferente da busca ativa na URL
  const hasPendingSearch = localSearch.trim() !== currentSearch.trim();

  // Sincroniza localSearch quando a URL muda (navegação, popstate, Limpar)
  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  // Atualiza parâmetros da URL sem tocar em outros filtros existentes
  const updateUrl = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(window.location.search);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.delete('page'); // reseta paginação sempre que filtros mudam

      startTransition(() => {
        router.push(`/leads?${params.toString()}`);
      });
    },
    [router]
  );

  // Dispara a busca — só chamado ao submeter o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ search: localSearch.trim() });
  };

  // Limpa todos os filtros e volta ao estado inicial
  const clearAll = () => {
    setLocalSearch('');
    startTransition(() => {
      router.push('/leads');
    });
  };

  const hasFilters = currentSearch || currentStatus || currentStage;

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
      {/* Campo de busca — manual */}
      <div className="relative flex-1 min-w-[280px] max-w-sm">
        <input
          id="lead-search-input"
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Buscar por nome, empresa, e-mail..."
          className={cn(
            'w-full pl-4 pr-12 py-2.5 border rounded-xl text-sm shadow-sm transition-all',
            'text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-900',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
            // Destaca a borda quando há texto pendente (diferente da URL)
            hasPendingSearch && !isPending
              ? 'border-indigo-400 dark:border-indigo-500'
              : 'border-slate-200 dark:border-slate-800',
            isPending && 'opacity-60'
          )}
          aria-label="Buscar leads"
          autoComplete="off"
        />

        {/* Botão lupa — único gatilho de busca */}
        <button
          id="lead-search-button"
          type="submit"
          disabled={isPending}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8',
            'flex items-center justify-center rounded-lg transition-all',
            'disabled:opacity-50',
            // Destaque quando há texto pendente para o usuário saber que pode clicar
            hasPendingSearch && !isPending
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100'
              : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30',
            isPending && 'animate-pulse'
          )}
          title="Pesquisar (ou pressione Enter)"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Filtro de Status — imediato (sem necessidade de clicar em buscar) */}
      <select
        id="lead-status-filter"
        value={currentStatus}
        onChange={(e) => updateUrl({ status: e.target.value })}
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

      {/* Filtro de Estágio — imediato */}
      <select
        id="lead-stage-filter"
        value={currentStage}
        onChange={(e) => updateUrl({ stage: e.target.value })}
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

      {/* Botão Limpar — visível quando há qualquer filtro ativo na URL */}
      {hasFilters && (
        <button
          id="lead-clear-filters"
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