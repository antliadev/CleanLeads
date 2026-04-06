'use server';

import { prisma } from '@/lib/prisma';
import { getAuthProfile } from './auth';
import { revalidatePath } from 'next/cache';

/**
 * CHECAGEM DE URGÊNCIA E SINCRONIZAÇÃO DE NOTIFICAÇÕES
 * Persiste leads vencidos como notificações no banco se ainda não existirem.
 */
export async function checkUrgencyState() {
  const profile = await getAuthProfile();
  if (!profile) return null;

  const now = new Date();

  // 1. Busca leads vencidos que ainda não geraram notificação recente
  const overdueLeads = await prisma.leadCadenceProgress.findMany({
    where: {
      profileId: profile.id,
      status: 'ACTIVE',
      nextScheduledAt: { lt: now },
      finishedAt: null
    },
    include: { lead: true }
  });

  // 2. Persiste notificações para cada lead vencido (se não houver uma não lida para ele)
  for (const item of overdueLeads) {
    const existing = await prisma.notification.findFirst({
      where: {
        profileId: profile.id,
        leadId: item.leadId,
        isRead: false,
        type: 'CADENCE_OVERDUE'
      }
    });

    if (!existing) {
      await prisma.notification.create({
        data: {
          profileId: profile.id,
          leadId: item.leadId,
          title: 'Lead em Atraso',
          message: `O lead ${item.lead.fullName} está aguardando follow-up há algum tempo.`,
          type: 'CADENCE_OVERDUE',
          metadata: {
            progressId: item.id,
            stage: item.currentStageOrder
          }
        }
      });
    }
  }

  // 3. Conta notificações não lidas
  const unreadCount = await prisma.notification.count({
    where: { profileId: profile.id, isRead: false }
  });

  const stateHash = `unread-${unreadCount}`;

  return {
    stateHash,
    unreadCount,
    hasNewUrgency: unreadCount > 0
  };
}

/**
 * BUSCA NOTIFICAÇÕES PERSISTENTES
 */
export async function getNotifications() {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  return await prisma.notification.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: 'desc' },
    take: 20
  });
}

/**
 * MARCA NOTIFICAÇÃO COMO LIDA
 */
export async function markAsRead(id: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  await prisma.notification.update({
    where: { id, profileId: profile.id },
    data: { isRead: true }
  });

  revalidatePath('/');
  return { success: true };
}

/**
 * MARCA TODAS COMO LIDAS
 */
export async function markAllAsRead() {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  await prisma.notification.updateMany({
    where: { profileId: profile.id, isRead: false },
    data: { isRead: true }
  });

  revalidatePath('/');
  return { success: true };
}

