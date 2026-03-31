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
