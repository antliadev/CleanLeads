/**
 * Utilitários para geração de links de redirecionamento manual.
 */

export const getLinkedinProfileUrl = (linkedinOriginal: string | null, fullName: string | null): string | null => {
  if (!linkedinOriginal) return null;
  
  const cleanData = linkedinOriginal.toLowerCase();
  
  // Se contiver o domínio do linkedin, tenta extrair a URL
  if (cleanData.includes('linkedin.com')) {
    const parts = linkedinOriginal.split('|');
    const urlPart = parts.find(p => p.toLowerCase().includes('linkedin.com'))?.trim();
    
    if (urlPart) {
      return urlPart.startsWith('http') ? urlPart : `https://${urlPart}`;
    }
  }

  // Fallback: Se não for uma URL, gera link de busca no Google para facilitar a vida do usuário
  const searchTerm = encodeURIComponent(`${fullName || linkedinOriginal.split('|')[0].trim()} linkedin profile`);
  return `https://www.google.com/search?q=${searchTerm}`;
};

export const getGmailComposeUrl = (
  email: string | null, 
  fullName: string | null, 
  customSubject?: string, 
  customBody?: string
): string | null => {
  if (!email) return null;
  
  const firstName = fullName?.split(' ')[0] || 'parceiro';
  
  const subject = encodeURIComponent(customSubject || `Parceria Estratégica - ${firstName}`);
  const body = encodeURIComponent(customBody || `Olá ${firstName},\n\nVi seu trabalho e gostaria de trocar uma ideia sobre uma possível parceria.\n\nFico no aguardo,\n[Seu Nome]`);
  
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
};
