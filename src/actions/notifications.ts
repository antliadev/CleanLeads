'use server';

import { prisma } from '@/lib/prisma';
import { getAuthProfile } from './auth';
import { revalidatePath } from 'next/cache';

export async function checkUrgencyState() {
  const profile = await getAuthProfile();
  if (!profile) return null;

  const now = new Date();

  const overdueLeads = await prisma.leadCadenceProgress.findMany({
    where: {
      profileId: profile.id,
      status: 'ACTIVE',
      nextScheduledAt: { lt: now },
      finishedAt: null,
      lead: { status: { not: 'PAUSADO' } },
    },
    select: {
      id: true,
      leadId: true,
      currentStageOrder: true,
      lead: { select: { fullName: true } },
    },
    take: 100,
  });

  if (overdueLeads.length > 0) {
    const leadIds = overdueLeads.map((item) => item.leadId);
    const existingNotifications = await prisma.notification.findMany({
      where: {
        profileId: profile.id,
        leadId: { in: leadIds },
        isRead: false,
        type: 'CADENCE_OVERDUE',
      },
      select: { leadId: true },
    });

    const notifiedLeadIds = new Set(existingNotifications.map((item) => item.leadId).filter(Boolean));
    const notificationsToCreate = overdueLeads
      .filter((item) => !notifiedLeadIds.has(item.leadId))
      .map((item) => ({
        profileId: profile.id,
        leadId: item.leadId,
        title: 'Lead em Atraso',
        message: `O lead ${item.lead.fullName} esta aguardando follow-up ha algum tempo.`,
        type: 'CADENCE_OVERDUE',
        metadata: {
          progressId: item.id,
          stage: item.currentStageOrder,
        },
      }));

    if (notificationsToCreate.length > 0) {
      await prisma.notification.createMany({ data: notificationsToCreate });
    }
  }

  const unreadCount = await prisma.notification.count({
    where: { profileId: profile.id, isRead: false },
  });

  return {
    stateHash: `unread-${unreadCount}`,
    unreadCount,
    hasNewUrgency: unreadCount > 0,
  };
}

export async function getNotifications() {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Nao autorizado');

  return await prisma.notification.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
}

export async function markAsRead(id: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Nao autorizado');

  await prisma.notification.update({
    where: { id, profileId: profile.id },
    data: { isRead: true },
  });

  revalidatePath('/');
  return { success: true };
}

export async function markAllAsRead() {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Nao autorizado');

  await prisma.notification.updateMany({
    where: { profileId: profile.id, isRead: false },
    data: { isRead: true },
  });

  revalidatePath('/');
  return { success: true };
}
