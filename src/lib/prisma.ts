import { PrismaClient } from '../../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  initialized: boolean;
};

// Initialize Prisma client with error handling and connection pooling
// Pool config is handled at the Supabase project level via pgBouncer
function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('[Prisma] DATABASE_URL não está definida');
    throw new Error('DATABASE_URL não configurada. Configure a variável de ambiente DATABASE_URL.');
  }

  // Supabase Pooler URL (use SUPABASE_POOL_URL if available, otherwise DATABASE_URL)
  const poolUrl = process.env.SUPABASE_POOL_URL || connectionString;

  try {
    const adapter = new PrismaPg({ 
      connectionString: poolUrl,
    });
    
    const client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Prisma] Cliente criado com sucesso');
    }
    
    return client;
  } catch (error) {
    console.error('[Prisma] Erro ao criar cliente:', error);
    throw error;
  }
}

// Get or create Prisma client (singleton for serverless)
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Prisma] Inicializando cliente...');
    }
    globalForPrisma.prisma = createPrismaClient();
    globalForPrisma.initialized = true;
  }
  return globalForPrisma.prisma;
}

// Export Prisma client for direct use
export const prisma = getPrisma();