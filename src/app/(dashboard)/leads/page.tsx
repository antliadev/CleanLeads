import { Suspense } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { getLeads } from '@/actions/leads';
import { getTemplates } from '@/actions/templates';
import { LeadsTableWrapper } from '@/features/leads/LeadsTableWrapper';
import { LeadFilters } from '@/features/leads/LeadFilters';

export const metadata = {
  title: 'Leads – LimpaLeads',
  description: 'Gerencie seus contatos comerciais',
};

interface LeadsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = typeof params.search === 'string' ? params.search : '';
  const status = typeof params.status === 'string' ? params.status : '';
  const stage = typeof params.stage === 'string' ? params.stage : '';

  const [result, templatesResult] = await Promise.all([
    getLeads({ page, search, status, stage }),
    getTemplates().catch(() => [])
  ]);

  const safeLeads = Array.isArray(result.leads) ? result.leads : [];
  const safeTotal = typeof result.total === 'number' ? result.total : 0;
  const safeTotalPages = typeof result.totalPages === 'number' ? result.totalPages : 1;
  const safeTemplates = Array.isArray(templatesResult) ? templatesResult : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Users className="w-5 h-5 text-white" />
            </div>
            Leads
          </h1>
          <p className="text-slate-500 mt-1 text-sm ml-[52px]">
            Gerencie seus contatos comerciais
          </p>
        </div>
      </div>

      {result.error ? (
        <div className="bg-white rounded-2xl border border-red-200 p-8 flex flex-col items-center justify-center text-center">
          <p className="text-red-600 font-medium mb-4">{result.error}</p>
          <p className="text-slate-500 text-sm">Se o problema persistir, verifique a conexão com o banco de dados.</p>
        </div>
      ) : (
        <>
          {/* Filtros em Client Component */}
          <Suspense fallback={<div className="h-16 bg-slate-100 animate-pulse rounded-2xl" />}>
            <LeadFilters />
          </Suspense>

          {/* Tabela Interativa e Wrapper */}
          <Suspense fallback={
            <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          }>
            <LeadsTableWrapper
              initialLeads={safeLeads}
              initialTotal={safeTotal}
              initialPage={page}
              initialTotalPages={safeTotalPages}
              templates={safeTemplates as any}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
