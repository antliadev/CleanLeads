'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * ThemeProvider: Integrado com next-themes.
 * No Next.js 16 (React 19), o next-themes injeta um script para evitar o FOUC (flash of unstyled content).
 * O React agora emite um erro de console ao encontrar tags <script> no meio do componente.
 * Esta implementação filtra esse erro específico em desenvolvimento, pois é um comportamento esperado da lib.
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) return;
    originalError.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
