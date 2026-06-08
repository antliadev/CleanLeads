'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getAuthProfile } from './auth';
import { formatNextActionDisplay } from '@/lib/utils';
import type {
  ManualAgendaItem,
  ManualActionType,
  ManualActionChannel,
  ManualActionStatus,
  AgendaCounts,
} from '@/types/agenda';

// ═══════════════════════════════════════════════════════════
// Helpers de Timezone (mesma lógica do getAgendaCounts)
// ═══════════════════════════════════════════════════════════

function getBrasiliaDateBounds(): {
  startOfTodayUtc: Date;
  endOfTodayUtc: Date;
} {
  const now = new Date();
  const brasiliaOffset = -3 * 60; // -180 minutos
  const localOffset = now.getTimezoneOffset();
  const diff = brasiliaOffset - localOffset;

  const brasiliaNow = new Date(now.getTime() + diff * 60 * 1000);

  const startOfToday = new Date(
    brasiliaNow.getFullYear(),
    brasiliaNow.getMonth(),
    brasiliaNow.getDate(),
    0, 0, 0, 0
  );

  const endOfToday = new Date(
    brasiliaNow.getFullYear(),
    brasiliaNow.getMonth(),
    brasiliaNow.getDate(),
    23, 59, 59, 999
  );

  return {
    startOfTodayUtc: new Date(startOfToday.getTime() - diff * 60 * 1000),
    endOfTodayUtc: new Date(endOfToday.getTime() - diff * 60 * 1000),
  };
}

/**
 * Normaliza um item de LeadScheduledAction para o formato ManualAgendaItem
 * compatível com a AgendaList.
 */
function normalizeManualAction(entry: any): ManualAgendaItem {
  const now = new Date();
  const scheduledAt = new Date(entry.scheduledAt);
  const isOverdue = scheduledAt < now;
  const fourHoursMs = 4 * 60 * 60 * 1000;

  const displayFields = formatNextActionDisplay(scheduledAt);

  return {
    type: 'MANUAL',
    id: entry.id,
    sortDate: scheduledAt,
    lead: {
      id: entry.lead.id,
      fullName: entry.lead.fullName,
      company: entry.lead.company ?? null,
      jobTitle: entry.lead.jobTitle ?? null,
      email: entry.lead.email ?? null,
      phone: entry.lead.phone ?? null,
      linkedinUrl: entry.lead.linkedinUrl ?? null,
      whatsappUrl: entry.lead.whatsappUrl ?? null,
    },
    title: entry.title,
    actionType: entry.actionType as ManualActionType,
    channel: (entry.channel ?? null) as ManualActionChannel | null,
    notes: entry.notes ?? null,
    scheduledAt,
    status: entry.status as ManualActionStatus,
    createdByOperatorId: entry.createdByOperatorId ?? null,
    createdByOperatorName: entry.createdByOperator?.name ?? null,
    isOverdue,
    isExtremeUrgent:
      isOverdue &&
      now.getTime() - scheduledAt.getTime() > fourHoursMs,
    nextActionPrimary: displayFields.primary,
    nextActionSecondary: displayFields.secondary,
    nextActionTime: displayFields.time,
    nextActionIsToday: displayFields.isToday,
    nextActionIsTomorrow: displayFields.isTomorrow,
    timeDisplay: displayFields.primary,
  };
}

// ═══════════════════════════════════════════════════════════
// Schema Zod de validação
// ═══════════════════════════════════════════════════════════

const createManualActionSchema = z.object({
  leadId: z.string().min(1, 'Lead obrigatório'),
  title: z.string().min(2, 'Título deve ter ao menos 2 caracteres').max(200),
  actionType: z.enum(['LIGACAO', 'REUNIAO', 'EMAIL', 'WHATSAPP', 'LINKEDIN', 'TAREFA']),
  channel: z.enum(['EMAIL', 'LINKEDIN', 'WHATSAPP', 'TELEFONE', 'PRESENCIAL', 'OUTRO']).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
  scheduledAt: z.coerce.date().refine((d) => !isNaN(d.getTime()), { message: 'Data/hora obrigatória' }),
  createdByOperatorId: z.string().optional().nullable(),
});

const updateManualActionSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  channel: z.enum(['EMAIL', 'LINKEDIN', 'WHATSAPP', 'TELEFONE', 'PRESENCIAL', 'OUTRO']).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
  scheduledAt: z.coerce.date().optional(),
  actionType: z.enum(['LIGACAO', 'REUNIAO', 'EMAIL', 'WHATSAPP', 'LINKEDIN', 'TAREFA']).optional(),
});

// ═══════════════════════════════════════════════════════════
// CRIAR Ação Manual
// ═══════════════════════════════════════════════════════════

/**
 * Cria uma ação manual agendada para um lead específico.
 * Não toca em LeadCadenceProgress.
 */
