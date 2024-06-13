import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonProfitModule } from 'src/non-profit/non-profit.module';
import { EmailTemplateController } from './email-template.controller';
import { EmailTemplate } from './email-template.entity';
import { EmailTemplateService } from './email-template.service';
import { SendEmailsUseCase } from './send-emails.use-case';
import { SentEmail } from './sent-email.entity';

@Module({
  imports: [
    NonProfitModule,
    TypeOrmModule.forFeature([EmailTemplate, SentEmail])
  ],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService, SendEmailsUseCase]
})
export class EmailTemplateModule {}
