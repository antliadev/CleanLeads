import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes Tailwind de forma inteligente, resolvendo conflitos.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata data para exibição no padrão brasileiro.
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Formata data com hora.
 */
export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

/**
 * Formata horário (hora e minutos) no padrão brasileiro, retornando apenas horas sem os minutos quando são 00.
 * Ex: "18:00" retorna "18h", "14:30" retorna "14h30"
 */
export function formatTime(date: string | Date): string {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h${minutes.toString().padStart(2, '0')}`;
}

/**
 * Retorna o dia da semana por extenso em português.
 */
export function getWeekdayName(date: string | Date): string {
  const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  return weekdays[new Date(date).getDay()];
}

/**
 * Verifica se a data cai no fim de semana (sábado ou domingo).
 */
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // domingo = 0, sábado = 6
}

/**
 * Retorna a segunda-feira seguinte caso a data caia no fim de semana.
 */
function getNextBusinessDay(date: Date): Date {
  const d = new Date(date);
  while (isWeekend(d)) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

/**
 * Calcula a diferença em dias e horas entre duas datas, ignorando o horário.
 */
function getDateDiff(start: Date, end: Date): { days: number; hours: number; mins: number } {
  // Normaliza para meia-noite
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  const diffMs = endDay.getTime() - startDay.getTime();
  const totalHours = Math.abs(diffMs) / (1000 * 60 * 60);
  const days = Math.floor(totalHours / 24);
  const hours = Math.floor(totalHours % 24);
  const mins = Math.floor((totalHours * 60) % 60);
  
  return { days, hours, mins };
}

/**
 * Formata data no padrão brasileiro (dd/MM).
 */
export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(date));
}

/**
 * Formata a exibição completa da próxima ação para a agenda de leads.
 * Se a data agendada cair no fim de semana, exibe a segunda-feira seguinte.
 * 
 * Formatos:
 * - Futuro: "Falta 2d 3h • 15/05, sexta-feira"
 * - Hoje: "Falta 3h • Hoje"
 * - Amanhã: "Falta 1d • Amanhã"
 * - Vencida: "Vencida há 4h • 14/05, quinta-feira"
 */
export function formatNextActionDisplay(nextScheduledAt: string | Date | null): {
  primary: string;        // Texto principal (ex: "Falta 2d 3h")
  secondary: string;      // Data e dia (ex: "15/05, sexta-feira")
  time: string;           // Horário (ex: "18h")
  isOverdue: boolean;     // Se está vencida
  isToday: boolean;       // Se é hoje
  isTomorrow: boolean;   // Se é amanhã
} {
  if (!nextScheduledAt) {
    return {
      primary: 'Pronto',
      secondary: '',
      time: '',
      isOverdue: false,
      isToday: false,
      isTomorrow: false,
    };
  }

  const now = new Date();
  const scheduled = new Date(nextScheduledAt);

  // Se a data agendada cai no fim de semana, move para segunda-feira
  const displayDate = isWeekend(scheduled) ? getNextBusinessDay(scheduled) : scheduled;

  // Verifica se a data original já venceu
  const isOverdue = scheduled < now;

  // Calcula diferença em dias/horas usando a data de exibição (dia a dia, sem horário)
  const { days, hours, mins } = getDateDiff(now, displayDate);

  // Verifica se é hoje, amanhã ou vencida
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const displayDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate());
  const isToday = displayDay.getTime() === today.getTime();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = displayDay.getTime() === tomorrow.getTime();

  // Formata data e horário
  const dateShort = formatDateShort(displayDate);
  const weekday = getWeekdayName(displayDate);
  const timeFormatted = formatTime(displayDate);

  // Constrói o texto principal (tempo restante)
  let primary: string;
  if (isOverdue) {
    if (days > 0) {
      primary = `Vencida há ${days}d ${hours}h`;
    } else if (hours > 0) {
      primary = `Vencida há ${hours}h ${mins}m`;
    } else {
      primary = `Vencida há ${mins}m`;
    }
  } else {
    if (days > 0) {
      primary = `Falta ${days}d ${hours}h`;
    } else if (hours > 0) {
      primary = `Falta ${hours}h ${mins}m`;
    } else {
      primary = `Falta ${mins}m`;
    }
  }

  // Constrói texto secundário (data formatada)
  let secondary: string;
  if (isOverdue) {
    secondary = `${dateShort}, ${weekday}`;
  } else if (isToday) {
    secondary = '';
  } else if (isTomorrow) {
    secondary = '';
  } else {
    secondary = `${dateShort}, ${weekday}`;
  }

  return {
    primary,
    secondary,
    time: timeFormatted,
    isOverdue,
    isToday,
    isTomorrow,
  };
}

/**
 * Normaliza e retorna a URL real do LinkedIn de um lead.
 * Regras:
 * - Usa apenas o link real cadastrado (linkedinUrl) — nunca constrói URL a partir do nome.
 * - Normaliza o protocolo (adiciona https:// se faltar).
 * - Extrai a URL caso o campo venha no formato "Nome | https://linkedin.com/in/perfil".
 * - Retorna null se o campo estiver vazio ou não contiver um link válido.
 */
export function getLinkedinProfileUrl(
  linkedinUrl: string | null | undefined,
): string | null {
  if (!linkedinUrl?.trim()) return null;

  const raw = linkedinUrl.trim();

  // Caso o campo venha concatenado com nome: "Isabella Mendes | https://linkedin.com/in/..."
  if (raw.includes('|')) {
    const parts = raw.split('|');
    const urlPart = parts
      .map((p) => p.trim())
      .find((p) => p.toLowerCase().includes('linkedin.com'));
    if (urlPart) {
      return urlPart.startsWith('http') ? urlPart : `https://${urlPart}`;
    }
    // Se nenhuma parte tem linkedin.com, não temos URL válida
    return null;
  }

  // Se já é uma URL do LinkedIn, normaliza protocolo
  if (raw.toLowerCase().includes('linkedin.com')) {
    return raw.startsWith('http') ? raw : `https://${raw}`;
  }

  // Não é um link reconhecível de LinkedIn — não gera URL enganosa
  return null;
}

