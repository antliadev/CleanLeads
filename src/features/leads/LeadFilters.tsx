'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useCallback, useTransition } from 'react';
import { LEAD_STATUS_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function LeadFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('search') || '';
  const currentStatus = searchParams.get('status') || '';

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page'); // reset paginação ao filtrar
      startTransition(() => {
        router.push(`/leads?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const clearAll = () => {
    startTransition(() => {
      router.push('/leads');
    });
  };

  const hasFilters = currentSearch || currentStatus;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Campo de busca */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={currentSearch}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Buscar por nome, empresa ou e-mail..."
          className={cn(
            'w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-white',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all',
            isPending && 'opacity-60'
          )}
        />
      </div>

      {/* Filtro de status */}
      <select
        value={currentStatus}
        onChange={(e) => updateFilter('status', e.target.value)}
        className={cn(
          'border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-white',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all',
          isPending && 'opacity-60'
        )}
      >
        <option value="">Todos os status</option>
        {Object.entries(LEAD_STATUS_MAP).map(([value, { label }]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {/* Limpar filtros */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-200"
        >
          <X className="w-4 h-4" />
          Limpar
        </button>
      )}
    </div>
  );
}
