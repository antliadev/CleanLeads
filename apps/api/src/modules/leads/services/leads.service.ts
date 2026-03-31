import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NormalizationService } from './normalization.service';
import { ValidationService } from './validation.service';
import { DeduplicationService } from './deduplication.service';
import { GeneralStatus, UserRole } from '@prisma/client';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private prisma: PrismaService,
    private normalization: NormalizationService,
    private validation: ValidationService,
    private deduplication: DeduplicationService,
  ) {}

  private async generateNextCode(): Promise<string> {
    const lastLead = await this.prisma.lead.findFirst({
      orderBy: { code: 'desc' },
    });

    let nextNumber = 1;
    if (lastLead && lastLead.code.startsWith('LD')) {
      const lastNumber = parseInt(lastLead.code.replace('LD', ''), 10);
      nextNumber = lastNumber + 1;
    }

    return `LD${nextNumber.toString().padStart(6, '0')}`;
  }

  async processImportBatch(batchId: string) {
    const batch = await this.prisma.leadImportBatch.findUnique({
      where: { id: batchId },
      include: { rows: true },
    });

    if (!batch) return;

    this.logger.log(`Iniciando processamento do lote ${batchId} (${batch.totalRows} linhas)...`);

    let successCount = 0;
    let errorCount = 0;

    for (const row of batch.rows) {
      try {
        const raw = row.rawPayload as any;
        const mapping = batch.mappingSnapshot as any;

        // Extração robusta (lidar com nomes de campos mapeados)
        const fullName = raw[mapping['fullName']] || '';
        const company = raw[mapping['company']] || '';
        const email = raw[mapping['emailOriginal']] || '';
        const phone = raw[mapping['phoneOriginal']] || '';
        const linkedin = raw[mapping['linkedinOriginal']] || '';

        if (!fullName && !company && !email) {
          this.logger.warn(`Linha ${row.rowNumber} ignorada: sem dados mínimos.`);
          continue;
        }

        // 1. Normalização
        const normalizedName = this.normalization.normalizeCapitalization(fullName);
        const normalizedCompany = this.normalization.normalizeCapitalization(company);
        const normalizedEmail = this.normalization.normalizeEmail(email);
        const normalizedPhone = this.normalization.normalizePhone(phone);
        const normalizedLinkedin = this.normalization.normalizeLinkedin(linkedin);

        // 2. Validação
        const emailValid = this.validation.isValidEmail(normalizedEmail);
        const phoneValid = this.validation.isValidPhone(normalizedPhone);
        const linkedinValid = this.validation.isValidLinkedin(normalizedLinkedin);

        // 3. Deduplicação
        const masterLead = await this.deduplication.findDuplicate({
          emailNormalized: normalizedEmail,
          phoneNormalized: normalizedPhone,
          linkedinNormalized: normalizedLinkedin,
        });

        // 4. Classificação Inicial
        let generalStatus: GeneralStatus = GeneralStatus.PRONTO_PARA_CONTATO;
        let isBlocked = false;
        let reviewNote = '';

        if (!emailValid && !linkedinValid) {
          generalStatus = GeneralStatus.REVISAO_MANUAL;
          reviewNote = 'Sem canal de contato válido (Email ou LinkedIn malformado)';
        }

        if (masterLead) {
          generalStatus = GeneralStatus.BLOQUEADO;
          isBlocked = true;
          reviewNote = `Duplicidade identificada com o lead ${masterLead.code}`;
        }

        // 5. Criação do Lead
        const code = await this.generateNextCode();
        const lead = await this.prisma.lead.create({
          data: {
            code,
            company: normalizedCompany || 'Não informada',
            fullName: normalizedName || 'Sem Nome',
            firstName: normalizedName ? this.normalization.extractFirstName(normalizedName) : 'Lead',
            emailOriginal: email,
            emailNormalized: normalizedEmail,
            emailValid,
            emailDomain: this.validation.extractEmailDomain(normalizedEmail),
            phoneOriginal: phone,
            phoneNormalized: normalizedPhone,
            phoneValid,
            whatsappLink: this.normalization.generateWhatsappLink(normalizedPhone),
            linkedinOriginal: linkedin,
            linkedinNormalized: normalizedLinkedin,
            linkedinValid,
            isDuplicate: !!masterLead,
            duplicateOfLeadId: masterLead?.id,
            generalStatus,
            isBlocked,
            internalNote: reviewNote,
            importBatchId: batchId,
          },
        });

        // 6. Atualizar a linha do lote
        await this.prisma.leadImportRow.update({
          where: { id: row.id },
          data: {
            normalizedPayload: { name: normalizedName, company: normalizedCompany },
            validationStatus: generalStatus,
            duplicateDetected: !!masterLead,
            generatedLeadId: lead.id,
          },
        });

        successCount++;
      } catch (err) {
        errorCount++;
        this.logger.error(`Erro ao processar linha ${row.rowNumber} do lote ${batchId}:`, err.message);
        await this.prisma.leadImportRow.update({
          where: { id: row.id },
          data: {
            validationStatus: 'REVISAO_MANUAL' as any,
          },
        }).catch(() => {});
      }
    }

    // 7. Atualizar Batch Metrics
    const leads = await this.prisma.lead.findMany({ where: { importBatchId: batchId } });
    await this.prisma.leadImportBatch.update({
      where: { id: batchId },
      data: {
        status: 'COMPLETED',
        totalValidRows: leads.filter(l => l.generalStatus === GeneralStatus.PRONTO_PARA_CONTATO).length,
        totalManualReviewRows: leads.filter(l => l.generalStatus === GeneralStatus.REVISAO_MANUAL).length,
        totalDuplicateRows: leads.filter(l => l.isDuplicate).length,
        processingFinishedAt: new Date(),
        errorSummary: errorCount > 0 ? `${errorCount} linhas falharam durante o processamento.` : null,
      },
    });

    this.logger.log(`Lote ${batchId} finalizado. Sucesso: ${successCount}, Falhas: ${errorCount}`);
  }

  async update(id: string, data: any) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) throw new Error('Lead não encontrado');

    const updateData: any = { ...data };

    // Normalização Reativa: Se o campo mudou, re-normaliza
    if (data.fullName !== undefined) {
      updateData.fullName = this.normalization.normalizeCapitalization(data.fullName);
      updateData.firstName = this.normalization.extractFirstName(updateData.fullName);
    }

    if (data.company !== undefined) {
      updateData.company = this.normalization.normalizeCapitalization(data.company);
    }

    if (data.emailOriginal !== undefined) {
       updateData.emailNormalized = this.normalization.normalizeEmail(data.emailOriginal);
       updateData.emailValid = this.validation.isValidEmail(updateData.emailNormalized);
       updateData.emailDomain = this.validation.extractEmailDomain(updateData.emailNormalized);
    }

    if (data.phoneOriginal !== undefined) {
      updateData.phoneNormalized = this.normalization.normalizePhone(data.phoneOriginal);
      updateData.phoneValid = this.validation.isValidPhone(updateData.phoneNormalized);
      updateData.whatsappLink = this.normalization.generateWhatsappLink(updateData.phoneNormalized);
    }

    if (data.phoneSecondaryOriginal !== undefined) {
      updateData.phoneSecondaryNormalized = this.normalization.normalizePhone(data.phoneSecondaryOriginal);
    }

    if (data.linkedinOriginal !== undefined) {
      updateData.linkedinNormalized = this.normalization.normalizeLinkedin(data.linkedinOriginal);
      updateData.linkedinValid = this.validation.isValidLinkedin(updateData.linkedinNormalized);
    }

    return this.prisma.lead.update({
      where: { id },
      data: updateData,
    });
  }
}
