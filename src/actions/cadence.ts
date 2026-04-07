'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CadenceStatus, TemplateChannel } from '../generated/client';
import { getAuthProfile } from './auth';

/**
 * TRAVA LEAD: Reserva o lead para um operador por 5 minutos
 */
export async function lockLead(progressId: string, operatorName: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  return await prisma.leadCadenceProgress.update({
    where: { id: progressId },
    data: {
      lockedAt: new Date(),
      lockedBy: operatorName
    }
  });
}

/**
 * DESTRAVA LEAD: Libera o lead manualmente
 */
export async function unlockLead(progressId: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  return await prisma.leadCadenceProgress.update({
    where: { id: progressId },
    data: {
      lockedAt: null,
      lockedBy: null
    }
  });
}

/**
 * BUSCA AGENDA: Retorna os 10 leads mais prioritários (vencidos ou próximos)
 */
export async function getAgendaLeads() {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  // Garante cadência padrão
  await ensureDefaultCadence(profile.id);

  const now = new Date();

  // 1. Busca total de leads ativos e pendentes para sinalização de fila e os 10 prioritários
  const [entries, totalPending] = await Promise.all([
    prisma.leadCadenceProgress.findMany({
      where: {
        profileId: profile.id,
        status: 'ACTIVE',
        finishedAt: null,
      },
      take: 10,
      orderBy: [
        { nextScheduledAt: 'asc' }, // Mais atrasados primeiro
        { version: 'asc' } // Desempate determinístico
      ],
      include: {
        lead: true,
        cadence: {
          include: {
            stages: true
          }
        }
      }
    }),
    prisma.leadCadenceProgress.count({
      where: {
        profileId: profile.id,
        status: 'ACTIVE',
        finishedAt: null,
      },
    })
  ]);

  const leads = entries.map((entry: any) => {
    const currentStage = entry.cadence.stages.find((s: any) => s.order === entry.currentStageOrder);
    const isOverdue = entry.nextScheduledAt < now;
    
    // Cálculo simples de delay para UI
    let delayStr = null;
    if (isOverdue) {
      const diffMs = now.getTime() - entry.nextScheduledAt.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      delayStr = diffHrs > 0 ? `${diffHrs}h ${diffMins}m` : `${diffMins}m`;
    }

    return {
      ...entry,
      currentStage,
      isOverdue,
      delayStr,
      isExtremeUrgent: isOverdue && (now.getTime() - entry.nextScheduledAt.getTime() > 4 * 60 * 60 * 1000) // +4h de atraso
    };
  });

  return { leads, totalPending };
}

/**
 * EXECUTA ESTÁGIO: Avança o lead na cadência
 */
