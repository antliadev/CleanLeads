import { Module } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { AutomationController } from './automation.controller';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from '../prisma/prisma.module';
import { ILinkedinAdapter, AssistedLinkedinAdapter } from './adapters/linkedin.adapter';
import { AutomationProcessor } from './automation.processor';
import { AutomationGateway } from './automation.gateway';
import { BrowserAutomationService } from './services/browser-automation.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'automation',
    }),
  ],
  providers: [
    AutomationService,
    AutomationProcessor,
    AutomationGateway,
    BrowserAutomationService,
    {
      provide: ILinkedinAdapter,
      useClass: AssistedLinkedinAdapter,
    },
  ],
  controllers: [AutomationController],
  exports: [AutomationService],
})
export class AutomationModule {}
