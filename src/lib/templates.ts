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
 * Tratamento robusto via Regex Global para substituir todas as ocorrências de forma atômica.
 */
export function interpolateTemplate(body: string, lead: LeadData): string {
  if (!body || !lead) return '';

  // Extração robusta do primeiro nome (trata múltiplos espaços e nulos)
  const firstName = lead.fullName?.trim().split(/\s+/)[0] || '';
  
  const values: Record<string, string> = {
    fullName: lead.fullName || '',
    firstName: firstName,
    company: lead.company || '',
    jobTitle: lead.jobTitle || '',
    email: lead.email || '',
    phone: lead.phone || '',
    linkedinUrl: lead.linkedinUrl || '',
  };

  /**
   * Explicação da Regex: {{([\s\S]*?)}}
   * {{ : Início da tag
   * ([\s\S]*?) : Captura qualquer caractere (incluindo quebras de linha) de forma não-gulosa (parando no primeiro }})
   * }} : Fim da tag
   * /g : Global (substitui todas as ocorrências)
   */
  return body.replace(/{{([\s\S]*?)}}/g, (match, p1) => {
    // Normaliza o nome da variável para busca no mapa de aliases
    const variableName = p1.trim().toLowerCase();
    
    // Verifica se temos um alias conhecido para essa variável
    const fieldKey = ALIASES[variableName];
    
    if (fieldKey) {
      // Retorna o valor limpo ou string vazia
      return (values[fieldKey] || '').trim();
    }
    
    // Se a variável é desconhecida, removemos para não contaminar a mensagem final
    return '';
  }).trim();
}

/**
 * Verifica se o template contém variáveis cujos campos estão vazios no lead.
 * Útil para exibir alertas visuais na UI.
 */
export function getMissingFields(body: string, lead: LeadData): string[] {
  if (!body || !lead) return [];

  const missing: string[] = [];
  const firstName = lead.fullName?.trim().split(/\s+/)[0] || '';
  
  const values: Record<string, string> = {
    fullName: lead.fullName || '',
    firstName: firstName,
    company: lead.company || '',
    jobTitle: lead.jobTitle || '',
    email: lead.email || '',
    phone: lead.phone || '',
    linkedinUrl: lead.linkedinUrl || '',
  };

  const regex = /{{([\s\S]*?)}}/g;
  const matches = body.matchAll(regex);

  for (const match of matches) {
    const rawVariableName = match[1].trim();
    const variableName = rawVariableName.toLowerCase();
    const fieldKey = ALIASES[variableName];
    
    if (fieldKey) {
      const value = values[fieldKey];
      if (!value || value.trim() === '') {
        missing.push(rawVariableName);
      }
    }
  }

  // Retorna nomes únicos para evitar duplicidade em alertas
  return Array.from(new Set(missing));
}