export async function advanceCadenceStage(props: {
  progressId: string;
  version: number;
  operatorId: string;
  notes?: string;
  result: 'SENT' | 'REPLIED' | 'FAILED';
}) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  return await prisma.$transaction(async (tx) => {
    // 1. Lock Otimista & Verificação de Estado
    const current = await tx.leadCadenceProgress.findUnique({
      where: { id: props.progressId },
      include: { cadence: { include: { stages: true } } }
    });

    if (!current) throw new Error('Progresso não encontrado');
    if (current.version !== props.version) {
      throw new Error('CONCURRENCY_ERROR: Este lead foi atualizado por outro operador.');
    }
    if (current.status !== 'ACTIVE') throw new Error('Lead não está ativo na cadência.');

    const nextStage = current.cadence.stages
      .filter((s: any) => s.order > current.currentStageOrder)
      .sort((a: any, b: any) => a.order - b.order)[0];

    // 2. Registra o Evento de Auditoria
    await tx.leadCadenceEvent.create({
      data: {
        leadCadenceProgressId: current.id,
        leadId: current.leadId,
        action: props.result === 'REPLIED' ? 'LEAD_REPLIED' : 'STAGE_EXEC',
        fromStage: current.currentStageOrder,
        toStage: props.result === 'REPLIED' ? null : (nextStage?.order || null),
        operatorId: props.operatorId,
        notes: props.notes
      }
    });

    // 3. Atualiza o Lead (Status COMERCIAL sincronizado)
    let commercialStatus: any = undefined;
    
    if (props.result === 'REPLIED') {
      commercialStatus = 'CONTATADO';
    } else if (props.result === 'SENT') {
      commercialStatus = 'AGUARDANDO_RETORNO';
    } else if (props.result === 'FAILED') {
      commercialStatus = 'PERDIDO';
    }

    if (commercialStatus) {
      await tx.lead.update({
        where: { id: current.leadId },
        data: { 
          status: commercialStatus, 
          lastOperatorId: props.operatorId 
        }
      });
      
      // Registra a alteração no histórico de notas para auditoria operacional
      await tx.leadNote.create({
        data: {
          leadId: current.leadId,
          operatorId: props.operatorId,
          content: `[SISTEMA] Status alterado para ${commercialStatus} via Agenda`
        }
      });
    }

    // 4. Calcula Próximo Estado do Motor
    const now = new Date();
    let nextStatus: CadenceStatus = 'ACTIVE';
    let nextScheduledAt = now;
    let finishedAt = null;

    if (props.result === 'REPLIED') {
      nextStatus = 'REPLIED';
      finishedAt = now;
    } else if (!nextStage) {
      nextStatus = 'FINISHED';
      finishedAt = now;
    } else {
      // Cálculo de vencimento: Agora + Dias de delay do PRÓXIMO estágio
      const delay = nextStage.delayDays || 0;
      nextScheduledAt = new Date(now.getTime() + delay * 24 * 60 * 60 * 1000);
    }

    // 5. Atualiza o Progresso
    const updated = await tx.leadCadenceProgress.update({
      where: { id: current.id },
      data: {
        currentStageOrder: nextStage?.order || current.currentStageOrder,
        status: nextStatus,
        nextScheduledAt,
        lastActionAt: now,
        finishedAt,
        version: { increment: 1 },
        exitReason: props.result === 'REPLIED' ? 'Respondeu ao contato' : (!nextStage ? 'Fim da cadência' : null)
      }
    });

    revalidatePath('/');
    return updated;
  });
}

/**
 * PAUSA CADÊNCIA
 */
export async function pauseLeadCadence(progressId: string, operatorId: string, reason?: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  return await prisma.$transaction(async (tx) => {
    const progress = await tx.leadCadenceProgress.update({
      where: { id: progressId },
      data: {
        status: 'PAUSED',
        pausedAt: new Date(),
        version: { increment: 1 }
      }
    });

    await tx.lead.update({
      where: { id: progress.leadId },
      data: { status: 'PAUSADO', lastOperatorId: operatorId }
    });

    await tx.leadCadenceEvent.create({
      data: {
        leadCadenceProgressId: progressId,
        leadId: progress.leadId,
        action: 'PAUSE',
        operatorId,
        notes: reason || 'Pausado manualmente'
      }
    });
    
    await tx.leadNote.create({
      data: {
        leadId: progress.leadId,
        operatorId,
        content: `[SISTEMA] Status alterado para PAUSADO via Agenda`
      }
    });

    revalidatePath('/leads');

    revalidatePath('/agenda');
    return progress;
  });
}

/**
 * RETOMA CADÊNCIA (Reagenda para IMEDIATO por padrão)
 */
export async function resumeLeadCadence(progressId: string, operatorId: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  return await prisma.$transaction(async (tx) => {
    const progress = await tx.leadCadenceProgress.update({
      where: { id: progressId },
      data: {
        status: 'ACTIVE',
        pausedAt: null,
        nextScheduledAt: new Date(), // Volta para a fila imediata
        version: { increment: 1 }
      }
    });

    await tx.leadCadenceEvent.create({
      data: {
        leadCadenceProgressId: progressId,
        leadId: progress.leadId,
        action: 'RESUME',
        operatorId
      }
    });

    revalidatePath('/agenda');
    return progress;
  });
}

/**
 * INICIA CADÊNCIA PARA UM LEAD: Ativa o fluxo de follow-up
 */
