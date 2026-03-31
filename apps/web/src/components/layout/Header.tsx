'use client';

import React from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  User, 
  LogOut, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export function Header() {
  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 fixed top-0 right-0 left-64 z-30 transition-all duration-300 px-8 flex items-center justify-between">
      <div className="flex-1 max-w-xl group">
        <div className="relative group/search">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover/search:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Pesquisar leads, empresas ou histórico..." 
            className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-400 hover:bg-slate-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end mr-1">
            <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Pedro Administrador</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-indigo-500" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Admin</span>
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 p-0.5 shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-indigo-600 font-bold overflow-hidden border-2 border-white">
                <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
