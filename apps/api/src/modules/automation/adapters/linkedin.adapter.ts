import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Lead } from '@prisma/client';

export interface LinkedinInteractionResult {
  success: boolean;
  interactionId?: string;
  error?: string;
  statusText?: string;
}

export abstract class ILinkedinAdapter {
  abstract sendConnectionRequest(lead: Lead, message?: string): Promise<LinkedinInteractionResult>;
  abstract sendMessage(lead: Lead, message: string): Promise<LinkedinInteractionResult>;
}

@Injectable()
export class AssistedLinkedinAdapter extends ILinkedinAdapter {
  constructor(private prisma: PrismaService) {
    super();
  }

  async sendConnectionRequest(lead: Lead, message?: string): Promise<LinkedinInteractionResult> {
    return {
      success: true,
      statusText: 'ASSISTED_READY',
    };
  }

  async sendMessage(lead: Lead, message: string): Promise<LinkedinInteractionResult> {
    return {
      success: true,
      statusText: 'ASSISTED_READY',
    };
  }
}
