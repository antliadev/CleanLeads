import { Module } from '@nestjs/common';
import { LeadsService } from './services/leads.service';
import { LeadsController } from './leads.controller';
import { MetricsController } from './metrics.controller';
import { FollowUpsController } from './follow-ups.controller';
import { NormalizationService } from './services/normalization.service';
import { ValidationService } from './services/validation.service';
import { DeduplicationService } from './services/deduplication.service';
import { FollowUpsService } from './services/follow-ups.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    LeadsService, 
    NormalizationService, 
    ValidationService, 
    DeduplicationService,
    FollowUpsService
  ],
  controllers: [LeadsController, MetricsController, FollowUpsController],
  exports: [LeadsService],
})
export class LeadsModule {}
