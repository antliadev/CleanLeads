import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GeneralStatus } from '@prisma/client';

@Injectable()
export class FollowUpsService {
  constructor(private prisma: PrismaService) {}

  async getPendingTasks() {
    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

    // Busca leads elegíveis para follow-up
    // Regra: Status de contato ativo + (Sem interações OU última interação > 48h)
    const leads = await this.prisma.lead.findMany({
      where: {
        generalStatus: {
          in: [
            GeneralStatus.AGUARDANDO_CONTATO, 
            GeneralStatus.AGUARDANDO_RESPOSTA, 
            GeneralStatus.PRONTO_PARA_CONTATO
          ]
        },
        isBlocked: false,
        isConcluded: false,
      },
      include: {
        interactions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'asc' },
    });

    // Filtro manual para garantir a regra de 48h (Prisma não suporta filter em relations aninhadas de forma simples aqui)
    return leads.filter(lead => {
      if (lead.interactions.length === 0) return true; // Nunca contatado
      const lastInteraction = lead.interactions[0];
      return new Date(lastInteraction.createdAt) <= fortyEightHoursAgo;
    });
  }

  async createHistory(leadId: string, data: any) {
    return this.prisma.commercialFollowUp.create({
      data: {
        leadId,
        ...data,
      },
    });
  }

  async getStats() {
    const [totalLeads, pendingResponse, pronto] = await Promise.all([
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { generalStatus: GeneralStatus.AGUARDANDO_RESPOSTA } }),
      this.prisma.lead.count({ where: { generalStatus: GeneralStatus.PRONTO_PARA_CONTATO } }),
    ]);

    return {
      totalLeads,
      pendingResponse,
      readyToContact: pronto,
    };
  }
}
