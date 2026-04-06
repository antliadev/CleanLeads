'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * ThemeProvider: Integrado com next-themes.
 * O erro de hidratação 'script tag' é suprimido pelo 'suppressHydrationWarning' 
 * no <html> no root layout, permitindo que o provedor injete o script de 
 * proteção de flash de forma segura.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
