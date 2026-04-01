'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { useCallback, useTransition, useState, useEffect } from 'react';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function LeadFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('search') || '';
  const currentStatus = searchParams.get('status') || '';
  
  // Estado local para o input (não dispara busca imediata)
  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Sincroniza o localSearch quando o parâmetro da URL mudar externamente (ex: Limpar Filtros)
  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  const updateUrl = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      
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
    },
    [router, searchParams]
  );

  const handleSearch = () => {
    updateUrl({ search: localSearch.trim() });
  };

  const clearAll = () => {
    setLocalSearch('');
    startTransition(() => {
      router.push('/leads');
    });
  };

  const hasFilters = currentSearch || currentStatus;

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
            'w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all',
            isPending && 'opacity-60'
          )}
        />
        <button
          onClick={handleSearch}
          disabled={isPending}
          className={cn(
             "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-all",
             "hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 disabled:opacity-50",
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

      {/* Filtro de status - Continua instantâneo por padrão de UX */}
      <select
        value={currentStatus}
        onChange={(e) => updateUrl({ status: e.target.value })}
        className={cn(
          'border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-white shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer',
          isPending && 'opacity-60'
        )}
      >
        <option value="">Todos os status</option>
        {Object.entries(LEAD_STATUS_MAP).map(([value, { label }]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {/* Botoes de Limpeza */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-200"
        >
          <X className="w-4 h-4" />
          Limpar
        </button>
      )}
    </div>
  );
}
