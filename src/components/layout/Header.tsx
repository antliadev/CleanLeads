'use client';

import { LogOut, User } from 'lucide-react';
import { logout } from '@/actions/auth';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-8 transition-colors">
      <div />
      <div className="flex items-center gap-4">
        {/* Toggle de Tema */}
        <ThemeToggle />
        
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-800 pl-4 transition-colors">
          <User className="w-4 h-4" />
          <span className="font-medium">{userName}</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </form>
      </div>
    </header>
  );
}
