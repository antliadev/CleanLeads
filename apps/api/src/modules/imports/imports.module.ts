import { Module } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { ImportsController } from './imports.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [PrismaModule, LeadsModule],
  providers: [ImportsService],
  controllers: [ImportsController],
})
export class ImportsModule {}
