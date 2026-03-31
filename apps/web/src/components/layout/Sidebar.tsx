'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  History, 
  Users, 
  Upload, 
  Settings, 
  LayoutDashboard, 
  FileText,
  MessageSquare,
  BadgeCheck
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Leads', href: '/dashboard/leads' },
  { icon: Upload, label: 'Importação', href: '/dashboard/import' },
  { icon: History, label: 'Histórico', href: '/dashboard/history' },
  { icon: FileText, label: 'Templates', href: '/dashboard/templates' },
  { icon: MessageSquare, label: 'Follow-ups', href: '/dashboard/follow-ups' },
  { icon: Settings, label: 'Configurações', href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-950 text-slate-200 border-r border-slate-800 transition-all duration-300 ease-in-out fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-800">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
          <BadgeCheck className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">Antigravity</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400 font-medium" 
                  : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
              )}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full" />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-indigo-500" : "group-hover:text-slate-200"
              )} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Plano Atual</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Enterprise</span>
            <span className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-600/30">ATIVO</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-[80%]" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">80% da cota mensal utilizada</p>
        </div>
      </div>
    </div>
  );
}
