import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy initialization - só cria o cliente quando necessário
function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('Prisma: DATABASE_URL não está definida');
    throw new Error('DATABASE_URL não configurada. Configure a variável de ambiente DATABASE_URL.');
  }

  try {
    const adapter = new PrismaPg({ connectionString });
    const client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
    return client;
  } catch (error) {
    console.error('Prisma: Erro ao criar cliente:', error);
    throw error;
  }
}

// Get Prisma client with lazy initialization
export function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Re-export for backwards compatibility
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    return (client as any)[prop];
  },
});

// For development, cache the client
if (process.env.NODE_ENV !== 'production') {
  getPrismaClient();
}