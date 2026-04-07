'use server';

import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// ═══════════════════════════════════════════
// Schemas de validação
// ═══════════════════════════════════════════
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

const registerStep1Schema = z.object({
  email: z.string().email('E-mail inválido'),
});

const registerStep3Schema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const recoveryStep1Schema = z.object({
  email: z.string().email('E-mail inválido'),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'A nova senha deve ter ao menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// ═══════════════════════════════════════════
// Tipo de retorno padronizado
// ═══════════════════════════════════════════
export type AuthResult = {
  success: boolean;
  error?: string;
  step?: 'verify_needed' | 'complete_needed' | 'recovery_verify_needed' | 'reset_password_needed';
  email?: string;
};

// ═══════════════════════════════════════════
// Login
// ═══════════════════════════════════════════
export async function login(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: 'E-mail ou senha incorretos' };
  }

  redirect('/leads');
}

// ═══════════════════════════════════════════
// Registro Simplificado (Email, Nome e Senha em um passo)
// ═══════════════════════════════════════════
export async function register(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = registerStep3Schema.safeParse(raw); // Usando o esquema de dados finais (nome, senha)
  const emailParsed = registerStep1Schema.safeParse(raw); // Usando o esquema de e-mail

  if (!emailParsed.success) {
    return { success: false, error: emailParsed.error.issues[0].message };
  }

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabase();

  // Realiza o cadastro completo diretamente
  const { data, error } = await supabase.auth.signUp({
    email: emailParsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.name,
      }
    }
  });

  if (error) {
    return { success: false, error: 'Erro ao realizar cadastro: ' + error.message };
  }

  // Se o usuário foi criado e a sessão iniciada (configuração do Supabase permite autologin)
  if (data.session) {
    // Sincroniza com o perfil no Prisma antes de redirecionar
    await getAuthProfile();
    redirect('/leads');
  }

  // Caso precise confirmar e-mail (depende da config do Supabase Dashboard)
  return { 
    success: true, 
    error: data.user && !data.session ? 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.' : undefined 
  };
}

// ═══════════════════════════════════════════
// Recuperação - Etapa 1 (Solicitar Código)
// ═══════════════════════════════════════════
export async function requestRecoveryCode(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const parsed = recoveryStep1Schema.safeParse({ email });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email);

  if (error) {
    // Por segurança, não confirmamos se o e-mail existe, 
    // mas o Supabase costuma retornar sucesso mesmo se não existir dependendo da config.
    return { success: false, error: 'Erro ao processar solicitação. Tente novamente.' };
  }

  return { success: true, step: 'recovery_verify_needed', email: parsed.data.email };
}

// ═══════════════════════════════════════════
// Recuperação - Etapa 2 (Validar Código)
// ═══════════════════════════════════════════
export async function verifyRecoveryCode(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const code = formData.get('code') as string;

  if (!email || !code || code.length < 6) {
    return { success: false, error: 'Código inválido', step: 'recovery_verify_needed', email };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'recovery' // Tipo específico para recuperação de senha
  });

  if (error) {
    return { success: false, error: 'Código incorreto ou expirado.', step: 'recovery_verify_needed', email };
  }

  return { success: true, step: 'reset_password_needed', email };
}

// ═══════════════════════════════════════════
// Recuperação - Etapa 3 (Nova Senha)
// ═══════════════════════════════════════════
export async function resetPassword(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = resetPasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message, step: 'reset_password_needed' };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password
  });

  if (error) {
    return { success: false, error: 'Erro ao redefinir senha. Tente novamente.', step: 'reset_password_needed' };
  }

  redirect('/login');
}

// ═══════════════════════════════════════════
// Outras Ações
// ═══════════════════════════════════════════
export async function logout() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function getAuthProfile() {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Não autenticado');

  const profile = await prisma.profile.upsert({
    where: { authUid: user.id },
    update: {},
    create: {
      authUid: user.id,
      email: user.email!,
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário',
    },
  });

  return profile;
}
