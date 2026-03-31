import { Injectable } from '@nestjs/common';

@Injectable()
export class NormalizationService {
  normalizeString(value: string | null): string {
    if (!value) return '';
    return value.trim().replace(/\s+/g, ' ');
  }

  normalizeCapitalization(value: string | null): string {
    if (!value) return '';
    const name = this.normalizeString(value);
    return name.split(' ').map(part => {
      if (!part) return '';
      if (part.length <= 2 && ['de', 'do', 'da', 'dos', 'das', 'e'].includes(part.toLowerCase())) {
        return part.toLowerCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).filter(Boolean).join(' ');
  }

  normalizeEmail(email: string | null): string {
    if (!email) return '';
    return email.trim().toLowerCase();
  }

  normalizePhone(phone: string | null): string {
    if (!phone) return '';
    return phone.replace(/\D/g, ''); // Apenas números
  }

  normalizeLinkedin(url: string | null): string {
    if (!url) return '';
    
    let normalized = url.trim();
    const lowerNormalized = normalized.toLowerCase();
    
    // Se for o formato "Texto | Link", extrair o que parece link
    if (normalized.includes('|')) {
      const parts = normalized.split('|');
      const linkPart = parts.find(p => p.toLowerCase().includes('linkedin.com'))?.trim();
      if (linkPart) {
        normalized = linkPart;
      } else {
        // Se não houver linkedin.com nas partes, mas houver |, pega a segunda parte como tentativa de link
        normalized = parts[1] ? parts[1].trim() : parts[0].trim();
      }
    }

    // Se ainda não tiver linkedin.com, não tentamos normalizar como URL
    if (!normalized.toLowerCase().includes('linkedin.com')) {
      return normalized; // Mantém o original para busca no frontend
    }
    
    const parts = normalized.split(/\s+/);
    const linkedinPart = parts.find(p => p.toLowerCase().includes('linkedin.com'));
    normalized = linkedinPart || parts[0];

    if (!normalized) return '';
    
    normalized = normalized.toLowerCase();
    
    if (normalized.includes('?')) {
      normalized = normalized.split('?')[0];
    }

    // Garantir protocolo apenas se parecer uma URL
    if (normalized.includes('.')) {
      normalized = normalized.replace(/^(https?:\/\/)+/g, ''); 
      normalized = `https://${normalized}`;
    }
    
    if (normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }

    return normalized;
  }

  generateWhatsappLink(phone: string | null): string {
    const cleanPhone = this.normalizePhone(phone);
    if (!cleanPhone) return '';
    // Adicionar DDI 55 se não tiver (heurística simples)
    const phoneWithDDI = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    return `https://wa.me/${phoneWithDDI}`;
  }

  extractFirstName(fullName: string | null): string {
    if (!fullName) return '';
    return this.normalizeCapitalization(fullName).split(' ')[0];
  }
}
