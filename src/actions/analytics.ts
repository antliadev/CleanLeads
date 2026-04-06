'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

async function getAuthProfile() {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Não autenticado');

  // Recupera ou cria o perfil automaticamente
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

export async function getAnalytics() {
  const profile = await getAuthProfile();

  const [
    totalLeads,
    byStatus,
    bySource,
    cadenceStats,
  ] = await Promise.all([
    // Total
    prisma.lead.count({ where: { profileId: profile.id } }),

    // Por status
    prisma.lead.groupBy({
      by: ['status'],
      where: { profileId: profile.id },
      _count: { status: true },
    }),

    // Por origem
    prisma.lead.groupBy({
      by: ['source'],
      where: { profileId: profile.id },
      _count: { source: true },
    }),

    // Estatísticas de Cadência
    prisma.leadCadenceProgress.groupBy({
      by: ['currentStageOrder'],
      where: { profileId: profile.id, status: 'ACTIVE' },
      _count: { currentStageOrder: true },
    }),
  ]);

  return {
    totalLeads,
    byStatus: byStatus.map((s) => ({ status: s.status, count: s._count.status })),
    bySource: bySource.map((s) => ({ source: s.source, count: s._count.source })),
    cadenceStats: cadenceStats.map(s => ({ stage: s.currentStageOrder, count: s._count.currentStageOrder })),
  };
}
