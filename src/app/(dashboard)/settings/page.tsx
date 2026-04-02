import { Metadata } from 'next';
import { getOperators } from '@/actions/operators';
import { OperatorsClient } from '@/features/operators/OperatorsClient';

export const metadata: Metadata = {
  title: 'Configurações | LimpaLeads',
  description: 'Configurações do LimpaLeads',
};

export default async function SettingsPage() {
  const { operators, error } = await getOperators();

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

          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center">
              {error}
            </div>
          ) : (
            <OperatorsClient initialOperators={operators || []} />
          )}
        </div>
      </div>
    </div>
  );
}
