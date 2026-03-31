import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GeneralStatus } from '@prisma/client';

@Controller('metrics')
export class MetricsController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  async getSummary() {
    const [counts, recentLeads] = await Promise.all([
      this.prisma.lead.groupBy({
        by: ['generalStatus'],
        _count: true,
      }),
      this.prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          code: true,
          fullName: true,
          company: true,
          generalStatus: true,
          createdAt: true,
        }
      }),
    ]);

    // Mapear counts para um formato fácil de consumir
    const statusCounts = counts.reduce((acc, curr) => {
      acc[curr.generalStatus] = curr._count;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

    return {
      cards: [
        { title: 'Total de Leads', value: total, status: 'Total' },
        { title: 'Prontos para Contato', value: statusCounts[GeneralStatus.PRONTO_PARA_CONTATO] || 0, status: 'Quente' },
        { title: 'Aguardando Análise', value: statusCounts[GeneralStatus.AGUARDANDO_ANALISE] || 0, status: 'Urgente' },
        { title: 'Leads Bloqueados', value: statusCounts[GeneralStatus.BLOQUEADO] || 0, status: 'Atenção' },
      ],
      funnel: [
        { name: 'Novo', value: statusCounts[GeneralStatus.NOVO] || 0 },
        { name: 'Pronto', value: statusCounts[GeneralStatus.PRONTO_PARA_CONTATO] || 0 },
        { name: 'Contato', value: (statusCounts[GeneralStatus.AGUARDANDO_CONTATO] || 0) + (statusCounts[GeneralStatus.AGUARDANDO_RESPOSTA] || 0) },
        { name: 'Análise', value: statusCounts[GeneralStatus.AGUARDANDO_ANALISE] || 0 },
        { name: 'Concluído', value: statusCounts[GeneralStatus.CONCLUIDO] || 0 },
      ],
      recentActivity: recentLeads,
    };
  }
}
