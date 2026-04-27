import { Suspense } from 'react';
import { Users } from 'lucide-react';
import { getLeads } from '@/actions/leads';
import { LeadsTableWrapper } from '@/features/leads/LeadsTableWrapper';

interface LeadsPageProps {
  searchParams: Promise<{ search?: string; status?: string; stage?: string; page?: string }>;
}

export const metadata = {
  title: 'Leads – LimpaLeads',
  description: 'Gerencie seus contatos comerciais',
};

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  // Extrair parâmetros com segurança
  let page = 1;
  let search = '';
  let status = '';
  let stage = '';
  
  try {
    const params = await searchParams;
    page = Number(params.page) || 1;
    search = params.search || '';
    status = params.status || '';
    stage = params.stage || '';
  } catch (e) {
    console.error('Erro ao extrair params:', e);
    // Continua com valores padrão
  }

  // Buscar leads com tratamento de erro robusto
  let result: any = { leads: [], total: 0, totalPages: 1, error: null };
  
  try {
    result = await getLeads({ page, search, status, stage });
  } catch (e: any) {
    console.error('Erro ao buscar leads:', e);
    result = { 
      leads: [], 
      total: 0, 
      totalPages: 1, 
      error: e?.message || 'Erro desconhecido' 
    };
  }

  // Se houve erro na busca, mostrar mensagem
  if (result.error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Leads</h1>
        <div className="bg-white rounded-2xl border border-red-200 p-8 flex flex-col items-center justify-center text-center">
          <p className="text-red-600 font-medium mb-4">{result.error}</p>
          <p className="text-slate-500 text-sm">Se o problema persistir, faça login novamente.</p>
        </div>
      </div>
    );
  }
  
  // Garantir que leads é sempre um array válido
  const safeLeads = Array.isArray(result.leads) ? result.leads : [];
  const safeTotal = typeof result.total === 'number' ? result.total : 0;
  const safeTotalPages = typeof result.totalPages === 'number' ? result.totalPages : 1;

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

      {/* Filtros - carregados dinamicamente */}
      <Suspense fallback={null}>
        <LeadFiltersLazy />
      </Suspense>

      {/* Tabela */}
      <Suspense fallback={
        <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <LeadsTableWrapper
          initialLeads={safeLeads}
          initialTotal={safeTotal}
          initialPage={page}
          initialTotalPages={safeTotalPages}
          templates={[]}
        />
      </Suspense>
    </div>
  );
}

// Componente de filtros carregado separadamente para evitar problemas de SSR
async function LeadFiltersLazy() {
  const { LeadFilters } = await import('@/features/leads/LeadFilters');
  return <LeadFilters />;
}