const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearAll() {
  try {
    console.log('Iniciando limpeza completa do banco de dados...');
    
    // Ordem para respeitar as FKs
    await prisma.leadInteraction.deleteMany();
    await prisma.leadStatusHistory.deleteMany();
    await prisma.leadAuditLog.deleteMany();
    await prisma.commercialFollowUp.deleteMany();
    await prisma.automationJob.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.leadImportRow.deleteMany();
    await prisma.leadImportBatch.deleteMany();
    
    console.log('Sucesso: Todos os leads e históricos foram removidos.');
  } catch (err) {
    console.error('Erro durante a limpeza:', err);
  } finally {
    await prisma.$disconnect();
  }
}

clearAll();
