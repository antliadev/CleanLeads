import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ImportsModule } from './modules/imports/imports.module';
import { LeadsModule } from './modules/leads/leads.module';
import { AutomationModule } from './modules/automation/automation.module';
import { EmailModule } from './modules/email/email.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { BullModule } from '@nestjs/bullmq';

// Build Timestamp: 2026-03-29T01:15:00Z
@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ImportsModule,
    LeadsModule,
    AutomationModule,
    EmailModule,
    TemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
