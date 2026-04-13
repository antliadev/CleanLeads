'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { BadgeCheck, Loader2, KeyRound, ChevronLeft } from 'lucide-react';
import { directResetPassword, type AuthResult } from '@/actions/auth';
import { PasswordInput } from '@/components/ui/PasswordInput';

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(directResetPassword, null);

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/30">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Redefinir Senha
        </h1>
        <p className="text-slate-400 mt-2 max-w-xs mx-auto">
          Informe seu e-mail e escolha sua nova senha imediatamente.
        </p>
      </div>

      <form action={formAction} className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
            placeholder="seu@email.com"
          />
        </div>
        
        <PasswordInput
          id="password"
          name="password"
          label="Nova Senha"
          placeholder="Mínimo 6 caracteres"
          required
          minLength={6}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar nova senha"
          placeholder="Repita a nova senha"
          required
          minLength={6}
        />

        {state && (
          <div className={`rounded-xl px-4 py-3 text-sm font-medium border text-center ${
            state.success 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {state.error || state.message || (state.success ? 'Senha redefinida com sucesso!' : 'Erro ao redefinir')}
          </div>
        )}

        {state?.success ? (
           <Link
           href="/login"
           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
         >
           Ir para Login
         </Link>
        ) : (
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Redefinir e Salvar'}
          </button>
        )}

        <Link 
          href="/login" 
          className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors font-medium mt-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para o login
        </Link>
      </form>
    </div>
  );
}
