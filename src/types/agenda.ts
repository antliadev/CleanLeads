/**
 * Tipos unificados da Agenda Operacional.
 * Suporta dois tipos de itens:
 *   1. CadenceAgendaItem — gerado automaticamente pelo fluxo de cadência
 *   2. ManualAgendaItem  — criado manualmente pelo operador via LeadScheduledAction
 */

// ───────────────────────────────────────────────
// Enums locais (espelham os enums do Prisma para uso no client)
// ───────────────────────────────────────────────

export type ManualActionType =
  | 'LIGACAO'
  | 'REUNIAO'
  | 'EMAIL'
  | 'WHATSAPP'
  | 'LINKEDIN'
  | 'TAREFA';

export type ManualActionChannel =
  | 'EMAIL'
  | 'LINKEDIN'
  | 'WHATSAPP'
  | 'TELEFONE'
  | 'PRESENCIAL'
  | 'OUTRO';

export type ManualActionStatus = 'PENDING' | 'DONE' | 'CANCELED' | 'MISSED';

// ───────────────────────────────────────────────
// Tipo de item da Agenda
// ───────────────────────────────────────────────

export type AgendaItemType = 'CADENCE' | 'MANUAL';

// Campos do lead compartilhados entre os dois tipos
export interface AgendaLeadData {
  id: string;
  fullName: string;
  company: string | null;
  jobTitle: string | null;
  email: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  whatsappUrl: string | null;
}

// Campos de exibição de data/tempo — compartilhados entre os dois tipos
export interface AgendaDisplayFields {
  isOverdue: boolean;
  isExtremeUrgent: boolean;
  nextActionPrimary: string;
  nextActionSecondary: string;
  nextActionTime: string;
  nextActionIsToday: boolean;
  nextActionIsTomorrow: boolean;
  timeDisplay: string; // compatibilidade retroativa
}

// Item de cadência automática (originado de LeadCadenceProgress)
export interface CadenceAgendaItem extends AgendaDisplayFields {
  type: 'CADENCE';
  id: string; // id do LeadCadenceProgress
  sortDate: Date;
  lead: AgendaLeadData;
  currentStageOrder: number;
  currentStage: {
    order: number;
    channel: string;
    delayDays: number;
    templateId: string | null;
  } | null;
  cadence: {
    id: string;
    name: string;
    stages: Array<{
      order: number;
      channel: string;
      delayDays: number;
      templateId: string | null;
    }>;
  };
  status: string;
  version: number;
  nextScheduledAt: Date;
  lockedAt: Date | null;
  lockedBy: string | null;
}

// Item de ação manual agendada (originado de LeadScheduledAction)
export interface ManualAgendaItem extends AgendaDisplayFields {
  type: 'MANUAL';
  id: string; // id do LeadScheduledAction
  sortDate: Date;
  lead: AgendaLeadData;
  title: string;
  actionType: ManualActionType;
  channel: ManualActionChannel | null;
  notes: string | null;
  scheduledAt: Date;
  status: ManualActionStatus;
  createdByOperatorId: string | null;
  createdByOperatorName: string | null;
}

// União dos dois tipos — o que a AgendaList e AgendaPageClient manipulam
export type UnifiedAgendaItem = CadenceAgendaItem | ManualAgendaItem;

// ───────────────────────────────────────────────
// Formulário de criação de ação manual
// ───────────────────────────────────────────────

export interface CreateManualActionInput {
  leadId: string;
  title: string;
  actionType: ManualActionType;
  channel?: ManualActionChannel | null;
  notes?: string;
  scheduledAt: Date; // data/hora em UTC
  createdByOperatorId?: string;
}

// ───────────────────────────────────────────────
// Contadores da Agenda (suporta ambas as fontes)
// ───────────────────────────────────────────────

export interface AgendaCounts {
  todayCount: number;
  overdueCount: number;
  totalPending: number;
}

// ───────────────────────────────────────────────
// Labels de exibição dos enums
// ───────────────────────────────────────────────

export const MANUAL_ACTION_TYPE_LABELS: Record<ManualActionType, string> = {
  LIGACAO:  'Ligação',
  REUNIAO:  'Reunião',
  EMAIL:    'E-mail',
  WHATSAPP: 'WhatsApp',
  LINKEDIN: 'LinkedIn',
  TAREFA:   'Tarefa',
};

export const MANUAL_ACTION_CHANNEL_LABELS: Record<ManualActionChannel, string> = {
  EMAIL:      'E-mail',
  LINKEDIN:   'LinkedIn',
  WHATSAPP:   'WhatsApp',
  TELEFONE:   'Telefone',
  PRESENCIAL: 'Presencial',
  OUTRO:      'Outro',
};

export const MANUAL_ACTION_TYPE_ICONS: Record<ManualActionType, string> = {
  LIGACAO:  '📞',
  REUNIAO:  '📅',
  EMAIL:    '✉️',
  WHATSAPP: '💬',
  LINKEDIN: '🔗',
  TAREFA:   '✅',
};
