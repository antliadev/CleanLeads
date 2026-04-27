import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  initialized: boolean;
};

// Initialize Prisma client with error handling
function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('[Prisma] DATABASE_URL não está definida');
    throw new Error('DATABASE_URL não configurada. Configure a variável de ambiente DATABASE_URL.');
  }

  try {
    const adapter = new PrismaPg({ connectionString });
    const client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
    });
    console.log('[Prisma] Cliente criado com sucesso');
    return client;
  } catch (error) {
    console.error('[Prisma] Erro ao criar cliente:', error);
    throw error;
  }
}

// Get or create Prisma client
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    console.log('[Prisma] Inicializando cliente...');
    globalForPrisma.prisma = createPrismaClient();
    globalForPrisma.initialized = true;
  }
  return globalForPrisma.prisma;
}

// Export Prisma client for direct use
export const prisma = getPrisma();