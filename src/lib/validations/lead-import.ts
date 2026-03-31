import { z } from 'zod';

// Regex flexível para o LinkedIn (aceita variações de urls)
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;

// Schema para cada linha lida do Excel/CSV
export const ImportRowSchema = z.object({
  fullName: z
    .string({ message: 'O nome é obrigatório' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .transform((str) => str.trim()),
  email: z
    .string({ message: 'O e-mail é obrigatório' })
    .email('O e-mail informado é inválido')
    .transform((str) => str.toLowerCase().trim()),
  company: z
    .string()
    .optional()
    .transform((str) => str?.trim() || undefined),
  jobTitle: z
    .string()
    .optional()
    .transform((str) => str?.trim() || undefined),
  phone: z
    .string()
    .optional()
    .transform((str) => str?.replace(/[^0-9+\-() ]/g, '').trim() || undefined),
  linkedinUrl: z
    .string()
    .optional()
    .transform((str) => {
      if (!str || str.trim() === '') return undefined;
      const clean = str.trim();
      if (linkedinRegex.test(clean)) return clean;
      
      // Tentar consertar: se a pessoa colocou só "joaosilva", converte
      if (!clean.includes('/')) return `https://www.linkedin.com/in/${clean}`;
      // Se não der pra consertar, mantém, será pego pela validação (se estrito) ou aceito por flexibilidade.
      // O zod aceita, mas em alguns casos você decide se rejeita ou não. Aqui vamos permitir mas normalizar urls sem Https
      if (clean.startsWith('linkedin.com') || clean.startsWith('www.linkedin.com')) {
        return `https://${clean}`;
      }
      return clean;
    }),
  notes: z
    .string()
    .optional()
    .transform((str) => str?.trim() || undefined),
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
