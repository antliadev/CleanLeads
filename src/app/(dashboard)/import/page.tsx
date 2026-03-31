import { ImportWizard } from '@/features/imports/ImportWizard';

export const metadata = {
  title: 'Importar Leads | LimpaLeads',
};

export default function ImportPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Importação em Massa</h1>
        <p className="text-slate-500 mt-1">Carregue dados de Excel ou CSV para sua base de contatos comerciais.</p>
      </header>

      <ImportWizard />
    </div>
  );
}
