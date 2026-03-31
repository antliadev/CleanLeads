'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { BadgeCheck, Loader2, MailCheck, ArrowLeft } from 'lucide-react';
import { register, verifySignupCode, type AuthResult } from '@/actions/auth';

export default function RegisterPage() {
  const [registerState, registerAction, isRegisterPending] = useActionState<AuthResult | null, FormData>(register, null);
  const [verifyState, verifyAction, isVerifyPending] = useActionState<AuthResult | null, FormData>(verifySignupCode, null);

  const isCodeStep = registerState?.step === 'code_needed' || verifyState?.step === 'code_needed';
  const currentEmail = verifyState?.email || registerState?.email || '';
  const currentError = verifyState?.error || registerState?.error;

  return (
    <div className="space-y-8">
      {/* Logo */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/30">
            {isCodeStep ? (
              <MailCheck className="w-8 h-8 text-white" />
            ) : (
              <BadgeCheck className="w-8 h-8 text-white" />
            )}
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {isCodeStep ? 'Verifique seu E-mail' : 'Criar Conta'}
        </h1>
        <p className="text-slate-400 mt-2">
          {isCodeStep 
            ? 'Enviamos um código de 6 dígitos para o seu e-mail' 
            : 'Comece a gerenciar seus leads agora'}
        </p>
      </div>

      {/* Formulário Step 2 (Código) */}
      {isCodeStep ? (
        <form action={verifyAction} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <input type="hidden" name="email" value={currentEmail} />
          
          <div>
            <label htmlFor="code" className="block text-sm font-semibold text-slate-300 mb-2 text-center">
              Digite o código de 6 dígitos
            </label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoComplete="one-time-code"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-3xl tracking-widest font-mono placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="000000"
            />
          </div>

          {verifyState?.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium text-center">
              {verifyState.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifyPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isVerifyPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Validando...
              </>
            ) : (
              'Ativar Conta'
            )}
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Não recebeu? Verifique o Spam ou{' '}
            <button 
              type="button" 
              onClick={() => window.location.reload()} 
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              voltar ao início
            </button>
          </p>
        </form>
      ) : (
        /* Formulário Step 1 (Dados) */
        <form action={registerAction} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="Seu nome completo"
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {registerState?.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
              {registerState.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isRegisterPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRegisterPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </button>
        </form>
      )}

      {!isCodeStep && (
        <p className="text-center text-sm text-slate-500">
          Já tem conta?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Faça login
          </Link>
        </p>
      )}
    </div>
  );
}
