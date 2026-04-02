'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LeadsTable } from './LeadsTable';
import type { Template } from '@prisma/client';
import type { Prisma } from '@prisma/client';

type LeadWithHistory = Prisma.LeadGetPayload<{
  include: { 
    histories: { orderBy: { createdAt: 'desc' }, take: 10 };
    lastOperator: { select: { name: true } };
    leadNotes: { orderBy: { createdAt: 'desc' }, take: 1 };
  };
}>;

interface LeadsTableWrapperProps {
  leads: LeadWithHistory[];
  total: number;
  page: number;
  totalPages: number;
  templates: Template[];
}

export function LeadsTableWrapper({ leads, total, page, totalPages, templates }: LeadsTableWrapperProps) {
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
      templates={templates}
      onPageChange={handlePageChange}
    />
  );
}
