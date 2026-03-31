import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { InteractionActionType, GeneralStatus } from '@prisma/client';

@Injectable()
export class AutomationService {
  constructor(
    @InjectQueue('automation') private automationQueue: Queue,
    private prisma: PrismaService,
  ) {}

  async scheduleLinkedInAction(
    leadId: string, 
    actionType: InteractionActionType, 
    templateId?: string,
    message?: string,
  ) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new BadRequestException('Lead não encontrado');

    if (lead.isBlocked) throw new BadRequestException('Lead bloqueado');
    
    // Validar status atual para automoção
    const allowedStatuses: string[] = [GeneralStatus.PRONTO_PARA_CONTATO, GeneralStatus.NOVO, GeneralStatus.AGUARDANDO_CONTATO];
    if (!allowedStatuses.includes(lead.generalStatus)) {
      throw new BadRequestException('Status do lead não permite automação direta');
    }

    // Adicionar job na fila
    const job = await this.automationQueue.add('automation', {
      leadId,
      actionType,
      templateId,
      message,
    });

    return { jobId: job.id };
  }

  async startGlobalAutomation() {
    const leads = await this.prisma.lead.findMany({
      where: {
        generalStatus: GeneralStatus.PRONTO_PARA_CONTATO,
        isBlocked: false,
      },
    });

    const jobs: string[] = [];
    for (const lead of leads) {
      // Agendar convite LinkedIn por padrão se não houver interação
      const job = await this.automationQueue.add('automation', {
        leadId: lead.id,
        actionType: InteractionActionType.LINKEDIN_INVITE,
        message: 'Olá, gostaria de conectar.', // Padrão ou pegar de template
      });
      if (job.id) jobs.push(job.id);
    }

    return { scheduled: leads.length, jobIds: jobs };
  }

  async getJobsByLead(leadId: string) {
    return this.prisma.automationJob.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
