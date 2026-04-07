'use client';

import { useActionState, Suspense } from 'react';
import Link from 'next/link';
import { Loader2, UserPlus, ShieldCheck } from 'lucide-react';
import { 
  register, 
  type AuthResult 
} from '@/actions/auth';
import { PasswordInput } from '@/components/ui/PasswordInput';

function RegisterContent() {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(register, null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/30 transition-transform active:scale-95">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Criar sua conta
        </h1>
        <p className="text-slate-400 mt-2 max-w-xs mx-auto">
          Preencha os dados abaixo para acessar a plataforma LimpaLeads.
        </p>
      </div>

      {/* Formulário Único */}
      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2 font-medium">
            E-mail Profissional
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
            placeholder="seu@email.com"
            defaultValue={state?.email || ''}
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
            Nome Completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            placeholder="Seu nome"
          />
        </div>

        <PasswordInput
          id="password"
          name="password"
          label="Defina uma senha"
          placeholder="Mínimo 6 caracteres"
          required
          minLength={6}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar senha"
          placeholder="Repita a senha"
          required
          minLength={6}
        />

        {state?.error && (
          <div className={`${state.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} border rounded-xl px-4 py-3 text-sm font-medium`}>
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2 group"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Finalizar e Entrar
              <ShieldCheck className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Já possui conta?{' '}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          Fazer login
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-white">Carregando...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
