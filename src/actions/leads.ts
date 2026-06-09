'use server';

import { revalidatePath, unstable_cache } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import type { LeadStatus } from '@prisma/client';
import { getAuthProfile } from './auth';

// ═══════════════════════
// Schemas
// ═══════════════════════
const leadSchema = z.object({
  fullName: z.string().min(2, 'Nome obrigatório (mínimo 2 caracteres)'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedinUrl: z.string().url('URL LinkedIn inválida').optional().or(z.literal('')),
  whatsappUrl: z.string().url('URL WhatsApp inválida').optional().or(z.literal('')),
  status: z.enum(['NOVO', 'AGUARDANDO_CONEXAO', 'AGUARDANDO_RETORNO', 'CONTATADO', 'EM_NEGOCIACAO', 'CONVERTIDO', 'PERDIDO', 'PAUSADO']).default('NOVO'),
  notes: z.string().optional(),
  customSource: z.string().optional(),
  operatorId: z.string().min(1, 'Operador obrigatório'),
});

export type LeadFormResult = { success: boolean; error?: string };

// ═══════════════════════
// Utilitários de normalização
// ═══════════════════════
/**
 * Normaliza texto para busca no banco:
 * - Converte para lowercase
 * - Remove acentos (João → Joao, JOÃO → joao)
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos (acentos)
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extrai o primeiro nome de uma string de nome completo
 */
function extractFirstName(fullName: string): string {
  if (!fullName) return '';
  // Remove acentos primeiro
  const normalized = normalizeText(fullName);
  // Pega o primeiro nome (até o primeiro espaço)
  return normalized.split(' ')[0];
}

/**
 * Cria condições de busca robustas para um lead
 * Inclui: nome completo, primeiro nome, company, email, jobTitle, phone
 * Funciona com: acentos, case, partial match
 */
function buildSearchConditions(search: string) {
  if (!search || search.trim().length < 1) return undefined;
  
  const term = search.trim();
  const normalizedTerm = normalizeText(term);
  const firstName = extractFirstName(term);
  
  // Todos os campos possíveis para busca
  const fields = ['fullName', 'company', 'email', 'jobTitle', 'phone'];
  
  // Condições para cada campo
  const conditions: any[] = [];
  
  for (const field of fields) {
    // 1. Contains exato (case-insensitive) - encontra "joão" em "João Silva"
    conditions.push({ [field]: { contains: term, mode: 'insensitive' as const } });
    
    // 2. Contains normalizado (sem acentos) - encontra "joao" em "João Silva"
    if (normalizedTerm !== term.toLowerCase()) {
      conditions.push({ [field]: { contains: normalizedTerm, mode: 'insensitive' as const } });
    }
    
    // 3. StartsWith (início do nome) - encontra "Jo" em "João Silva"
    // Só aplica para fullName e company (nomes e empresas)
    if (field === 'fullName' || field === 'company') {
      conditions.push({ [field]: { startsWith: term, mode: 'insensitive' as const } });
      conditions.push({ [field]: { startsWith: normalizedTerm, mode: 'insensitive' as const } });
    }
  }
  
  // 4. Busca pelo primeiro nome no campo fullName
  // "Joao" encontra "João Silva" (primeiro nome)
  if (firstName && firstName.length >= 2) {
    conditions.push({ fullName: { startsWith: firstName, mode: 'insensitive' as const } });
    // Primeiro nome em maiúsculas também
    conditions.push({ fullName: { startsWith: firstName.toUpperCase(), mode: 'insensitive' as const } });
  }
  
  return conditions.length > 0 ? conditions : undefined;
}

// ═══════════════════════
// Listar leads com filtros
// ═══════════════════════
export async function getLeads({
  page = 1,
  search = '',
  status = '',
  stage = '',
}: {
  page?: number;
  search?: string;
  status?: string;
  stage?: string;
} = {}) {
  let profile;
  try {
    profile = await getAuthProfile();
  } catch (authError: any) {
    const errorMsg = authError?.message || '';
    console.error('getLeads: Erro ao buscar perfil:', errorMsg);
    
    // Verifica se é erro de conexão
    if (errorMsg.includes('indisponível') || errorMsg.includes('connection') || errorMsg.includes('ECONNREFUSED')) {
      return { 
        leads: [], 
        total: 0, 
        page: 1, 
        totalPages: 0,
        error: 'Banco de dados indisponível. Verifique se o projeto Supabase está ativo (não pausado).'
      };
    }
    
    return { 
      leads: [], 
      total: 0, 
      page: 1, 
      totalPages: 0,
      error: 'Não autorizado. Faça login novamente.'
    };
  }
  
  if (!profile) {
    return { 
      leads: [], 
      total: 0, 
      page: 1, 
      totalPages: 0,
      error: 'Não autorizado. Faça login novamente.'
    };
  }
  
  const take = DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * take;

  // Usa as novas condições de busca inteligentes
  const searchConditions = buildSearchConditions(search);

  const stageFilter = stage === 'none' 
    ? { cadenceEngine: { is: null } }
    : stage
      ? { cadenceEngine: { currentStageOrder: parseInt(stage) } }
      : undefined;

  const where = {
    profileId: profile.id,
    ...(searchConditions && { OR: searchConditions }),
    ...(status && { status: status as LeadStatus }),
    ...(stageFilter && stageFilter),
  };

  try {
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: { 
          // Histórico limitado - apenas último para badge visual
          histories: { orderBy: { createdAt: 'desc' }, take: 3 },
          lastOperator: { select: { name: true } },
          // Notas limitadas - apenas últimas 3 para preview
          leadNotes: { 
            include: { operator: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }, 
            take: 3 
          },
          cadenceEngine: {
            select: {
              status: true,
              currentStageOrder: true,
              cadence: {
                select: {
                  stages: {
                    select: {
                      order: true,
                      channel: true,
                      template: {
                        select: { name: true }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: { updatedAt: 'desc' },
        take,
        skip,
      }),
      prisma.lead.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);
    return { leads, total, page, totalPages };
  } catch (error: any) {
    console.error('getLeads: Erro ao buscar leads:', error);
    return { 
      leads: [], 
      total: 0, 
      page: 1, 
      totalPages: 0,
      error: error?.message || 'Erro ao carregar leads'
    };
  }
}

/**
 * Busca o histórico completo de notas de um lead específico.
 */
export async function getLeadNotes(leadId: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autorizado');
  
  try {
    const notes = await prisma.leadNote.findMany({
      where: { 
        leadId,
        lead: { profileId: profile.id } 
      },
      include: { 
        operator: { select: { name: true } } 
      },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, notes };
  } catch (error: any) {
    console.error('Erro ao buscar notas do lead:', error);
    return { success: false, error: 'Erro ao carregar histórico de notas' };
  }
}

// ═══════════════════════
// Buscar lead completo com detalhes (on-demand)
// ═══════════════════════
export async function getLeadById(id: string) {
  const profile = await getAuthProfile();
  const lead = await prisma.lead.findFirst({
    where: { id, profileId: profile.id },
    include: { 
      histories: { orderBy: { createdAt: 'desc' }, take: 20 },
      lastOperator: { select: { name: true } },
      leadNotes: { 
        include: { operator: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }, 
        take: 20 
      },
    },
  });
  if (!lead) throw new Error('Lead não encontrado');
  return lead;
}

// ═══════════════════════
// Criar lead
// ═══════════════════════
export async function createLead(
  _prev: LeadFormResult | null,
  formData: FormData
): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    const raw = Object.fromEntries(formData.entries());
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const { operatorId, notes, customSource, ...otherData } = parsed.data;
    
    const data: any = Object.fromEntries(
      Object.entries(otherData).filter(([, v]) => v !== '' && v !== undefined)
    );

    await prisma.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: { 
          ...data, 
          profileId: profile.id, 
          source: 'MANUAL',
          customSource: customSource || 'Criação Manual',
          lastOperatorId: operatorId 
        },
      });

      await tx.leadNote.create({
        data: {
          leadId: lead.id,
          operatorId,
          content: '[SISTEMA] Lead criado manualmente. ' + (notes ? `\nNota inicial: ${notes}` : '')
        }
      });
    });

    revalidatePath('/leads');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao criar lead' };
  }
}

// ═══════════════════════
// Atualizar lead
// ═══════════════════════
export async function updateLead(
  id: string,
  _prev: LeadFormResult | null,
  formData: FormData
): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    const raw = Object.fromEntries(formData.entries());
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const { operatorId, notes, customSource, ...otherData } = parsed.data;
    const cadenceStageOrder = raw.cadenceStageOrder as string | undefined;

    const data: any = Object.fromEntries(
      Object.entries(otherData).filter(([, v]) => v !== '' && v !== undefined)
    );

    await prisma.$transaction(async (tx) => {
      const existing = await tx.lead.findFirst({ where: { id, profileId: profile.id } });
      if (!existing) throw new Error('Lead não encontrado');

      await tx.lead.update({
        where: { id },
        data: {
          ...data,
          customSource,
          lastOperatorId: operatorId
        },
      });

      await tx.leadNote.create({
        data: {
          leadId: id,
          operatorId,
          content: '[SISTEMA] Cadastro do lead alterado/atualizado manualmente.'
        }
      });
      
      if (notes && notes.trim()) {
        await tx.leadNote.create({
          data: {
            leadId: id,
            operatorId,
            content: notes.trim()
          }
        });
      }

      // 处理 Cadência Stage - iniciar ou reposicionar
      if (cadenceStageOrder && cadenceStageOrder !== '') {
        const stageOrder = parseInt(cadenceStageOrder);
        
        // Busca a cadência ativa do perfil
        const cadence = await tx.cadenceEngine.findFirst({
          where: {
            OR: [
              { profileId: profile.id, isActive: true },
              { profileId: null, isActive: true }
            ]
          },
          include: { stages: { orderBy: { order: 'asc' } } }
        });

        if (cadence && cadence.stages.length > 0) {
          const stage = cadence.stages.find((s: any) => s.order === stageOrder);
          if (stage) {
            // Calcula o próximo agendamento baseado no delay do estágio
            const now = new Date();
            const delay = stage.delayDays || 0;
            const nextScheduledAt = new Date(now.getTime() + delay * 24 * 60 * 60 * 1000);

            // Verifica se já existe um progresso de cadência
            const existingProgress = await tx.leadCadenceProgress.findUnique({
              where: { leadId: id }
            });

            if (existingProgress) {
              // Atualiza o estágio existente
              await tx.leadCadenceProgress.update({
                where: { id: existingProgress.id },
                data: {
                  currentStageOrder: stageOrder,
                  status: 'ACTIVE',
                  nextScheduledAt,
                  pausedAt: null,
                  finishedAt: null,
                  version: { increment: 1 }
                }
              });
              
              await tx.leadCadenceEvent.create({
                data: {
                  leadCadenceProgressId: existingProgress.id,
                  leadId: id,
                  action: 'MANUAL_REPOSITION',
                  fromStage: existingProgress.currentStageOrder,
                  toStage: stageOrder,
                  operatorId,
                  notes: `Reposicionado manualmente para o estágio ${stageOrder} via edição do lead.`
                }
              });

              await tx.leadNote.create({
                data: {
                  leadId: id,
                  operatorId,
                  content: `[SISTEMA] Lead reposicionado para o estágio ${stageOrder} da cadência "${cadence.name}".`
                }
              });
            } else {
              // Cria novo progresso de cadência a partir do estágio selecionado
              const progress = await tx.leadCadenceProgress.create({
                data: {
                  profileId: profile.id,
                  leadId: id,
                  cadenceId: cadence.id,
                  currentStageOrder: stageOrder,
                  status: 'ACTIVE',
                  nextScheduledAt,
                  lastActionAt: now
                }
              });

              await tx.leadCadenceEvent.create({
                data: {
                  leadCadenceProgressId: progress.id,
                  leadId: id,
                  action: 'START',
                  toStage: stageOrder,
                  operatorId,
                  notes: `Cadência iniciada manualmente no estágio ${stageOrder}: ${cadence.name}`
                }
              });

              await tx.leadNote.create({
                data: {
                  leadId: id,
                  operatorId,
                  content: `[SISTEMA] Lead iniciado na cadência "${cadence.name}" no estágio ${stageOrder}.`
                }
              });
            }
          }
        }
      }
    });

    revalidatePath('/leads');
    revalidatePath('/agenda');
    revalidatePath(`/leads/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar lead' };
  }
}

// ═══════════════════════
// Atualizar status do lead
// ═══════════════════════
export async function updateLeadStatus(
  id: string, 
  status: LeadStatus, 
  operatorId: string,
  notes?: string
): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    if (!operatorId) throw new Error('Erro Operacional: Ação abortada por falta de identificação de operador.');

    await prisma.$transaction(async (tx) => {
      const existing = await tx.lead.findFirst({ where: { id, profileId: profile.id } });
      if (!existing) throw new Error('Lead não encontrado');

      await tx.lead.update({
        where: { id },
        data: { 
          status,
          lastOperatorId: operatorId
        },
      });

      let content = `[SISTEMA] Status alterado para ${status}.`;
      if (notes && notes.trim()) {
        content += `\nNota: ${notes.trim()}`;
      }

      await tx.leadNote.create({
        data: {
          leadId: id,
          operatorId,
          content
        }
      });
    });

    revalidatePath('/leads');
    revalidatePath(`/leads/${id}`);
    revalidatePath('/analytics');

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar status' };
  }
}

// ═══════════════════════
// Registrar tentativa de contato
// ═══════════════════════
export async function registerContactAttempt(
  id: string, 
  operatorId: string, 
  channel: string
): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    if (!operatorId) throw new Error('Erro Operacional: Ação abortada por falta de identificação de operador.');

    await prisma.$transaction(async (tx) => {
      const existing = await tx.lead.findFirst({ where: { id, profileId: profile.id } });
      if (!existing) throw new Error('Lead não encontrado');

      await tx.lead.update({
        where: { id },
        data: { lastOperatorId: operatorId },
      });

      await tx.leadNote.create({
        data: {
          leadId: id,
          operatorId,
          content: `[SISTEMA] Disparo de link rápido via ${channel}.`
        }
      });
    });

    revalidatePath(`/leads/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao registrar tentativa' };
  }
}