/**
 * Gera URL de composição do Gmail.
 */
export function getGmailComposeUrl(
  email: string | null,
  fullName: string | null,
  customSubject?: string,
  customBody?: string
): string | null {
  if (!email) return null;

  const firstName = fullName?.split(' ')[0] || 'parceiro';
  
  // Se customSubject for passado, usamos ele tal qual. Senão, usamos o padrão.
  const subject = encodeURIComponent(customSubject || `Parceria Estratégica - ${firstName}`);
  
  // Se customBody for passado, usamos ele tal qual. Senão, usamos o padrão.
  const body = encodeURIComponent(customBody || `Olá ${firstName},\n\nVi seu trabalho e gostaria de trocar uma ideia sobre uma possível parceria.\n\nFico no aguardo,\n[Seu Nome]`);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
}

/**
 * Limpa o número de telefone e adiciona o prefixo +55 se for padrão Brasil (10 ou 11 dígitos).
 */
export function formatPhoneForWhatsApp(phone: string | null): string | null {
  if (!phone) return null;

  // Remove tudo que não for dígito
  const cleaned = phone.replace(/\D/g, '');

  if (!cleaned) return null;

  // Se o número tiver 10 ou 11 dígitos, assumimos Brasil e adicionamos 55
  if (cleaned.length === 10 || cleaned.length === 11) {
    return `55${cleaned}`;
  }

  // Se já tiver 12 ou 13 dígitos, assumimos que já tem DDI (ex: 55...)
  if (cleaned.length >= 12) {
    return cleaned;
  }

  return null;
}

/**
 * Gera a URL do WhatsApp Web/App com mensagem opcional.
 */
export function getWhatsAppUrl(phone: string | null, message?: string): string | null {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  if (!formattedPhone) return null;

  const baseUrl = `https://wa.me/${formattedPhone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  return baseUrl;
}

/**
 * Converte uma string para Title Case, respeitando preposições comuns em PT-BR.
 */
export function toTitleCase(str: string | null | undefined): string {
  if (!str) return '';
  const minorWords = ['de', 'da', 'do', 'das', 'dos', 'e'];
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(s => s.length > 0)
    .map((word, index) => {
      if (index > 0 && minorWords.includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Normaliza uma URL do LinkedIn garantindo o protocolo e tratando slugs.
 */
export function normalizeLinkedinUrl(url: string | null | undefined): string {
  if (!url) return '';
  let clean = url.trim();
  if (clean.endsWith('/')) clean = clean.slice(0, -1);
  
  if (clean.startsWith('linkedin.com/')) {
    return `https://www.${clean}`;
  }
  if (clean.startsWith('www.linkedin.com/')) {
    return `https://${clean}`;
  }
  if (!clean.startsWith('http')) {
    if (!clean.includes('.') && !clean.includes('/')) {
      return `https://www.linkedin.com/in/${clean}`;
    }
    return `https://${clean}`;
  }
  return clean;
}

export interface RawCellData {
  text?: string | null;
  link?: string | null;
}

/**
 * Extrator inteligente de e-mails em células que podem conter Hyperlinks.
 * Prioriza limpar mailtos, e procura proativamente E-mails na exibição (text) caso o botão aponte para fora.
 */
export function extractSmartEmail(cell: any): string | undefined {
  if (!cell) return undefined;

  let text = '';
  let link = '';

  if (typeof cell === 'string') {
    text = cell;
  } else if (typeof cell === 'number') {
    text = String(cell);
  } else if (typeof cell === 'object') {
    text = cell.text ? String(cell.text) : '';
    link = cell.link ? String(cell.link) : '';
  }

  // Regex robusta para capturar o padrão de e-mail em qualquer parte da string
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;

  // 1. O link tem mailto e um email válido? (Cenário mais forte)
  if (link.toLowerCase().includes('mailto:')) {
    const match = link.match(emailRegex);
    if (match) return match[1].toLowerCase();
  }

  // 2. O texto exibido é um email válido?
  const textMatch = text.match(emailRegex);
  if (textMatch) return textMatch[1].toLowerCase();

  // 3. O link (sem ser mailto) possui email válido?
  const linkMatch = link.match(emailRegex);
  if (linkMatch) return linkMatch[1].toLowerCase();

  return undefined;
}

/**
 * Extrator seguro de Textos (Nomes, Cargos, etc) para evitar injeções de URLs se a célula possuir Hyperlink acidental.
 * Foca exclusivamente no valor de exibição da planilha.
 */
export function extractSmartText(cell: any): string | undefined {
  if (!cell) return undefined;

  if (typeof cell === 'string') {
    return cell.trim();
  } else if (typeof cell === 'number') {
    return String(cell).trim();
  } else if (typeof cell === 'object') {
    // Prioriza absolutamente o texto visível.
    if (cell.text !== undefined && cell.text !== null && String(cell.text).trim() !== '') {
      return String(cell.text).trim();
    }
    // Fallback: se houver link sem texto (incomum mas possível), limpa e usa.
    if (cell.link !== undefined && cell.link !== null) {
      const cleanLink = String(cell.link).replace(/mailto:/i, '');
      return cleanLink.trim();
    }
  }

  return undefined;
}
