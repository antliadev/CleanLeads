const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearAll() {
  try {
    console.log('Iniciando limpeza total...');
    await prisma.$transaction([
      prisma.leadInteraction.deleteMany(),
      prisma.leadStatusHistory.deleteMany(),
      prisma.leadAuditLog.deleteMany(),
      prisma.commercialFollowUp.deleteMany(),
      prisma.automationJob.deleteMany(),
      prisma.lead.deleteMany(),
      prisma.leadImportRow.deleteMany(),
      prisma.leadImportBatch.deleteMany(),
    ]);
    console.log('Sucesso: Todos os dados foram excluídos.');
  } catch (err) {
    console.error('ERRO:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

clearAll();