// ═══════════════════════
// Excluir lead
// ═══════════════════════
export async function deleteLead(id: string): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    await prisma.lead.deleteMany({ where: { id, profileId: profile.id } });
    revalidatePath('/leads');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao excluir lead' };
  }
}

// ═══════════════════════
// Excluir todos os leads
// ═══════════════════════
export async function deleteAllLeads(): Promise<LeadFormResult> {
  try {
    const profile = await getAuthProfile();
    await prisma.lead.deleteMany({ where: { profileId: profile.id } });
    revalidatePath('/leads');
    revalidatePath('/analytics');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao limpar base' };
  }
}

/**
 * Adiciona uma nota avulsa a um lead.
 */
export async function addLeadNote(
  leadId: string,
  operatorId: string,
  content: string
) {
  const profile = await getAuthProfile();
  if (!operatorId) throw new Error('Operador obrigatório');

  try {
    const note = await prisma.leadNote.create({
      data: {
        leadId,
        operatorId,
        content: content.trim(),
      },
      include: {
        operator: { select: { name: true } }
      }
    });

    await prisma.lead.update({
      where: { id: leadId },
      data: { 
        lastOperatorId: operatorId 
      }
    });

    revalidatePath('/leads');
    revalidatePath(`/leads/${leadId}`);
    
    return { success: true, note };
  } catch (error: any) {
    console.error('Erro ao adicionar nota ao lead:', error);
    return { success: false, error: 'Erro ao adicionar nota' };
  }
}
