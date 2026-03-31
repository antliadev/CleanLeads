import {
  Clock,
  MessageCircle,
  Handshake,
  CheckCircle2,
  XCircle,
  UserPlus,
  Hourglass,
} from 'lucide-react';

/**
 * Mapa de status de leads com label, cor Tailwind e ícone.
 */
export const LEAD_STATUS_MAP = {
  NOVO: {
    label: 'Novo',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Clock,
  },
  AGUARDANDO_CONEXAO: {
    label: 'Aguardando Conexão',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    icon: UserPlus,
  },
  AGUARDANDO_RETORNO: {
    label: 'Aguardando Retorno',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: Hourglass,
  },
  CONTATADO: {
    label: 'Contatado',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: MessageCircle,
  },
  EM_NEGOCIACAO: {
    label: 'Em Negociação',
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    icon: Handshake,
  },
  CONVERTIDO: {
    label: 'Convertido',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  PERDIDO: {
    label: 'Perdido',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: XCircle,
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
 * Itens por página padrão na listagem.
 */
export const DEFAULT_PAGE_SIZE = 15;
