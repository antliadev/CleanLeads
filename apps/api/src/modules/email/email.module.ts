import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { IEmailProvider, SendGridProvider } from './providers/sendgrid.provider';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    EmailService,
    {
      provide: IEmailProvider,
      useClass: SendGridProvider,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
