'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/analytics' },
  { icon: Users, label: 'Leads', href: '/leads' },
  { icon: FileText, label: 'Templates', href: '/templates' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-950 text-slate-200 border-r border-slate-800 fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-800">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
          <BadgeCheck className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">LimpaLeads</span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative',
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 font-medium'
                  : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
              )}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full" />
              )}
              <item.icon
                className={cn(
                  'w-5 h-5 transition-colors',
                  isActive ? 'text-indigo-500' : 'group-hover:text-slate-200'
                )}
              />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">LimpaLeads v2</p>
          <p className="text-[10px] text-slate-600">Gestão inteligente de leads</p>
        </div>
      </div>
    </div>
  );
}
