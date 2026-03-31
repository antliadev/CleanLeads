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
