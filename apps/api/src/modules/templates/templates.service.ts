import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateChannel } from '@prisma/client';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.template.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Template não encontrado');
    return template;
  }

  async create(data: { name: string; channel: TemplateChannel; templateType: string; subjectTemplate?: string; bodyTemplate: string }) {
    return this.prisma.template.create({
      data: {
        ...data,
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.template.update({
      where: { id },
      data: {
        ...data,
        version: { increment: 1 },
      },
    });
  }

  async remove(id: string) {
    const template = await this.findOne(id);
    
    return this.prisma.$transaction(async (tx) => {
      // 1. Desvincular interações (Foreign Key handling)
      await tx.leadInteraction.updateMany({
        where: { templateId: id },
        data: { templateId: null },
      });

      // 2. Excluir o template
      return tx.template.delete({ where: { id } });
    });
  }

  async magicFix(text: string): Promise<string> {
    if (!text) return '';
    
    // 1. Limpeza inicial
    let improved = text.trim();
    
    // 2. Correção de Abreviações e Gírias (Normalização)
    const slangs = {
      'td bem': 'tudo bem',
      'blz': 'tudo bem',
      'cara': 'prezado',
      'oi': 'Olá',
      'vc': 'você',
      'vcs': 'vocês',
      'pq': 'porque',
      'ajuda': 'suporte estratégico',
      'queria': 'gostaria de',
    };
    
    Object.entries(slangs).forEach(([slang, official]) => {
      const regex = new RegExp(`\\b${slang}\\b`, 'gi');
      improved = improved.replace(regex, official);
    });

    // 3. Otimização de Tom (Reescrita Persuasiva)
    improved = improved.replace(/tentei entrar em contato/i, 'estou entrando em contato para apresentar');
    improved = improved.replace(/gostaria de falar/i, 'gostaria de conversar sobre como podemos potencializar');
    improved = improved.replace(/conhecer sua empresa/i, 'entender melhor os desafios atuais da sua operação');
    
    // 4. Padronização de Variáveis
    improved = improved.replace(/{{nome}}/gi, '{{firstName}}');
    improved = improved.replace(/{{lead}}/gi, '{{firstName}}');
    
    // 5. Gramática Técnica (Capitalização de sentences)
    // Dividir por pontos e capitalizar a primeira letra de cada frase
    improved = improved.split(/([.!?]\s+)/).map(part => {
      if (part.length > 1 && !part.match(/^[.!?]\s+$/)) {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      }
      return part;
    }).join('');

    // Garantir primeira letra da mensagem maiúscula
    improved = improved.charAt(0).toUpperCase() + improved.slice(1);

    // 6. Pontuação Final de Segurança
    if (!['.', '!', '?'].includes(improved.slice(-1))) {
      improved += '.';
    }
    
    // 7. Remoção de Espaços Duplos
    improved = improved.replace(/\s{2,}/g, ' ');

    return improved;
  }
}
