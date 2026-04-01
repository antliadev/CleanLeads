'use server';

import { prisma } from '@/lib/prisma';
import { createServerSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { LeadSource, LeadStatus } from '@prisma/client';
import type { LeadImportRow } from '@/lib/validations/lead-import';

export async function processImportChunk(validLeads: LeadImportRow[], batchId: string) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Obter perfil do usuário
  const profile = await prisma.profile.findUnique({
    where: { authUid: user.id },
  });

  if (!profile) {
    throw new Error('Perfil não encontrado');
  }

  const results = { created: 0, updated: 0, errors: 0 };

  // Usa transação sequencial para o Chunk para permitir Upserts com History
  // Importante: No PostgreSQL, Prisma Upsert é melhor feito em loop para cada um ou com prisma.lead.upsert
  for (const row of validLeads) {
    try {
      await prisma.$transaction(async (tx) => {
        // Busca se existe um lead com mesmo e-mail ou mesmo linkedinUrl
        const existingLead = await tx.lead.findFirst({
          where: {
            profileId: profile.id,
            OR: [
              { email: row.email },
              ...(row.linkedinUrl ? [{ linkedinUrl: row.linkedinUrl }] : []),
            ],
          },
        });

        if (existingLead) {
          // UPDATE (Upsert) - Mesclar dados preservando o status se ele não for NOVO
          const updated = await tx.lead.update({
            where: { id: existingLead.id },
            data: {
              fullName: row.fullName || existingLead.fullName,
              company: row.company || existingLead.company,
              jobTitle: row.jobTitle || existingLead.jobTitle,
              email: row.email || existingLead.email,
              phone: row.phone || existingLead.phone,
              linkedinUrl: row.linkedinUrl || existingLead.linkedinUrl,
              notes: row.notes 
                ? (existingLead.notes ? `${existingLead.notes}\n---\nImport: ${row.notes}` : row.notes) 
                : existingLead.notes,
              // Mantém importBatchId atualizado para nova importação
              importBatchId: batchId,
              // Mantemos Status e Source intactos, ou mudamos? 
              // Regra de ouro: se foi atualizado via importação, a source vira IMPORTACAO_CSV/XLSX
              // dependendo da extensão, mas por padrão deixamos inalterada p/ n perder o registro manual se era.
            },
          });

          // Grava History
          await tx.leadHistory.create({
            data: {
              leadId: existingLead.id,
              previousData: existingLead as any,
              newData: updated as any,
              actionBy: 'IMPORTACAO',
            },
          });

          results.updated++;
        } else {
          // CREATE
          await tx.lead.create({
            data: {
              profileId: profile.id,
              fullName: row.fullName,
              company: row.company,
              jobTitle: row.jobTitle,
              email: row.email,
              phone: row.phone,
              linkedinUrl: row.linkedinUrl,
              notes: row.notes,
              source: LeadSource.IMPORTACAO_XLSX,
              status: LeadStatus.NOVO,
              importBatchId: batchId,
            },
          });
          results.created++;
        }
      });
    } catch (e) {
      console.error('Erro importando lead:', row.fullName, e);
      results.errors++;
    }
  }

  revalidatePath('/leads');
  revalidatePath('/analytics');

  return results;
}

// ────────────────────────────────────────────────────────
// CHECAR DUPLICIDADE (Usado na validação do Wizard)
// ────────────────────────────────────────────────────────
export async function checkLeadsDuplicity(identifiers: { email?: string, linkedinUrl?: string }[]) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado');

  const profile = await prisma.profile.findUnique({
    where: { authUid: user.id },
  });
  if (!profile) throw new Error('Perfil não encontrado');

  const emails = identifiers.map(i => i.email).filter(Boolean) as string[];
  const linkedins = identifiers.map(i => i.linkedinUrl).filter(Boolean) as string[];

  if (emails.length === 0 && linkedins.length === 0) return [];

  // Busca leads que já existem com os mesmos e-mails ou linkedinUrls no perfil do usuário
  const existingLeads = await prisma.lead.findMany({
    where: {
      profileId: profile.id,
      OR: [
        { email: { in: emails.length > 0 ? emails : ['__none__'] } },
        { linkedinUrl: { in: linkedins.length > 0 ? linkedins : ['__none__'] } },
      ],
    },
    select: {
      email: true,
      linkedinUrl: true
    }
  });

  return existingLeads;
}
