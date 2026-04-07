/**
 * Utilitário robusto para interpolação de variáveis em templates.
 * Suporta aliases em português e inglês, case-insensitive.
 * Substitui o antigo parser descentralizado para garantir consistência entre Agenda e Leads.
 */

interface LeadData {
  fullName: string;
  company?: string | null;
  jobTitle?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedinUrl?: string | null;
}

/**
 * Mapeamento oficial de variáveis:
 * {{nome}}, {{name}}, {{fullname}}, {{fullName}} -> fullName
 * {{firstName}}, {{firstname}} -> Primeiro nome extraído de fullName
 * {{empresa}}, {{company}} -> company
 * {{cargo}}, {{jobtitle}}, {{jobTitle}}, {{job_title}} -> jobTitle
 * {{email}} -> email
 * {{telefone}}, {{phone}} -> phone
 * {{linkedin}}, {{linkedin_url}} -> linkedinUrl
 */
const ALIASES: Record<string, keyof LeadData | 'firstName'> = {
  // Nome Completo
  'nome': 'fullName',
  'name': 'fullName',
  'fullname': 'fullName',
  // Primeiro Nome (Virtual)
  'firstname': 'firstName',
  'first_name': 'firstName',
  // Empresa
  'empresa': 'company',
  'company': 'company',
  // Cargo
  'cargo': 'jobTitle',
  'jobtitle': 'jobTitle',
  'job_title': 'jobTitle',
  // Contato
  'email': 'email',
  'telefone': 'phone',
  'phone': 'phone',
  // Social
  'linkedin': 'linkedinUrl',
  'linkedin_url': 'linkedinUrl',
};

/**
 * Interpola as variáveis no corpo do template.
 * Se o campo estiver vazio, nulo ou indefinido, a variável é removida (substituída por string vazia).
 * Tratamento robusto para não deixar chaves literais no texto final.
 */
export function interpolateTemplate(body: string, lead: LeadData): string {
  if (!body) return '';

  let processed = body;

  // Encontra todas as variáveis do tipo {{variavel}}
  const regex = /{{(.*?)}}/g;
  const matches = body.matchAll(regex);

  // Extrai o primeiro nome de forma antecipada para o caso virtual
  const firstName = lead.fullName?.trim().split(' ')[0] || '';

  for (const match of matches) {
    const fullMatch = match[0]; // {{variavel}}
    const variableName = match[1].trim().toLowerCase(); // variavel
    
    // Verifica se temos um alias conhecido para essa variável
    const fieldKey = ALIASES[variableName];
    
    if (fieldKey) {
      if (fieldKey === 'firstName') {
        processed = processed.replace(fullMatch, firstName);
      } else {
        const value = lead[fieldKey] || '';
        processed = processed.replace(fullMatch, value);
      }
    } else {
      // Se a variável é desconhecida, o escopo diz: "O texto final nunca pode copiar a variável literal para o canal."
      // Mantemos a regra de fallback de remover a variável.
      processed = processed.replace(fullMatch, '');
    }
  }

  return processed;
}

/**
 * Verifica se o template contém variáveis cujos campos estão vazios no lead.
 * Útil para exibir alertas visuais na UI.
 */
export function getMissingFields(body: string, lead: LeadData): string[] {
  if (!body) return [];

  const missing: string[] = [];
  const regex = /{{(.*?)}}/g;
  const matches = body.matchAll(regex);

  const firstName = lead.fullName?.trim().split(' ')[0] || '';

  for (const match of matches) {
    const variableName = match[1].trim().toLowerCase();
    const fieldKey = ALIASES[variableName];
    
    if (fieldKey) {
      if (fieldKey === 'firstName') {
        if (!firstName) missing.push(variableName);
      } else {
        const value = lead[fieldKey];
        if (!value || String(value).trim() === '') {
          missing.push(variableName);
        }
      }
    }
  }

  return Array.from(new Set(missing));
}
