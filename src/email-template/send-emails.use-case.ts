import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NonProfit } from '../non-profit/non-profit.entity';
import { NonProfitService } from '../non-profit/non-profit.service';
import { Repository } from 'typeorm';
import { EmailTemplateService } from './email-template.service';
import { SentEmail } from './sent-email.entity';

@Injectable()
export class SendEmailsUseCase {
  constructor(
    @InjectRepository(SentEmail)
    private readonly sentEmailRepository: Repository<SentEmail>,
    private readonly emailTemplateService: EmailTemplateService,
    private readonly nonProfitService: NonProfitService,
  ) {}

  private replaceMacros(template: string, nonProfit: NonProfit): string {
    return template
      .replace(/\{name\}/g, nonProfit.name)
      .replace(/\{address\}/g, nonProfit.address);
  }

  async sendEmail(templateId: number): Promise<void> {
    const template = await this.emailTemplateService.findOne(templateId);
    const nonProfits = await this.nonProfitService.findAll();
    const sentEmails: SentEmail[] = [];

    for (const nonProfit of nonProfits) {
      const subject = this.replaceMacros(template.subject, nonProfit);
      const body = this.replaceMacros(template.body, nonProfit);

      // Mock sending email
      console.log(`Sending email to ${nonProfit.email}: ${subject} \n body: ${body}`);

      const sentEmail = this.sentEmailRepository.create({
        sentAt: new Date(),
        template,
        nonProfit,
        subject,
        body,
      });
      sentEmails.push(sentEmail);
    }
    await this.sentEmailRepository.save(sentEmails);
  }
}