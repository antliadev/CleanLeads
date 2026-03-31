'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion, AnimatePresence } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <Sidebar />
      
      <div className="pl-64 flex flex-col min-h-screen transition-all duration-300">
        <Header />
        
        <main className="mt-20 flex-1 p-8 md:p-10 relative overflow-y-auto">
          {/* Background Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="px-8 py-6 border-t border-slate-200 bg-white/50 text-slate-500 text-xs flex justify-between items-center shrink-0">
          <p>&copy; 2026 Antlia Consultoria e Tecnologia - Todos os direitos reservados.</p>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-indigo-600 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacidade</a>
            <div className="h-3 w-px bg-slate-200" />
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold border border-emerald-100">Status: Operacional</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
