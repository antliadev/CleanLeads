'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import type { LeadStatus, LeadSource } from '@prisma/client';

// ═══════════════════════
// Schemas
// ═══════════════════════
const leadSchema = z.object({
  fullName: z.string().min(2, 'Nome obrigatório (mínimo 2 caracteres)'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedinUrl: z.string().url('URL LinkedIn inválida').optional().or(z.literal('')),
  whatsappUrl: z.string().url('URL WhatsApp inválida').optional().or(z.literal('')),
  status: z.enum(['NOVO', 'CONTATADO', 'EM_NEGOCIACAO', 'CONVERTIDO', 'PERDIDO']).default('NOVO'),
  notes: z.string().optional(),
});

export type LeadFormResult = { success: boolean; error?: string };

// ═══════════════════════
// Helper: obter profile do usuário autenticado
// ═══════════════════════
async function getAuthProfile() {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Não autenticado');

  const profile = await prisma.profile.findUnique({ where: { authUid: user.id } });
  if (!profile) throw new Error('Perfil não encontrado');
  return profile;
}

// ═══════════════════════
// Listar leads com filtros
// ═══════════════════════
export async function getLeads({
  page = 1,
  search = '',
  status = '',
}: {
  page?: number;
  search?: string;
  status?: string;
} = {}) {
  const profile = await getAuthProfile();
  const take = DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * take;

  const where = {
    profileId: profile.id,
    ...(search && {
      OR: [
        { fullName: { contains: search, mode: 'insensitive' as const } },
        { company: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...(status && { status: status as LeadStatus }),
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        histories: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    }),
    prisma.lead.count({ where }),
  ]);

  return { leads, total, page, totalPages: Math.ceil(total / take) };
}

// ═══════════════════════
// Buscar lead por ID
// ═══════════════════════
export async function getLeadById(id: string) {
  const profile = await getAuthProfile();
  const lead = await prisma.lead.findFirst({
    where: { id, profileId: profile.id },
  });
  if (!lead) throw new Error('Lead não encontrado');
  return lead;
}

// ═══════════════════════
// Criar lead
// ═══════════════════════
export async function createLead(
  _prev: LeadFormResult | null,
  formData: FormData
): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    const raw = Object.fromEntries(formData.entries());
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    // Limpar campos vazios opcionais
    const data: any = Object.fromEntries(
      Object.entries(parsed.data).filter(([, v]) => v !== '' && v !== undefined)
    );

    await prisma.lead.create({
      data: { ...data, profileId: profile.id, source: 'MANUAL' as LeadSource },
    });

    revalidatePath('/leads');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao criar lead' };
  }
}

// ═══════════════════════
// Atualizar lead
// ═══════════════════════
export async function updateLead(
  id: string,
  _prev: LeadFormResult | null,
  formData: FormData
): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    const raw = Object.fromEntries(formData.entries());
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const data: any = Object.fromEntries(
      Object.entries(parsed.data).filter(([, v]) => v !== '' && v !== undefined)
    );

    await prisma.lead.updateMany({
      where: { id, profileId: profile.id },
      data,
    });

    revalidatePath('/leads');
    revalidatePath(`/leads/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar lead' };
  }
}

// ═══════════════════════
// Atualizar status do lead
// ═══════════════════════
export async function updateLeadStatus(id: string, status: LeadStatus): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    await prisma.lead.updateMany({
      where: { id, profileId: profile.id },
      data: { status },
    });
    revalidatePath('/leads');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar status' };
  }
}

// ═══════════════════════
// Excluir lead
// ═══════════════════════
export async function deleteLead(id: string): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    await prisma.lead.deleteMany({ where: { id, profileId: profile.id } });
    revalidatePath('/leads');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao excluir lead' };
  }
}
