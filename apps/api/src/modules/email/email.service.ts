import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IEmailProvider } from './providers/sendgrid.provider';
import { InteractionChannel, InteractionActionType, EmailStatus } from '@prisma/client';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private prisma: PrismaService,
    private emailProvider: IEmailProvider,
  ) {}

  async sendTemplatedEmail(leadId: string, subject: string, body: string, templateId?: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead || !lead.emailNormalized || !lead.emailValid) {
      this.logger.warn(`Lead ${leadId} sem e-mail válido para contato.`);
      return { success: false, error: 'E-mail inválido ou ausente' };
    }

    // Enviar e-mail via Provedor (SendGrid)
    const response = await this.emailProvider.sendEmail(lead.emailNormalized, subject, body);

    if (response.success) {
      // Registrar Interação
      await this.prisma.leadInteraction.create({
        data: {
          leadId,
          channel: InteractionChannel.EMAIL,
          actionType: InteractionActionType.EMAIL_INITIAL,
          templateId,
          subject,
          messageBodySnapshot: body,
          result: 'ENVIADO',
          sentAt: new Date(),
        },
      });

      // Atualizar Status de E-mail do Lead
      await this.prisma.lead.update({
        where: { id: leadId },
        data: {
          emailStatus: EmailStatus.EMAIL_ENVIADO,
        },
      });
    } else {
      this.logger.error(`Falha ao enviar e-mail para ${lead.emailNormalized}: ${response.error}`);
    }

    return response;
  }
}
