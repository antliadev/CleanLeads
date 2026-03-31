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
 * Gera URL do LinkedIn a partir de dados do lead.
 */
export function getLinkedinProfileUrl(
  linkedinOriginal: string | null,
  fullName: string | null
): string | null {
  if (!linkedinOriginal) return null;

  const cleanData = linkedinOriginal.toLowerCase();

  if (cleanData.includes('linkedin.com')) {
    const parts = linkedinOriginal.split('|');
    const urlPart = parts.find((p) => p.toLowerCase().includes('linkedin.com'))?.trim();
    if (urlPart) {
      return urlPart.startsWith('http') ? urlPart : `https://${urlPart}`;
    }
  }

  const searchTerm = encodeURIComponent(
    `${fullName || linkedinOriginal.split('|')[0].trim()} linkedin profile`
  );
  return `https://www.google.com/search?q=${searchTerm}`;
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
