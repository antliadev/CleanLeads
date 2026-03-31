import { z } from 'zod';
import { toTitleCase, normalizeLinkedinUrl } from '../utils';

// Regex flexível para o LinkedIn (aceita variações de urls)
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;

// Schema para cada linha lida do Excel/CSV
export const ImportRowSchema = z.object({
  fullName: z
    .string({ message: 'O nome é obrigatório' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .transform((str) => toTitleCase(str)),
  email: z
    .string()
    .email('O e-mail informado é inválido')
    .optional()
    .or(z.literal(''))
    .transform((str) => str?.toLowerCase().trim() || undefined),
  company: z
    .string()
    .optional()
    .transform((str) => toTitleCase(str) || undefined),
  jobTitle: z
    .string()
    .optional()
    .transform((str) => toTitleCase(str) || undefined),
  phone: z
    .string()
    .optional()
    .transform((str) => str?.replace(/[^0-9+\-() ]/g, '').trim() || undefined),
  linkedinUrl: z
    .string()
    .optional()
    .transform((str) => normalizeLinkedinUrl(str) || undefined),
  notes: z
    .string()
    .optional()
    .transform((str) => str?.trim() || undefined),
}).superRefine((data, ctx) => {
  if (!data.email && !data.phone && !data.linkedinUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'O lead deve ter pelo menos uma forma de contato (E-mail, Telefone ou LinkedIn)',
      path: ['email'], // Aponta para email como padrão de erro de contato
    });
  }
});

export type LeadImportRow = z.infer<typeof ImportRowSchema>;

export interface ImportValidationResult {
  validLeads: LeadImportRow[];
  invalidRows: { row: number; data: any; errors: string[] }[];
}

export function validateImportData(rawData: any[]): ImportValidationResult {
  const result: ImportValidationResult = {
    validLeads: [],
    invalidRows: [],
  };

  rawData.forEach((row, index) => {
    // Tenta validar. Row + 2 porque index 0 costuma ser a linha 2 da planilha (descontando header)
    const parsed = ImportRowSchema.safeParse(row);
    if (parsed.success) {
      result.validLeads.push(parsed.data);
    } else {
      result.invalidRows.push({
        row: index + 2,
        data: row,
        errors: parsed.error.issues.map((issue) => issue.message),
      });
    }
  });

  return result;
}