export async function createManualAction(
  input: z.infer<typeof createManualActionSchema>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const profile = await getAuthProfile();
    if (!profile) return { success: false, error: 'Não autorizado' };

    const parsed = createManualActionSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const data = parsed.data;

    // Garante que o lead pertence ao perfil
    const lead = await prisma.lead.findFirst({
      where: { id: data.leadId, profileId: profile.id },
    });
    if (!lead) return { success: false, error: 'Lead não encontrado' };

    const action = await prisma.$transaction(async (tx) => {
      const created = await tx.leadScheduledAction.create({
        data: {
          profileId: profile.id,
          leadId: data.leadId,
          title: data.title.trim(),
          actionType: data.actionType,
          channel: data.channel ?? null,
          notes: data.notes?.trim() ?? null,
          scheduledAt: data.scheduledAt,
          status: 'PENDING',
          createdByOperatorId: data.createdByOperatorId ?? null,
        },
      });

      // Auditoria no histórico de notas do lead
      await tx.leadNote.create({
        data: {
          leadId: data.leadId,
          operatorId: data.createdByOperatorId ?? null,
          content: `[AÇÃO MANUAL] Agendada: "${data.title}" para ${new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(data.scheduledAt)}`,
        },
      });

      return created;
    });

    revalidatePath('/agenda');
    revalidatePath('/leads');
    return { success: true, id: action.id };
  } catch (error: any) {
    console.error('createManualAction error:', error);
    return { success: false, error: error.message || 'Erro ao criar ação manual' };
  }
}

// ═══════════════════════════════════════════════════════════
// LISTAR Ações Manuais (agenda)
// ═══════════════════════════════════════════════════════════

/**
 * Retorna as ações manuais PENDING do perfil, normalizadas para o formato
 * ManualAgendaItem. Compatível com a AgendaList.
 *
 * O filtro de estágio (stageFilter) é ignorado para ações manuais —
 * ações manuais não têm estágio de cadência associado.
 * O filtro de operador filtra pelo operador que CRIOU a ação.
 */
export async function getManualActions({
  operatorId,
  take = 50,
  skip = 0,
}: {
  operatorId?: string;
  take?: number;
  skip?: number;
} = {}): Promise<{ actions: ManualAgendaItem[]; totalPending: number }> {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  const whereBase = {
    profileId: profile.id,
    status: 'PENDING' as const,
    ...(operatorId && { createdByOperatorId: operatorId }),
  };

  const [entries, totalPending] = await Promise.all([
    prisma.leadScheduledAction.findMany({
      where: whereBase,
      take,
      skip,
      orderBy: [{ scheduledAt: 'asc' }],
      include: {
        lead: {
          select: {
            id: true,
            fullName: true,
            company: true,
            jobTitle: true,
            email: true,
            phone: true,
            linkedinUrl: true,
            whatsappUrl: true,
          },
        },
        createdByOperator: { select: { name: true } },
      },
    }),
    prisma.leadScheduledAction.count({ where: whereBase }),
  ]);

  const actions = entries.map(normalizeManualAction);
  return { actions, totalPending };
}

// ═══════════════════════════════════════════════════════════
// CONTAGENS de Ações Manuais (para os cards da agenda)
// ═══════════════════════════════════════════════════════════

/**
 * Retorna contagens de ações manuais PENDING, usando o mesmo fuso
 * America/Sao_Paulo do getAgendaCounts de cadência.
 */
export async function getManualActionCounts({
  operatorId,
}: { operatorId?: string } = {}): Promise<AgendaCounts> {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  const { startOfTodayUtc, endOfTodayUtc } = getBrasiliaDateBounds();

  const whereBase = {
    profileId: profile.id,
    status: 'PENDING' as const,
    ...(operatorId && { createdByOperatorId: operatorId }),
  };

  const [todayCount, overdueCount, totalPending] = await Promise.all([
    prisma.leadScheduledAction.count({
      where: {
        ...whereBase,
        scheduledAt: { lte: endOfTodayUtc },
      },
    }),
    prisma.leadScheduledAction.count({
      where: {
        ...whereBase,
        scheduledAt: { lt: startOfTodayUtc },
      },
    }),
    prisma.leadScheduledAction.count({ where: whereBase }),
  ]);

  return { todayCount, overdueCount, totalPending };
}

// ═══════════════════════════════════════════════════════════
// CONCLUIR Ação Manual
// ═══════════════════════════════════════════════════════════

/**
 * Marca a ação manual como DONE.
 * Registra nota no histórico do lead.
 * NÃO avança a cadência automática.
 */
