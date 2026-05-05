import { useMemo, useState, useEffect } from 'react';
import Fuse from 'fuse.js';

// Normaliza texto: remove acentos, lowercase, trim
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

interface UseLeadSearchOptions<T> {
  /** Chaves para busca no Fuse.js */
  keys: string[];
  /** Threshold de fuzzy (0=exato, 1=qualquer) */
  threshold?: number;
  /** Função para obter campo de busca normalizado */
  normalize?: (item: T) => string;
}

/**
 * Hook reutilizável para busca fuzzy em listas de leads.
 * Usa Fuse.js client-side + normalização de acentos.
 */
export function useLeadSearch<T extends Record<string, any>>(
  items: T[],
  query: string,
  options: UseLeadSearchOptions<T>
): T[] {
  const { keys, threshold = 0.35 } = options;

  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys,
      threshold,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [items, keys, threshold]);

  // Memoizado: só recalcula quando query ou items mudam
  const results = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return items;

    // Busca com Fuse.js (fuzzy)
    const fuseResults = fuse.search(normalizedQuery);
    return fuseResults.map(r => r.item);
  }, [query, items, fuse]);

  return results;
}

/**
 * Hook simples para debounce de valores.
 * Delay padrão: 300ms.
 */
export function useDebounceValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}