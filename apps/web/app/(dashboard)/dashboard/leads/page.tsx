import React from 'react';
import { LeadsTable } from '@/features/leads/LeadsTable';
import { Users, UserPlus, Download } from 'lucide-react';
import Link from 'next/link';

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-600" />
            Base de Leads
          </h1>
          <p className="text-slate-500 mt-1">Gerencie, filtre e acompanhe o status de todos os seus leads.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <Link 
            href="/dashboard/import" 
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 rounded-2xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <UserPlus className="w-4 h-4" />
            Importar Novos
          </Link>
        </div>
      </div>

      <LeadsTable />
    </div>
  );
}
