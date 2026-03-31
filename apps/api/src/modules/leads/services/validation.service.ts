import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  isValidEmail(email: string | null): boolean {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  isValidPhone(phone: string | null): boolean {
    if (!phone) return false;
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 13;
  }

  isValidLinkedin(url: string | null): boolean {
    if (!url) return false;
    return url.includes('linkedin.com/in/');
  }

  extractEmailDomain(email: string | null): string {
    if (!this.isValidEmail(email)) return '';
    return email?.split('@')[1] || '';
  }
}