export async function startLeadCadence(leadId: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  // 1. Busca cadência ativa (renomeado para CadenceEngine para quebrar cache)
  const cadence = await prisma.cadenceEngine.findFirst({
    where: {
      OR: [
        { profileId: profile.id, isActive: true },
        { profileId: null, isActive: true }
      ]
    },
    include: { stages: { orderBy: { order: 'asc' } } }
  });

  if (!cadence || cadence.stages.length === 0) {
    throw new Error('CONFIG_ERROR: Nenhuma cadência configurada para este perfil.');
  }

  // 2. Verifica se o lead já está em uma cadência ativa
  const existing = await prisma.leadCadenceProgress.findUnique({
    where: { leadId }
  });

  if (existing && existing.status === 'ACTIVE') {
    throw new Error('Este lead já está em uma cadência ativa.');
  }

  const firstStage = cadence.stages[0];
  const now = new Date();
  
  // Cálculo de vencimento: Agora + delay do primeiro estágio
  const nextScheduledAt = new Date(now.getTime() + (firstStage.delayDays || 0) * 24 * 60 * 60 * 1000);

  return await prisma.$transaction(async (tx) => {
    // 3. Upsert do Progresso (permite reiniciar cadências concluídas)
    const progress = await tx.leadCadenceProgress.upsert({
      where: { leadId },
      update: {
        cadenceId: cadence.id,
        currentStageOrder: firstStage.order,
        status: 'ACTIVE',
        nextScheduledAt,
        lastActionAt: now,
        pausedAt: null,
        finishedAt: null,
        exitReason: null,
        version: { increment: 1 }
      },
      create: {
        profileId: profile.id,
        leadId,
        cadenceId: cadence.id,
        currentStageOrder: firstStage.order,
        status: 'ACTIVE',
        nextScheduledAt,
        lastActionAt: now
      }
    });

    // 4. Auditoria
    await tx.leadCadenceEvent.create({
      data: {
        leadCadenceProgressId: progress.id,
        leadId,
        action: 'START',
        toStage: firstStage.order,
        notes: `Cadência iniciada manualmente: ${cadence.name}`
      }
    });

    revalidatePath('/leads');
    revalidatePath('/agenda');
    return progress;
  });
}

/**
 * INICIA CADÊNCIA PARA VÁRIOS LEADS (LOTE)
 */
export async function startLeadCadenceBulk(leadIds: string[]) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  const cadence = await prisma.cadenceEngine.findFirst({
    where: {
      OR: [
        { profileId: profile.id, isActive: true },
        { profileId: null, isActive: true }
      ]
    },
    include: { stages: { orderBy: { order: 'asc' } } }
  });

  if (!cadence || cadence.stages.length === 0) {
    throw new Error('CONFIG_ERROR: Nenhuma cadência configurada.');
  }

  const firstStage = cadence.stages[0];
  const now = new Date();
  const nextScheduledAt = new Date(now.getTime() + (firstStage.delayDays || 0) * 24 * 60 * 60 * 1000);

  const results = await prisma.$transaction(async (tx) => {
    const outputs = [];
    for (const leadId of leadIds) {
      const progress = await tx.leadCadenceProgress.upsert({
        where: { leadId },
        update: {
          cadenceId: cadence.id,
          currentStageOrder: firstStage.order,
          status: 'ACTIVE',
          nextScheduledAt,
          lastActionAt: now,
          pausedAt: null,
          finishedAt: null,
          exitReason: null,
          version: { increment: 1 }
        },
        create: {
          profileId: profile.id,
          leadId,
          cadenceId: cadence.id,
          currentStageOrder: firstStage.order,
          status: 'ACTIVE',
          nextScheduledAt,
          lastActionAt: now
        }
      });
      
      await tx.leadCadenceEvent.create({
        data: {
          leadCadenceProgressId: progress.id,
          leadId,
          action: 'START',
          toStage: firstStage.order,
          notes: `Cadência iniciada em lote: ${cadence.name}`
        }
      });
      outputs.push(progress);
    }
    return outputs;
  });

  revalidatePath('/leads');
  revalidatePath('/agenda');
  return { success: true, count: results.length };
}

/**
 * BUSCA CONFIGURAÇÕES DA CADÊNCIA
 */
export async function getCadenceSettings() {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  await ensureDefaultCadence(profile.id);

  return await prisma.cadenceEngine.findFirst({
    where: { profileId: profile.id },
    include: { stages: { orderBy: { order: 'asc' } } }
  });
}

/**
 * ATUALIZA CONFIGURAÇÕES DA CADÊNCIA E REPOSICIONA LEADS
 */
