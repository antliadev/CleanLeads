import { Lead } from '@prisma/client';

/**
 * Substitui as variáveis (placeholders) do corpo do template
 * pelos dados reais do lead.
 *
 * Variáveis suportadas:
 * - {{nome}} ou {{fullName}} → nome completo do lead
 * - {{firstName}} → primeiro nome do lead
 * - {{empresa}} ou {{company}} → empresa do lead
 * - {{cargo}} ou {{jobTitle}} → cargo do lead
 * - {{email}} → e-mail do lead
 * - {{telefone}} ou {{phone}} → telefone do lead
 */
export function parseTemplate(templateBody: string, lead: Partial<Lead>): string {
  if (!templateBody) return '';

  const firstName = lead.fullName?.split(' ')[0] ?? '';

  return templateBody
    // Nome completo
    .replace(/\{\{nome\}\}/gi, lead.fullName ?? '')
    .replace(/\{\{fullName\}\}/gi, lead.fullName ?? '')
    // Primeiro nome
    .replace(/\{\{firstName\}\}/gi, firstName)
    // Empresa
    .replace(/\{\{empresa\}\}/gi, lead.company ?? '')
    .replace(/\{\{company\}\}/gi, lead.company ?? '')
    // Cargo
    .replace(/\{\{cargo\}\}/gi, lead.jobTitle ?? '')
    .replace(/\{\{jobTitle\}\}/gi, lead.jobTitle ?? '')
    // Contato
    .replace(/\{\{email\}\}/gi, lead.email ?? '')
    .replace(/\{\{telefone\}\}/gi, lead.phone ?? '')
    .replace(/\{\{phone\}\}/gi, lead.phone ?? '');
}
