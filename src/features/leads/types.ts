import type { Prisma } from '@prisma/client';

export type LeadWithHistory = Prisma.LeadGetPayload<{
  include: { 
    histories: { orderBy: { createdAt: 'desc' }, take: 10 };
    lastOperator: { select: { name: true } };
    leadNotes: { 
      include: { operator: { select: { name: true } } };
      orderBy: { createdAt: 'desc' }; 
      take: 10;
    };
    cadenceEngine: {
      select: {
        status: true;
        currentStageOrder: true;
        cadence: {
          select: {
            stages: {
              select: {
                order: true;
                channel: true;
                template: {
                  select: {
                    name: true;
                  }
                }
              }
            }
          }
        }
      }
    };
  };
}>;

/** 
 * Tipo completo com detalhes estendidos - carregado on-demand para o modal de edição
 */
export type LeadFullDetails = Prisma.LeadGetPayload<{
  include: { 
    histories: { orderBy: { createdAt: 'desc' }, take: 20 };
    lastOperator: { select: { name: true } };
    leadNotes: { 
      include: { operator: { select: { name: true } } };
      orderBy: { createdAt: 'desc' }; 
      take: 20;
    };
  };
}>;
