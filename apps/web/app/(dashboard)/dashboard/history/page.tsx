'use client';

import React from 'react';
import { 
  History, 
  Search, 
  Download, 
  Filter, 
  Zap, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const HISTORY_ITEMS = [
  { id: 1, type: 'IMPORT', name: 'Lote_SDR_Outubro.csv', date: '28/03/2026 14:30', status: 'SUCCESS', count: 154 },
  { id: 2, type: 'AUTOMATION', name: 'Campanha LinkedIn Follow-up', date: '27/03/2026 09:15', status: 'IN_PROGRESS', count: 42 },
  { id: 3, type: 'IMPORT', name: 'Prospects_TI_SP.xlsx', date: '26/03/2026 18:20', status: 'SUCCESS', count: 89 },
];

export default function HistoryPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
            <History className="w-10 h-10 text-indigo-600" />
            Histórico de Atividade
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Acompanhe todas as importações e automações realizadas.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all border border-slate-200">
          <Download className="w-4 h-4" />
          Exportar Log
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar no histórico..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Calendar className="w-4 h-4" />
          Período
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5 text-left">Evento</th>
                <th className="px-8 py-5 text-left">Data e Hora</th>
                <th className="px-8 py-5 text-left">Volume</th>
                <th className="px-8 py-5 text-left">Status</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HISTORY_ITEMS.map((item, idx) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50/50 transition-all group"
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${item.type === 'IMPORT' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                        {item.type === 'IMPORT' ? <Upload className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-400 tracking-wide font-medium">{item.type === 'IMPORT' ? 'Importação de Leads' : 'Automação de Destaque'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-500">{item.date}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm font-black text-slate-900">{item.count} leads</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      item.status === 'SUCCESS' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {item.status === 'SUCCESS' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      {item.status === 'SUCCESS' ? 'Concluído' : 'Processando'}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
