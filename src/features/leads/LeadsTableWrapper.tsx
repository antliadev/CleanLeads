'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LeadsTable } from './LeadsTable';
import type { Lead } from '@prisma/client';

interface LeadsTableWrapperProps {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
}

export function LeadsTableWrapper({ leads, total, page, totalPages }: LeadsTableWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/leads?${params.toString()}`);
  }

  return (
    <LeadsTable
      leads={leads}
      total={total}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
