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
// Registro - Etapa 1 (Email -> Enviar Código)
// ═══════════════════════════════════════════
export async function requestSignupCode(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const parsed = registerStep1Schema.safeParse({ email });
  
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabase();
  
  // Usamos signInWithOtp para enviar o código. 
  // No Supabase, isso cria um usuário "provisório" se ele não existir.
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      shouldCreateUser: true,
    }
  });

  if (error) {
    return { success: false, error: 'Erro ao enviar código. Tente novamente em instantes.' };
  }

  return { success: true, step: 'verify_needed', email: parsed.data.email };
}

// ═══════════════════════════════════════════
// Registro - Etapa 2 (Validar Código)
// ═══════════════════════════════════════════
export async function verifySignupCode(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const code = formData.get('code') as string;
  
  if (!email || !code || code.length < 6) {
    return { success: false, error: 'O código deve ter 6 dígitos', step: 'verify_needed', email };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'email' // OTP enviado via signInWithOtp usa tipo 'email' ou 'magiclink'
  });

  if (error) {
    return { success: false, error: 'Código incorreto ou expirado.', step: 'verify_needed', email };
  }

  // Se verificado, o usuário está logado temporariamente. Vamos para a etapa de completar cadastro.
  return { success: true, step: 'complete_needed', email };
}

// ═══════════════════════════════════════════
// Registro - Etapa 3 (Nome e Senha)
// ═══════════════════════════════════════════
export async function completeSignup(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = registerStep3Schema.safeParse(raw);
  
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message, step: 'complete_needed' };
  }

  const supabase = await createServerSupabase();
  
  // Atualiza os metadados (nome) e define a senha permanente
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
    data: {
      full_name: parsed.data.name,
    }
  });

  if (error) {
    return { success: false, error: 'Erro ao finalizar cadastro: ' + error.message, step: 'complete_needed' };
  }

  // Sincroniza com o perfil no Prisma antes de redirecionar
  await getAuthProfile();

  redirect('/leads');
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
