'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

async function getAuthProfile() {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Não autenticado');

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
    activeLeads,
    pausedLeads,
    convertedLeads,
    awaitingReturnLeads,
    contactedLeads,
    // Buscar estágios reais da cadência
    cadenceStages,
  ] = await Promise.all([
    // Total de leads
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

    // Estatísticas de Cadência (leads ativos por estágio)
    prisma.leadCadenceProgress.groupBy({
      by: ['currentStageOrder'],
      where: { profileId: profile.id, status: 'ACTIVE' },
      _count: { currentStageOrder: true },
    }),

    // Leads Ativos (Exclui Convertidos, Perdidos e Pausados)
    prisma.lead.count({ 
      where: { 
        profileId: profile.id,
        status: { notIn: ['CONVERTIDO', 'PERDIDO', 'PAUSADO'] }
      } 
    }),

    // Leads Pausados
    prisma.lead.count({ 
      where: { profileId: profile.id, status: 'PAUSADO' }
    }),

    // Leads Convertidos
    prisma.lead.count({ 
      where: { profileId: profile.id, status: 'CONVERTIDO' }
    }),

    // Leads Aguardando Retorno
    prisma.lead.count({ 
      where: { profileId: profile.id, status: 'AGUARDANDO_RETORNO' }
    }),

    // Leads em Contato
    prisma.lead.count({ 
      where: { profileId: profile.id, status: 'CONTATADO' }
    }),

    // Estágios reais da cadência (para gráficos dinâmicos)
    prisma.cadenceStage.findMany({
      where: {
        cadence: {
          profileId: profile.id,
          isActive: true,
        }
      },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        order: true,
        channel: true,
        delayDays: true,
      }
    }),
  ]);

  // Calcular total em cadência (ativos + pausados)
  const totalInCadence = activeLeads + pausedLeads;

  return {
    totalLeads,
    activeLeads,
    pausedLeads,
    convertedLeads,
    awaitingReturnLeads,
    contactedLeads,
    totalInCadence,
    byStatus: byStatus.map((s: any) => ({ status: s.status, count: s._count.status })),
    bySource: bySource.map((s: any) => ({ source: s.source, count: s._count.source })),
    cadenceStats: cadenceStats.map((s: any) => ({ stage: s.currentStageOrder, count: s._count.currentStageOrder })),
    // Estágios dinâmicos do banco
    stages: cadenceStages.map((s: any) => ({
      order: s.order,
      channel: s.channel,
      delayDays: s.delayDays,
    })),
  };
}
