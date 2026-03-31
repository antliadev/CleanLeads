import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export abstract class IEmailProvider {
  abstract sendEmail(to: string, subject: string, body: string): Promise<EmailResponse>;
}

@Injectable()
export class SendGridProvider extends IEmailProvider {
  private readonly logger = new Logger(SendGridProvider.name);

  constructor() {
    super();
    const apiKey = process.env.SENDGRID_API_KEY;
    if (apiKey) {
      sgMail.setApiKey(apiKey);
    } else {
      this.logger.warn('SENDGRID_API_KEY não configurada. O envio de e-mails falhará.');
    }
  }

  async sendEmail(to: string, subject: string, body: string): Promise<EmailResponse> {
    try {
      const [response] = await sgMail.send({
        to,
        from: process.env.EMAIL_FROM || 'contato@suaempresa.com.br',
        subject,
        html: body,
        text: body.replace(/<[^>]*>?/gm, ''), // Fallback texto simples básico
      });

      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
      };
    } catch (error: any) {
      this.logger.error(`Erro ao enviar e-mail para ${to}:`, error.response?.body || error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
