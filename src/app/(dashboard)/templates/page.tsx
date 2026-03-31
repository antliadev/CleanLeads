import { Suspense } from 'react';
import { FileText, Plus } from 'lucide-react';
import { getTemplates } from '@/actions/templates';
import { TemplatesClient } from '@/features/templates/TemplatesClient';

export const metadata = {
  title: 'Templates – LimpaLeads',
  description: 'Mensagens padronizadas para LinkedIn e E-mail',
};

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          Templates
        </h1>
        <p className="text-slate-500 mt-1 text-sm ml-[52px]">
          Mensagens padronizadas para LinkedIn e E-mail
        </p>
      </div>

      <Suspense fallback={null}>
        <TemplatesClient templates={templates} />
      </Suspense>
    </div>
  );
}