export async function updateCadenceSettings(cadenceId: string, stagesData: any[]) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');

  return await prisma.$transaction(async (tx) => {
    // 1. Busca estágios antigos para comparação
    const oldStages = await tx.cadenceStage.findMany({
      where: { cadenceId },
      orderBy: { order: 'asc' }
    });

    // 2. Limpa e reconstrói estágios
    await tx.cadenceStage.deleteMany({ where: { cadenceId } });
    
    const newStages = await Promise.all(stagesData.map((s, i) => 
      tx.cadenceStage.create({
        data: {
          cadenceId,
          order: i + 1,
          channel: s.channel,
          delayDays: Math.max(0, parseInt(s.delayDays) || 0),
          templateId: s.templateId || null
        }
      })
    ));

    // 3. Reposicionamento de Leads Ativos
    const activeProgress = await tx.leadCadenceProgress.findMany({
      where: { cadenceId, status: 'ACTIVE', finishedAt: null }
    });

    const now = new Date();

    for (const progress of activeProgress) {
      let nextStageOrder = progress.currentStageOrder;
      let found = newStages.find(s => s.order === nextStageOrder);
      let repositioned = false;

      if (!found) {
        repositioned = true;
        // Tenta o próximo válido
        found = newStages.find(s => s.order > nextStageOrder);
        
        if (!found) {
          // Se não houver próximo, tenta o anterior válido
          const prevStages = [...newStages].reverse().filter(s => s.order < nextStageOrder);
          found = prevStages[0];
        }
      }

      if (found) {
        // Atualiza para o novo estágio encontrado
        const delay = found.delayDays || 0;
        const nextTime = new Date(now.getTime() + delay * 24 * 60 * 60 * 1000);

        await tx.leadCadenceProgress.update({
          where: { id: progress.id },
          data: {
            currentStageOrder: found.order,
            nextScheduledAt: nextTime,
            version: { increment: 1 }
          }
        });

        if (repositioned) {
          await tx.leadCadenceEvent.create({
            data: {
              leadCadenceProgressId: progress.id,
              leadId: progress.leadId,
              action: 'SYSTEM_REPOSITION',
              notes: `Lead reposicionado automaticamente para o estágio ${found.order} devido à alteração na estrutura da cadência.`,
              toStage: found.order
            }
          });
        }
      } else {
        // Sem estágios válidos restantes, cancela a cadência por segurança
        await tx.leadCadenceProgress.update({
          where: { id: progress.id },
          data: {
            status: 'CANCELED',
            finishedAt: now,
            exitReason: 'Cadência encerrada: Todos os estágios do fluxo foram removidos.',
            version: { increment: 1 }
          }
        });

        await tx.leadCadenceEvent.create({
          data: {
            leadCadenceProgressId: progress.id,
            leadId: progress.leadId,
            action: 'SYSTEM_CANCEL',
            notes: 'A cadência deste lead foi cancelada automaticamente porque não restaram estágios válidos no fluxo configurado.'
          }
        });
      }
    }

    revalidatePath('/agenda');
    revalidatePath('/analytics');
    return { success: true };
  });
}

/**
 * GARANTE CADÊNCIA PADRÃO: Cria se não existir
 */
async function ensureDefaultCadence(profileId: string) {
  const existing = await prisma.cadenceEngine.findFirst({
    where: { profileId }
  });

  if (existing) return;

  // Cria cadência padrão de prospecção usando o novo modelo CadenceEngine
  await prisma.cadenceEngine.create({
    data: {
      profileId,
      name: '👣 Prospecção Inicial Multi-canal',
      description: 'Cadência padrão de 6 estágios (LinkedIn + E-mail + WhatsApp)',
      stages: {
        create: [
          { order: 1, channel: 'LINKEDIN', delayDays: 0 },
          { order: 2, channel: 'LINKEDIN', delayDays: 2 },
          { order: 3, channel: 'EMAIL', delayDays: 1 },
          { order: 4, channel: 'WHATSAPP', delayDays: 3 },
          { order: 5, channel: 'LINKEDIN', delayDays: 5 },
          { order: 6, channel: 'EMAIL', delayDays: 7 },
        ]
      }
    }
  });
}

