import {
  Clock,
  MessageCircle,
  Handshake,
  CheckCircle2,
  XCircle,
  UserPlus,
  Hourglass,
  PauseCircle,
} from 'lucide-react';

/**
 * Mapa de status de leads com label, cor Tailwind e ícone.
 */
export const LEAD_STATUS_MAP = {
  NOVO: {
    label: 'Novo',
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50',
    icon: Clock,
  },
  AGUARDANDO_CONEXAO: {
    label: 'Aguardando Conexão',
    color: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800/50',
    icon: UserPlus,
  },
  AGUARDANDO_RETORNO: {
    label: 'Aguardando Retorno',
    color: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50',
    icon: Hourglass,
  },
  CONTATADO: {
    label: 'Contatado',
    color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50',
    icon: MessageCircle,
  },
  EM_NEGOCIACAO: {
    label: 'Em Negociação',
    color: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800/50',
    icon: Handshake,
  },
  CONVERTIDO: {
    label: 'Concluido',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50',
    icon: CheckCircle2,
  },
  PERDIDO: {
    label: 'Perdido',
    color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/50',
    icon: XCircle,
  },
  PAUSADO: {
    label: 'Pausado',
    color: 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800/50',
    icon: PauseCircle,
  },
} as const;

/**
 * Mapa de origem de leads.
 */
export const LEAD_SOURCE_MAP = {
  MANUAL: { label: 'Manual', color: 'bg-slate-50 text-slate-600' },
  IMPORTACAO_CSV: { label: 'CSV', color: 'bg-cyan-50 text-cyan-600' },
  IMPORTACAO_XLSX: { label: 'Excel', color: 'bg-green-50 text-green-600' },
} as const;

/**
 * Mapa de canais de template.
 */
export const TEMPLATE_CHANNEL_MAP = {
  EMAIL: { label: 'E-mail', color: 'bg-indigo-50 text-indigo-600' },
  LINKEDIN: { label: 'LinkedIn', color: 'bg-blue-50 text-blue-600' },
  WHATSAPP: { label: 'WhatsApp', color: 'bg-emerald-50 text-emerald-600' },
} as const;

/**
 * Limite de linhas por importação de planilha.
 */
export const IMPORT_MAX_ROWS = 2000;

/**
 * Tamanho de chunk para processamento em lotes.
 */
export const IMPORT_CHUNK_SIZE = 500;

/**
 * Itens por página padrão na listagem de leads.
 */
export const DEFAULT_PAGE_SIZE = 50;

/**
 * Itens por página padrão na agenda.
 */
export const AGENDA_PAGE_SIZE = 10;
