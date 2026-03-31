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
  const subject = encodeURIComponent(customSubject || `Parceria Estratégica - ${firstName}`);
  const body = encodeURIComponent(
    customBody ||
      `Olá ${firstName},\n\nVi seu trabalho e gostaria de trocar uma ideia sobre uma possível parceria.\n\nFico no aguardo,\n[Seu Nome]`
  );

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
}
