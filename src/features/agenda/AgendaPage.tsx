import { getAgendaLeads, getStageCounts } from '@/actions/cadence';
import { getTemplates } from '@/actions/templates';
import { AgendaPageClient } from './AgendaPageClient';

export default async function AgendaPage() {
  const [
    { leads, totalPending }, 
    templates,
    { stages, totalActive }
  ] = await Promise.all([
    getAgendaLeads(),
    getTemplates(),
    getStageCounts()
  ]);

  return (
    <AgendaPageClient
      initialLeads={leads}
      initialTotalPending={totalPending}
      initialTemplates={templates}
      initialStages={stages}
      initialTotalActive={totalActive}
    />
  );
}