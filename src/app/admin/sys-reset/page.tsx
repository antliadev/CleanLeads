'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Loader2, Save, Home, KeyRound } from 'lucide-react';
import { forceResetPasswordForEmail, type AdminActionResponse } from '@/actions/admin';
import { PasswordInput } from '@/components/ui/PasswordInput';

export default function SysResetPage() {
  const [state, formAction, isPending] = useActionState<AdminActionResponse | null, FormData>(forceResetPasswordForEmail, null);
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-8 relative overflow-hidden">
        
        {/* Header Decorativo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-indigo-500" />
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Override</h1>
          <p className="text-sm text-slate-400">
            Forçar redefinição de senha sem verificação de e-mail. Apenas para ambiente restrito.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          <div className="space-y-4">
            
            {/* Chave Administrativa Mestra */}
            <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 focus-within:border-red-500/50 transition-colors duration-300">
              <label htmlFor="secretKey" className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <KeyRound className="w-4 h-4 text-red-400" />
                Chave Mestra (ADMIN_SECRET_KEY)
              </label>
              <div className="relative">
                <input
                  id="secretKey"
                  name="secretKey"
                  type={showKey ? "text" : "password"}
                  required
                  autoComplete="off"
                  className="w-full bg-transparent text-white placeholder:text-slate-600 focus:outline-none font-mono text-sm tracking-widest"
                  placeholder="••••••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  {showKey ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {/* Alvo */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                E-mail do Usuário Alvo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                placeholder="paulo.leads@gmail.com"
              />
            </div>

            {/* Nova Senha */}
            <div className="space-y-1">
              <PasswordInput
                id="newPassword"
                name="newPassword"
                label="Nova Senha Forçada"
                required
                placeholder="No mínimo 6 caracteres"
              />
            </div>
          </div>

          {state && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${
              state.success 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sobrescrevendo...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Forçar Troca de Senha
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 flex justify-center">
          <Link 
            href="/login"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}
