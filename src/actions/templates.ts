'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import type { TemplateChannel } from '@prisma/client';

// ═══════════════════════
// Schema
// ═══════════════════════
const templateSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório (mínimo 2 caracteres)'),
  channel: z.enum(['EMAIL', 'LINKEDIN']),
  subject: z.string().optional(),
  body: z.string().min(10, 'Corpo da mensagem muito curto'),
  isActive: z.string().optional().transform((v) => v === 'true' || v === 'on'),
});

export type TemplateFormResult = { success: boolean; error?: string };

// Helper
async function getAuthProfile() {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Não autenticado');
  const profile = await prisma.profile.findUnique({ where: { authUid: user.id } });
  if (!profile) throw new Error('Perfil não encontrado');
  return profile;
}

// ═══════════════════════
// Listar templates
// ═══════════════════════
export async function getTemplates(channel?: TemplateChannel) {
  const profile = await getAuthProfile();
  return prisma.template.findMany({
    where: {
      profileId: profile.id,
      ...(channel && { channel }),
    },
    orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
  });
}

// ═══════════════════════
// Criar template
// ═══════════════════════
export async function createTemplate(
  _prev: TemplateFormResult | null,
  formData: FormData
): Promise<TemplateFormResult> {
  try {
    const profile = await getAuthProfile();
    const raw = Object.fromEntries(formData.entries());
    const parsed = templateSchema.safeParse(raw);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await prisma.template.create({
      data: {
        ...parsed.data,
        profileId: profile.id,
      },
    });

    revalidatePath('/templates');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao criar template' };
  }
}

// ═══════════════════════
// Atualizar template
// ═══════════════════════
export async function updateTemplate(
  id: string,
  _prev: TemplateFormResult | null,
  formData: FormData
): Promise<TemplateFormResult> {
  try {
    const profile = await getAuthProfile();
    const raw = Object.fromEntries(formData.entries());
    const parsed = templateSchema.safeParse(raw);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await prisma.template.updateMany({
      where: { id, profileId: profile.id },
      data: parsed.data,
    });

    revalidatePath('/templates');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar template' };
  }
}

// ═══════════════════════
// Excluir template
// ═══════════════════════
export async function deleteTemplate(id: string): Promise<TemplateFormResult> {
  try {
    const profile = await getAuthProfile();
    await prisma.template.deleteMany({ where: { id, profileId: profile.id } });
    revalidatePath('/templates');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao excluir template' };
  }
}

// ═══════════════════════
// Assistente de Escrita
// ═══════════════════════
export async function improveTemplateText(text: string): Promise<string> {
  if (!text) return '';

  let improved = text;

  // 1. Dicionário de correções comuns (accentuation e typos frequentes)
  const corrections: Record<string, string> = {
    'voce': 'você',
    'Voce': 'Você',
    'ola': 'olá',
    'Ola': 'Olá',
    'esta': 'está',
    'Esta': 'Está',
    'estao': 'estão',
    'Estao': 'Estão',
    'e-mail': 'e-mail',
    'email': 'e-mail',
    'atencao': 'atenção',
    'Atencao': 'Atenção',
    'porem': 'porém',
    'Porem': 'Porém',
    'entao': 'então',
    'Entao': 'Então',
    'parabens': 'parabéns',
    'Parabens': 'Parabéns',
    'duvida': 'dúvida',
    'Duvida': 'Dúvida',
    'conectar': 'conectar',
    'obrigado': 'obrigado',
    'disposicao': 'disposição',
    'Disposicao': 'Disposição',
    'abraco': 'abraço',
    'Abraco': 'Abraço',
  };

  // Aplica correções do dicionário (apenas palavras inteiras)
  Object.entries(corrections).forEach(([wrong, right]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, 'g');
    improved = improved.replace(regex, right);
  });

  return improved
    // 2. Remove espaços duplos
    .replace(/\s{2,}/g, ' ')
    // 3. Garante espaço após pontuação (vírgula, ponto, exclamação, interrogação)
    // Evita quebrar as variáveis {{...}}
    .replace(/([,.;!?])([^\s{}])/g, '$1 $2')
    // 4. Remove espaços antes da pontuação
    .replace(/\s+([,.;!?])/g, '$1')
    // 5. Capitaliza a primeira letra de cada frase
    .replace(/(^|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
    // 6. Garante que variáveis {{...}} não tenham espaços internos inadequados
    .replace(/{ \s* {/g, '{{')
    .replace(/} \s* }/g, '}}')
    // 7. Trim final
    .trim();
}

