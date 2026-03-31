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
    recentLeads,
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

    // Leads dos últimos 30 dias (agrupados por dia para o gráfico)
    prisma.lead.findMany({
      where: {
        profileId: profile.id,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  // Agrupar leads por dia
  const dayMap: Record<string, number> = {};
  for (const lead of recentLeads) {
    const day = lead.createdAt.toISOString().split('T')[0];
    dayMap[day] = (dayMap[day] || 0) + 1;
  }
  const leadsByDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

  return {
    totalLeads,
    byStatus: byStatus.map((s) => ({ status: s.status, count: s._count.status })),
    bySource: bySource.map((s) => ({ source: s.source, count: s._count.source })),
    leadsByDay,
  };
}
