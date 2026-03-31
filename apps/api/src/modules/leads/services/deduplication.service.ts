import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Lead } from '@prisma/client';

@Injectable()
export class DeduplicationService {
  constructor(private prisma: PrismaService) {}

  async findDuplicate(data: {
    emailNormalized?: string | null;
    phoneNormalized?: string | null;
    linkedinNormalized?: string | null;
  }): Promise<Lead | null> {
    const { emailNormalized, phoneNormalized, linkedinNormalized } = data;

    if (emailNormalized) {
      const existing = await this.prisma.lead.findFirst({
        where: { emailNormalized, isDuplicate: false },
      });
      if (existing) return existing;
    }

    if (linkedinNormalized) {
      const existing = await this.prisma.lead.findFirst({
        where: { linkedinNormalized, isDuplicate: false },
      });
      if (existing) return existing;
    }

    if (phoneNormalized) {
      const existing = await this.prisma.lead.findFirst({
        where: { phoneNormalized, isDuplicate: false },
      });
      if (existing) return existing;
    }

    return null;
  }
}
