'use client';

import { useActionState, useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BadgeCheck, Loader2, MailCheck, UserPlus, ShieldCheck } from 'lucide-react';
import { 
  requestSignupCode, 
  verifySignupCode, 
  completeSignup, 
  type AuthResult 
} from '@/actions/auth';
import { PasswordInput } from '@/components/ui/PasswordInput';

function RegisterContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const initialStepParam = searchParams.get('step');
  
  // Estados para as 3 ações
  const [requestState, requestAction, isRequestPending] = useActionState<AuthResult | null, FormData>(requestSignupCode, null);
  const [verifyState, verifyAction, isVerifyPending] = useActionState<AuthResult | null, FormData>(verifySignupCode, null);
  const [completeState, completeAction, isCompletePending] = useActionState<AuthResult | null, FormData>(completeSignup, null);

  // Determinar o passo atual
  const [currentStep, setCurrentStep] = useState<'email' | 'verify' | 'complete'>('email');
  const [email, setEmail] = useState(initialEmail);

  // Efeito para sincronizar passos via actions
  useEffect(() => {
    if (requestState?.success && requestState?.step === 'verify_needed') {
      setCurrentStep('verify');
      if (requestState.email) setEmail(requestState.email);
    }
    if (verifyState?.success && verifyState?.step === 'complete_needed') {
      setCurrentStep('complete');
      if (verifyState.email) setEmail(verifyState.email);
    }
    // Caso especial vindo do login: ?step=verify
    if (initialStepParam === 'verify' && initialEmail) {
      setCurrentStep('verify');
      setEmail(initialEmail);
    }
  }, [requestState, verifyState, initialStepParam, initialEmail]);

  const error = requestState?.error || verifyState?.error || completeState?.error;

  return (
    <div className="space-y-8">
      {/* Cabeçalho dinâmico por etapa */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/30 transition-transform active:scale-95">
            {currentStep === 'email' && <BadgeCheck className="w-8 h-8 text-white" />}
            {currentStep === 'verify' && <MailCheck className="w-8 h-8 text-white animate-pulse" />}
            {currentStep === 'complete' && <UserPlus className="w-8 h-8 text-white" />}
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {currentStep === 'email' && 'Criar sua conta'}
          {currentStep === 'verify' && 'Verifique seu e-mail'}
          {currentStep === 'complete' && 'Dados finais'}
        </h1>
        <p className="text-slate-400 mt-2 max-w-xs mx-auto">
          {currentStep === 'email' && 'Enviaremos um código de segurança configurado para seu e-mail.'}
          {currentStep === 'verify' && `Enviamos o código para ${email}. Informe abaixo para continuar.`}
          {currentStep === 'complete' && 'Defina seu nome e senha para acessar a plataforma.'}
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-1 relative">
        {/* Progress Bar (Subtle) */}
        <div className="absolute top-0 left-0 h-1 bg-indigo-500 rounded-full transition-all duration-500 z-10" 
             style={{ width: currentStep === 'email' ? '33.3%' : currentStep === 'verify' ? '66.6%' : '100%' }} 
        />
      </div>

      {/* ETAPA 1: SOLICITAR CÓDIGO */}
      {currentStep === 'email' && (
        <form action={requestAction} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2 font-medium">
              Seu E-mail Profissional
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
              placeholder="seu@email.com"
              defaultValue={email}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isRequestPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {isRequestPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Continuar
                <ShieldCheck className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
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
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-3xl tracking-[1em] font-mono placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold"
              placeholder="000000"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium text-center">
              {error}
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
            Alterar e-mail informado
          </button>
        </form>
      )}

      {/* ETAPA 3: DADOS FINAIS */}
      {currentStep === 'complete' && (
        <form action={completeAction} className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
          <input type="hidden" name="email" value={email} />
          
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

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isCompletePending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isCompletePending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Finalizar e Entrar'}
          </button>
        </form>
      )}

      {currentStep === 'email' && (
        <p className="text-center text-sm text-slate-500">
          Já possui conta?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Fazer login
          </Link>
        </p>
      )}
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
