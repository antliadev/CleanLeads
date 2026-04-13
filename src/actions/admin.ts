'use server';

import { createAdminSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const forceResetPasswordSchema = z.object({
  secretKey: z.string().min(1, 'A chave secreta é obrigatória'),
  email: z.string().email('E-mail inválido'),
  newPassword: z.string().min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
});

export type AdminActionResponse = {
  success: boolean;
  message: string;
};

export async function forceResetPasswordForEmail(
  _prevState: AdminActionResponse | null,
  formData: FormData
): Promise<AdminActionResponse> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = forceResetPasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const { secretKey, email, newPassword } = parsed.data;

  // 1. Validar a Chave Secreta definida via Variável de Ambiente
  // Se a chave não estiver configurada no .env.local, bloqueia a execução por segurança.
  const appAdminKey = process.env.ADMIN_SECRET_KEY;
  if (!appAdminKey || secretKey !== appAdminKey) {
    // Retorno genérico de erro para não vazar a existência do email
    return { success: false, message: 'Chave Administrativa inválida ou não configurada.' };
  }

  try {
    const supabaseAdmin = createAdminSupabase();

    // 2. Localizar o ID do usuário através do Admin API (baseado no e-mail)
    // O Supabase Admin API tem uma rota especial listUsers, mas a forma mais robusta
    // é através do Prisma que espelha o nosso auth.users em public.profiles
    const profile = await prisma.profile.findUnique({
      where: { email },
    });

    let targetUserId = profile?.authUid;

    // Fallback: buscar o UUID diretamente do Supabase listUsers (útil se o profile Prisma estiver corrompido)
    if (!targetUserId) {
      const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) {
        throw new Error('Falha ao listar usuários no Supabase: ' + listError.message);
      }
      const u = usersData.users.find((user) => user.email === email);
      if (u) {
        targetUserId = u.id;
      }
    }

    if (!targetUserId) {
      return { success: false, message: 'Usuário não encontrado com este e-mail.' };
    }

    // 3. Execução Forçada de Update (Bypass Total de Verificação Assíncrona)
    const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      targetUserId,
      {
        password: newPassword,
        email_confirm: true, // Já marcamos como confirmado caso tenha sido criado desativado
      }
    );

    if (updateError) {
      return { success: false, message: `Erro ao Forçar Redefinição: ${updateError.message}` };
    }

    return { 
      success: true, 
      message: `Senha redefinida com sucesso para o usuário ${email}. Você já pode logar.` 
    };

  } catch (err: any) {
    return { success: false, message: err.message || 'Ocorreu um erro interno crítico.' };
  }
}
