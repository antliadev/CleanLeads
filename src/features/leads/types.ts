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
  };
}>;
