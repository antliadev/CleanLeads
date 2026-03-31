import { Lead } from '@prisma/client';

export function parseTemplate(templateBody: string, lead: Partial<Lead>): string {
  if (!templateBody) return '';

  return templateBody
    .replace(/\{\{nome\}\}/gi, lead.fullName || '')
    .replace(/\{\{empresa\}\}/gi, lead.company || '')
    .replace(/\{\{cargo\}\}/gi, lead.jobTitle || '')
    .replace(/\{\{email\}\}/gi, lead.email || '')
    .replace(/\{\{telefone\}\}/gi, lead.phone || '');
}
