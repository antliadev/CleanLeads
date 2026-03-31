import { Controller, Get, Query, UseGuards, Param, Patch, Body, Post, Delete } from '@nestjs/common';
import { LeadsService } from './services/leads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { GeneralStatus } from '@prisma/client';

@Controller('leads')
export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('status') status?: GeneralStatus,
    @Query('search') search?: string,
  ) {
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const where: any = {};
    if (status) where.generalStatus = status;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { emailNormalized: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / take),
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        interactions: true,
        statusHistories: true,
        followUps: true,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: GeneralStatus,
    @Body('note') note: string,
  ) {
    return this.prisma.lead.update({
      where: { id },
      data: {
        generalStatus: status,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateLead(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.leadsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bulk-delete') // Nome amigável para o reset
  async deleteAll() {
    // Ordem de exclusão para respeitar as FKs (Foreign Keys)
    await this.prisma.$transaction([
      this.prisma.leadInteraction.deleteMany(),
      this.prisma.leadStatusHistory.deleteMany(),
      this.prisma.leadAuditLog.deleteMany(),
      this.prisma.commercialFollowUp.deleteMany(),
      this.prisma.automationJob.deleteMany(),
      this.prisma.lead.deleteMany(),
      this.prisma.leadImportRow.deleteMany(),
      this.prisma.leadImportBatch.deleteMany(),
    ]);

    return { message: 'Todos os dados de leads e importações foram excluídos.' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    try {
      console.log(`[LeadService] Iniciando exclusão atômica do lead: ${id}`);
      
      await this.prisma.$transaction([
        // 1. Limpar interações
        this.prisma.leadInteraction.deleteMany({ where: { leadId: id } }),
        // 2. Limpar histórico de status
        this.prisma.leadStatusHistory.deleteMany({ where: { leadId: id } }),
        // 3. Limpar logs de auditoria
        this.prisma.leadAuditLog.deleteMany({ where: { leadId: id } }),
        // 4. Limpar follow-ups comerciais
        this.prisma.commercialFollowUp.deleteMany({ where: { leadId: id } }),
        // 5. Limpar tarefas de automação
        this.prisma.automationJob.deleteMany({ where: { leadId: id } }),
        // 6. Limpar referências em rastro de importação (Opcional, mas seguro)
        this.prisma.leadImportRow.updateMany({
          where: { generatedLeadId: id },
          data: { generatedLeadId: null }
        }),
        // 7. Excluir o lead final
        this.prisma.lead.delete({ where: { id } }),
      ]);

      console.log(`[LeadService] Sucesso: Lead ${id} e todas as suas dependências foram removidos.`);
      return { 
        success: true, 
        message: `Lead ${id} excluído com sucesso.`,
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      console.error(`[LeadService] ERRO CRÍTICO ao excluir lead ${id}:`, err);
      throw err;
    }
  }
}
