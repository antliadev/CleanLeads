import { Metadata } from 'next';
import { getOperators } from '@/actions/operators';
import { getCadenceSettings } from '@/actions/cadence';
import { getTemplates } from '@/actions/templates';
import { OperatorsClient } from '@/features/operators/OperatorsClient';
import { CadenceSettings } from '@/features/cadence/components/CadenceSettings';

export const metadata: Metadata = {
  title: 'Configurações | LimpaLeads',
  description: 'Configurações do LimpaLeads',
};

export default async function SettingsPage() {
  const [
    { operators, error: opError },
    cadence,
    templates
  ] = await Promise.all([
    getOperators(),
    getCadenceSettings(),
    getTemplates()
  ]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950">
      <div className="flex-1 flex flex-col p-8 overflow-auto">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Configurações</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Gerencie opções do sistema, acessos e operadores de atendimento.
            </p>
          </div>

          {opError ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center">
              {opError}
            </div>
          ) : (
            <OperatorsClient initialOperators={operators || []} />
          )}

          {cadence && (
            <CadenceSettings 
              cadenceId={cadence.id} 
              initialStages={cadence.stages as any} 
              templates={templates.map(t => ({ id: t.id, name: t.name, channel: t.channel }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
