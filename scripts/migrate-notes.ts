import { config } from 'dotenv';
import path from 'path';

// Carrega o .env local
config({ path: path.resolve(process.cwd(), '.env') });
config({ path: path.resolve(process.cwd(), '.env.local') });

import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Iniciando migração de notas...');

  const leads = await prisma.lead.findMany({
    where: {
      notes: {
        not: null,
      },
    },
  });

  console.log(`Encontrados ${leads.length} leads com notas.`);

  let migratedCount = 0;

  for (const lead of leads) {
    if (lead.notes && lead.notes.trim() !== '') {
      await prisma.leadNote.create({
        data: {
          leadId: lead.id,
          content: `[MIGRAÇÃO]\n${lead.notes}`,
          operatorId: null,
        },
      });
      migratedCount++;
    }
  }

  console.log(`Sucesso: ${migratedCount} notas migradas para a tabela LeadNote.`);
}

main()
  .catch((e) => {
    console.error('Erro na migração:', e);
    process.exit(1);
  });
