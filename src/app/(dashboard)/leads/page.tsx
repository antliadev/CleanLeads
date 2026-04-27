import { Suspense } from 'react';
import { Users } from 'lucide-react';
import { getLeads } from '@/actions/leads';
import { LeadsTable } from '@/features/leads/LeadsTable';
import { LeadFilters } from '@/features/leads/LeadFilters';
import { LeadsTableWrapper } from '@/features/leads/LeadsTableWrapper';

interface LeadsPageProps {
  searchParams: Promise<{ search?: string; status?: string; stage?: string; page?: string }>;
}

export const metadata = {
  title: 'Leads – LimpaLeads',
  description: 'Gerencie seus contatos comerciais',
};

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || '';
  const status = params.status || '';
  const stage = params.stage || '';

  // Busca leads com erro handler
  const result = await getLeads({ page, search, status, stage });
  const leads = result.leads || [];
  const total = result.total || 0;
  const totalPages = result.totalPages || 1;
  
  // Se houver erro, mostra mensagem amigável
  if (result.error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Leads</h1>
        <div className="bg-white rounded-2xl border border-red-200 p-8 flex flex-col items-center justify-center text-center">
          <p className="text-red-600 font-medium mb-4">{result.error}</p>
          <p className="text-slate-500 text-sm">Tente fazer login novamente.</p>
        </div>
      </div>
    );
  }
  
  // Opcional: injetamos os templates ativos para uso nos modais
  const { getTemplates } = await import('@/actions/templates');
  const temp = await getTemplates();
  const activeTemplates = temp.filter(t => t.isActive);

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

      {/* Filtros */}
      <Suspense fallback={null}>
        <LeadFilters />
      </Suspense>

      {/* Tabela */}
      <Suspense fallback={
        <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <LeadsTableWrapper
          initialLeads={leads}
          initialTotal={total}
          initialPage={page}
          initialTotalPages={totalPages}
          templates={activeTemplates}
        />
      </Suspense>
    </div>
  );
}
