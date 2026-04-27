'use client';

import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { useTransition, useState, useEffect } from 'react';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function LeadFilters() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Lê parâmetros diretamente da URL
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
  
  // Estado local para o input (busca manual)
  const [localSearch, setLocalSearch] = useState(currentSearch);
  const normalizeSearch = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  // Sincroniza o localSearch quando a URL mudar
  useEffect(() => {
    const params = getParams();
    setLocalSearch(params.search);
  }, [currentSearch]);

  const updateUrl = (newParams: Record<string, string>) => {
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
  };

  const handleSearch = () => {
    const normalized = normalizeSearch(localSearch);
    updateUrl({ search: normalized });
  };

  const clearAll = () => {
    setLocalSearch('');
    startTransition(() => {
      router.push('/leads');
    });
  };

  const hasFilters = currentSearch || currentStatus || currentStage;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Campo de busca manual */}
      <div className="relative flex-1 min-w-[280px] max-w-sm group">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Busque e pressione Enter..."
          className={cn(
            'w-full pl-4 pr-12 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-900 shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
            isPending && 'opacity-60'
          )}
        />
        <button
          onClick={handleSearch}
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
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50"
        >
          <X className="w-4 h-4" />
          Limpar
        </button>
      )}
    </div>
  );
}