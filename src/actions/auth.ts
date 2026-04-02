'use server';

import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

// ═══════════════════════════════════════════
// Schemas de validação
// ═══════════════════════════════════════════
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

// ═══════════════════════════════════════════
// Tipo de retorno padronizado
// ═══════════════════════════════════════════
export type AuthResult = {
  success: boolean;
  error?: string;
  step?: 'code_needed';
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
    if (error.message.includes('Email not confirmed')) {
      return { success: false, error: 'O cadastro não foi finalizado. Seu e-mail ainda não foi confirmado.' };
    }
    return { success: false, error: 'E-mail ou senha incorretos' };
  }

  redirect('/leads');
}

// ═══════════════════════════════════════════
// Registro
// ═══════════════════════════════════════════
export async function register(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        name: parsed.data.name,
      },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { success: false, error: 'Este e-mail já está cadastrado' };
    }
    return { success: false, error: 'Erro ao criar conta. Tente novamente.' };
  }

  // Não redirecionamos mais, devolvemos step = 'code_needed' para o usuário digitar na tela
  return { success: true, step: 'code_needed', email: parsed.data.email };
}

// ═══════════════════════════════════════════
// Verificar Código (OTP Signup)
// ═══════════════════════════════════════════
export async function verifySignupCode(_prevState: AuthResult | null, formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const code = formData.get('code') as string;
  
  if (!email || !code || code.length < 6) {
    return { success: false, error: 'O código deve ter 6 dígitos', step: 'code_needed', email };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'signup' // Verifica o token de signup
  });

  if (error) {
    return { success: false, error: 'Código incorreto ou expirado. Tente novamente.', step: 'code_needed', email };
  }

  // Se verificado com sucesso, a sessão já foi logada e armazenada pelo Supabase Middleware
  redirect('/leads');
}

// ═══════════════════════════════════════════
// Logout
// ═══════════════════════════════════════════
export async function logout() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect('/login');
}

// ═══════════════════════════════════════════
// Helper: getAuthProfile
// ═══════════════════════════════════════════
import { prisma } from '@/lib/prisma';

export async function getAuthProfile() {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Não autenticado');

  // Recupera ou cria o perfil automaticamente
  const profile = await prisma.profile.upsert({
    where: { authUid: user.id },
    update: {},
    create: {
      authUid: user.id,
      email: user.email!, // Supabase garante email se configurado
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário',
    },
  });

  return profile;
}
