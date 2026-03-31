import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InteractionChannel, InteractionActionType, GeneralStatus } from '@prisma/client';
import { AutomationGateway } from './automation.gateway';
import { BrowserAutomationService } from './services/browser-automation.service';

@Processor('automation')
@Injectable()
export class AutomationProcessor extends WorkerHost {
  private readonly logger = new Logger(AutomationProcessor.name);

  constructor(
    private prisma: PrismaService,
    private automationGateway: AutomationGateway,
    private browserService: BrowserAutomationService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { leadId, actionType, templateId, message } = job.data;
    
    this.logger.log(`Iniciando Automação Real para o lead ${leadId}...`);
    this.automationGateway.notifyStatusChange({ leadId, status: 'PROCESSING', log: 'Iniciando navegador...' });

    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead || lead.isBlocked) return;

    try {
      let result;
      if (actionType === InteractionActionType.LINKEDIN_INVITE || actionType === InteractionActionType.LINKEDIN_MESSAGE) {
        this.automationGateway.notifyStatusChange({ leadId, status: 'PROCESSING', log: 'Acessando LinkedIn...' });
        result = await this.browserService.processLinkedinLead(lead, message);
      } else if (actionType === InteractionActionType.EMAIL_INITIAL) {
        this.automationGateway.notifyStatusChange({ leadId, status: 'PROCESSING', log: 'Abrindo E-mail...' });
        result = await this.browserService.processEmailLead(lead, message);
      }

      if (result?.success) {
        await this.prisma.leadInteraction.create({
          data: {
            leadId,
            channel: actionType.includes('LINKEDIN') ? InteractionChannel.LINKEDIN : InteractionChannel.EMAIL,
            actionType,
            templateId,
            messageBodySnapshot: message,
            result: result.status,
            sentAt: new Date(),
          },
        });

        const newStatus = GeneralStatus.AGUARDANDO_RESPOSTA;
        await this.prisma.lead.update({
          where: { id: leadId },
          data: { generalStatus: newStatus },
        });

        this.automationGateway.notifyStatusChange({ leadId, status: 'COMPLETED', log: `Sucesso: ${result.status}` });
      } else {
        this.automationGateway.notifyStatusChange({ leadId, status: 'FAILED', log: `Erro: ${result?.error || 'Desconhecido'}` });
      }

      return result;
    } catch (err) {
      this.automationGateway.notifyStatusChange({ leadId, status: 'FAILED', log: `Fatal: ${err.message}` });
      throw err;
    }
  }
}
