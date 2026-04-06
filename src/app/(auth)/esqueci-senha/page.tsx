'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { BadgeCheck, Loader2, MailCheck, KeyRound, ChevronLeft } from 'lucide-react';
import { 
  requestRecoveryCode, 
  verifyRecoveryCode, 
  resetPassword, 
  type AuthResult 
} from '@/actions/auth';
import { PasswordInput } from '@/components/ui/PasswordInput';

export default function ForgotPasswordPage() {
  // Estados para as 3 ações
  const [requestState, requestAction, isRequestPending] = useActionState<AuthResult | null, FormData>(requestRecoveryCode, null);
  const [verifyState, verifyAction, isVerifyPending] = useActionState<AuthResult | null, FormData>(verifyRecoveryCode, null);
  const [resetState, resetAction, isResetPending] = useActionState<AuthResult | null, FormData>(resetPassword, null);

  // Determinar o passo atual
  const [currentStep, setCurrentStep] = useState<'email' | 'verify' | 'reset'>('email');
  const [email, setEmail] = useState('');

  // Sincronizar passos via actions
  useEffect(() => {
    if (requestState?.success && requestState?.step === 'recovery_verify_needed') {
      setCurrentStep('verify');
      if (requestState.email) setEmail(requestState.email);
    }
    if (verifyState?.success && verifyState?.step === 'reset_password_needed') {
      setCurrentStep('reset');
      if (verifyState.email) setEmail(verifyState.email);
    }
  }, [requestState, verifyState]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/30">
            {currentStep === 'email' && <KeyRound className="w-8 h-8 text-white" />}
            {currentStep === 'verify' && <MailCheck className="w-8 h-8 text-white animate-pulse" />}
            {currentStep === 'reset' && <BadgeCheck className="w-8 h-8 text-white" />}
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {currentStep === 'email' && 'Recuperar Senha'}
          {currentStep === 'verify' && 'Verifique seu e-mail'}
          {currentStep === 'reset' && 'Nova Senha'}
        </h1>
        <p className="text-slate-400 mt-2 max-w-xs mx-auto">
          {currentStep === 'email' && 'Informe o seu e-mail para receber um código de recuperação.'}
          {currentStep === 'verify' && `Enviamos o código para ${email}. Informe abaixo.`}
          {currentStep === 'reset' && 'Defina uma nova senha forte para sua conta.'}
        </p>
      </div>

      {/* Progress Line */}
      <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-indigo-500 transition-all duration-500" 
          style={{ width: currentStep === 'email' ? '33.3%' : currentStep === 'verify' ? '66.6%' : '100%' }}
        />
      </div>

      {/* ETAPA 1: SOLICITAR CÓDIGO */}
      {currentStep === 'email' && (
        <form action={requestAction} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
              Seu E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="seu@email.com"
            />
          </div>

          {requestState?.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium text-center">
              {requestState.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isRequestPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isRequestPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enviar Código'}
          </button>
          
          <Link 
            href="/login" 
            className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar para o login
          </Link>
        </form>
      )}

      {/* ETAPA 2: VERIFICAR CÓDIGO */}
      {currentStep === 'verify' && (
        <form action={verifyAction} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <input type="hidden" name="email" value={email} />
          
          <div className="space-y-4">
            <label htmlFor="code" className="block text-sm font-semibold text-slate-300 mb-2 text-center">
              Código de verificação
            </label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-3xl tracking-[1em] font-mono placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold"
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isVerifyPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verificar Código'}
          </button>

          <button 
            type="button" 
            onClick={() => setCurrentStep('email')} 
            className="w-full text-sm text-slate-500 hover:text-slate-300 transition-colors font-medium"
          >
            Tentar outro e-mail
          </button>
        </form>
      )}

      {/* ETAPA 3: NOVA SENHA */}
      {currentStep === 'reset' && (
        <form action={resetAction} className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
          <input type="hidden" name="email" value={email} />
          
          <PasswordInput
            id="password"
            name="password"
            label="Escolha a nova senha"
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

          {resetState?.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
              {resetState.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isResetPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isResetPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Redefinir e Salvar'}
          </button>
        </form>
      )}
    </div>
  );
}
