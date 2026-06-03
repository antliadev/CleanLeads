import { cookies } from 'next/headers';
import { getAgendaLeads, getStageCounts, getAgendaCounts } from '@/actions/cadence';
import { getTemplates } from '@/actions/templates';
import { getManualActions } from '@/actions/manual-actions';
import { AgendaPageClient } from './AgendaPageClient';

export default async function AgendaPage() {
  // Lê o operador ativo do cookie para filtrar as contagens iniciais
  const cookieStore = await cookies();
  const operatorId = cookieStore.get('limpaleads_operator_id')?.value;

  const [
    { leads, totalPending }, 
    templates,
    { stages, totalActive },
    { todayCount: initialTodayCount, overdueCount: initialOverdueCount },
    { actions: initialManualActions, totalPending: initialManualTotal },
  ] = await Promise.all([
    getAgendaLeads(),
    getTemplates(),
    getStageCounts(),
    getAgendaCounts({ operatorId }),
    getManualActions({ operatorId }),
  ]);

  return (
    <AgendaPageClient
      initialLeads={leads}
      initialTotalPending={totalPending + initialManualTotal}
      initialTemplates={templates}
      initialStages={stages}
      initialTotalActive={totalActive}
      initialTodayCount={initialTodayCount}
      initialOverdueCount={initialOverdueCount}
      initialManualActions={initialManualActions}
      initialManualTotal={initialManualTotal}
    />
  );
}