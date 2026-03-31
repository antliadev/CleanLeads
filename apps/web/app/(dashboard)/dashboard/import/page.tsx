import React from 'react';
import { ImportWizard } from '@/features/imports/ImportWizard';
import { FileSpreadsheet, List } from 'lucide-react';
import Link from 'next/link';

export default function ImportPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-indigo-600" />
            Importação de Leads
          </h1>
          <p className="text-slate-500 mt-1">Carregue sua base para iniciar o processamento multicanal.</p>
        </div>
        <Link 
          href="/dashboard/history" 
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
        >
          <List className="w-4 h-4" />
          Ver Histórico de Importações
        </Link>
      </div>

      <ImportWizard />
    </div>
  );
}
