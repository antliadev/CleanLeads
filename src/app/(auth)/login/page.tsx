'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { BadgeCheck, Loader2 } from 'lucide-react';
import { login, type AuthResult } from '@/actions/auth';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(login, null);

  return (
    <div className="space-y-8">
      {/* Logo */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/30">
            <BadgeCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">LimpaLeads</h1>
        <p className="text-slate-400 mt-2">Acesse sua conta para continuar</p>
      </div>

      {/* Formulário */}
      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Não tem conta?{' '}
        <Link href="/registro" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          Crie uma agora
        </Link>
      </p>
    </div>
  );
}