export async function completeManualAction(
  actionId: string,
  operatorId: string,
  completionNotes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const profile = await getAuthProfile();
    if (!profile) return { success: false, error: 'Não autorizado' };

    await prisma.$transaction(async (tx) => {
      const action = await tx.leadScheduledAction.findFirst({
        where: { id: actionId, profileId: profile.id },
      });

      if (!action) throw new Error('Ação não encontrada');
      if (action.status !== 'PENDING') {
        throw new Error('Esta ação já foi concluída ou cancelada');
      }

      await tx.leadScheduledAction.update({
        where: { id: actionId },
        data: {
          status: 'DONE',
          completedAt: new Date(),
          completedByOperatorId: operatorId,
          completionNotes: completionNotes?.trim() ?? null,
        },
      });

      // Auditoria
      await tx.leadNote.create({
        data: {
          leadId: action.leadId,
          operatorId,
          content: `[AÇÃO MANUAL CONCLUÍDA] "${action.title}"${completionNotes ? `\nNota: ${completionNotes.trim()}` : ''}`,
        },
      });
    });

    revalidatePath('/agenda');
    revalidatePath('/leads');
    return { success: true };
  } catch (error: any) {
    console.error('completeManualAction error:', error);
    return { success: false, error: error.message || 'Erro ao concluir ação' };
  }
}

// ═══════════════════════════════════════════════════════════
// CANCELAR Ação Manual
// ═══════════════════════════════════════════════════════════

/**
 * Marca a ação manual como CANCELED.
 * A ação sai da fila pendente.
 */
export async function cancelManualAction(
  actionId: string,
  operatorId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const profile = await getAuthProfile();
    if (!profile) return { success: false, error: 'Não autorizado' };

    await prisma.$transaction(async (tx) => {
      const action = await tx.leadScheduledAction.findFirst({
        where: { id: actionId, profileId: profile.id },
      });

      if (!action) throw new Error('Ação não encontrada');
      if (action.status !== 'PENDING') {
        throw new Error('Esta ação já foi concluída ou cancelada');
      }

      await tx.leadScheduledAction.update({
        where: { id: actionId },
        data: {
          status: 'CANCELED',
          completedByOperatorId: operatorId,
          completionNotes: reason?.trim() ?? 'Cancelada pelo operador',
        },
      });

      // Auditoria
      await tx.leadNote.create({
        data: {
          leadId: action.leadId,
          operatorId,
          content: `[AÇÃO MANUAL CANCELADA] "${action.title}"${reason ? `\nMotivo: ${reason.trim()}` : ''}`,
        },
      });
    });

    revalidatePath('/agenda');
    revalidatePath('/leads');
    return { success: true };
  } catch (error: any) {
    console.error('cancelManualAction error:', error);
    return { success: false, error: error.message || 'Erro ao cancelar ação' };
  }
}

// ═══════════════════════════════════════════════════════════
// EDITAR Ação Manual (reagendamento)
// ═══════════════════════════════════════════════════════════

/**
 * Edita data/hora, título, canal ou observação de uma ação manual PENDING.
 */
export async function updateManualAction(
  actionId: string,
  input: z.infer<typeof updateManualActionSchema>,
  operatorId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const profile = await getAuthProfile();
    if (!profile) return { success: false, error: 'Não autorizado' };

    const parsed = updateManualActionSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const action = await prisma.leadScheduledAction.findFirst({
      where: { id: actionId, profileId: profile.id },
    });

    if (!action) return { success: false, error: 'Ação não encontrada' };
    if (action.status !== 'PENDING') {
      return { success: false, error: 'Só é possível editar ações pendentes' };
    }

    const data = parsed.data;

    await prisma.$transaction(async (tx) => {
      await tx.leadScheduledAction.update({
        where: { id: actionId },
        data: {
          ...(data.title !== undefined && { title: data.title.trim() }),
          ...(data.actionType !== undefined && { actionType: data.actionType }),
          ...(data.channel !== undefined && { channel: data.channel }),
          ...(data.notes !== undefined && { notes: data.notes?.trim() ?? null }),
          ...(data.scheduledAt !== undefined && { scheduledAt: data.scheduledAt }),
        },
      });

      // Auditoria
      if (operatorId) {
        await tx.leadNote.create({
          data: {
            leadId: action.leadId,
            operatorId,
            content: `[AÇÃO MANUAL EDITADA] "${data.title ?? action.title}"${
              data.scheduledAt
                ? ` — Reagendada para ${new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  }).format(data.scheduledAt)}`
                : ''
            }`,
          },
        });
      }
    });

    revalidatePath('/agenda');
    return { success: true };
  } catch (error: any) {
    console.error('updateManualAction error:', error);
    return { success: false, error: error.message || 'Erro ao editar ação' };
  }
}

// ═══════════════════════════════════════════════════════════
// LEADS disponíveis para seleção ao criar ação manual
// ═══════════════════════════════════════════════════════════

/**
 * Retorna a lista de leads do perfil para popular o seletor no modal.
 * Retorna apenas campos necessários para evitar overfetch.
 */
export async function getLeadsForActionSelect(search?: string): Promise<
  Array<{ id: string; fullName: string; company: string | null }>
> {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  const term = search?.trim();
  if (!term) return [];

  return prisma.lead.findMany({
    where: {
      profileId: profile.id,
      OR: [
        { fullName: { contains: term, mode: 'insensitive' } },
        { company: { contains: term, mode: 'insensitive' } },
      ],
    },
    select: { id: true, fullName: true, company: true },
    orderBy: { fullName: 'asc' },
    take: 25,
  });
}
