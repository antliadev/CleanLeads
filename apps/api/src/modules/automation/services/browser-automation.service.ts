import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { chromium, BrowserContext, Page } from 'playwright';
import { Lead } from '@prisma/client';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class BrowserAutomationService implements OnModuleDestroy {
  private context: BrowserContext | null = null;
  private readonly logger = new Logger(BrowserAutomationService.name);

  // Caminho padrão do Chrome no Windows. Ajustável via ENV se o usuário souber informar.
  private readonly defaultChromeProfile = path.join(
    os.homedir(),
    'AppData',
    'Local',
    'Google',
    'Chrome',
    'User Data',
    'Default'
  );

  async onModuleDestroy() {
    if (this.context) {
      this.logger.log('Encerrando contexto do navegador...');
      await this.context.close();
    }
  }

  private async getContext(): Promise<BrowserContext> {
    if (this.context) return this.context;

    this.logger.log(`Iniciando navegador com perfil: ${this.defaultChromeProfile}`);
    
    // NOTA: Se o Chrome já estiver aberto pelo usuário, o Playwright pode falhar se tentar criar um lock.
    // Recomendação: O usuário deve fechar o Chrome antes de rodar o comando global, ou usaremos uma cópia do perfil.
    try {
      this.context = await chromium.launchPersistentContext(this.defaultChromeProfile, {
        headless: false, // Queremos ver a automação acontecendo
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      return this.context;
    } catch (err) {
      this.logger.error('Erro ao abrir o navegador. Certifique-se de que o Chrome está fechado.', err);
      throw err;
    }
  }

  async processLinkedinLead(lead: Lead, message: string) {
    const context = await this.getContext();
    const page = await context.newPage();
    
    try {
      if (!lead.linkedinOriginal) {
        return { success: false, error: 'Lead sem URL de LinkedIn' };
      }
      const targetUrl = lead.linkedinOriginal as string;
      this.logger.log(`Navegando para o perfil: ${targetUrl}`);
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

      // 1. Verificar se é conexão (Botão "Mensagem" presente significa conexão direta)
      const isConnected = await page.isVisible('button:has-text("Mensagem")');
      
      if (!isConnected) {
        // Tentar Conectar
        this.logger.log('Lead não conectado. Enviando solicitação...');
        const connectButton = page.locator('button:has-text("Conectar")');
        if (await connectButton.isVisible()) {
          await connectButton.click();
          // Lógica de nota personalizada se houver modal
          if (await page.isVisible('button:has-text("Adicionar nota")')) {
            await page.click('button:has-text("Adicionar nota")');
            await page.fill('textarea[name="message"]', message);
            await page.click('button:has-text("Enviar")');
          } else {
            // Apenas enviar convite direto
            await page.click('button:has-text("Enviar sem nota")');
          }
          return { success: true, status: 'CONVITE_ENVIADO' };
        }
      } else {
        // Enviar mensagem direta
        this.logger.log('Lead conectado. Enviando mensagem direta...');
        await page.click('button:has-text("Mensagem")');
        await page.waitForSelector('.msg-form__contenteditable');
        await page.fill('.msg-form__contenteditable', message);
        await page.click('button:has-text("Enviar")');
        return { success: true, status: 'MENSAGEM_ENVIADA' };
      }

      return { success: false, error: 'Botões não mapeados' };
    } catch (err) {
      this.logger.error('Falha na automação LinkedIn:', err);
      return { success: false, error: err.message };
    } finally {
      await page.close();
    }
  }

  async processEmailLead(lead: Lead, message: string) {
    const context = await this.getContext();
    const page = await context.newPage();
    
    try {
      if (!lead.emailNormalized) {
        return { success: false, error: 'Lead sem e-mail normalizado' };
      }
      const targetEmail = lead.emailNormalized as string;
      // Exemplo usando Gmail (supondo que o usuário esteja logado)
      this.logger.log(`Abrindo Gmail para envio automatizado para: ${targetEmail}`);
      await page.goto('https://mail.google.com/mail/u/0/#compose', { waitUntil: 'networkidle' });
      
      await page.fill('input[name="to"]', targetEmail);
      await page.fill('input[name="subjectbox"]', 'Parceria Estratégica');
      await page.fill('div[aria-label="Corpo da mensagem"]', message);
      
      // await page.click('div[aria-label="Enviar"]'); // Comentado para segurança nos testes iniciais
      
      return { success: true, status: 'EMAIL_ESCRITO' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      await page.close();
    }
  }

  async checkForResponses(leadId: string) {
    // Lógica para percorrer a caixa de entrada do LinkedIn e Gmail
    // Se encontrar resposta, retorna status: 'RESPONDIDO'
    return null; 
  }
}
