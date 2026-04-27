import AgendaPage from '@/features/agenda/AgendaPage';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Agenda de Follow-up | LimpaLeads',
  description: 'Gerencie sua cadência diária de prospecção.',
};

export default function Page() {
  return <AgendaPage />;
}
