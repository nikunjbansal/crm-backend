import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmailTemplate } from './email-template.entity';
import { EmailTemplateService } from './email-template.service';
import { SendEmailsUseCase } from './send-emails.use-case';
import { SentEmail } from './sent-email.entity';

@Controller('email-templates')
export class EmailTemplateController {
  constructor(
    private readonly emailTemplateService: EmailTemplateService,
    private readonly sendEmailsUseCase: SendEmailsUseCase,
  ) {}

  @Get()
  async findAll(): Promise<EmailTemplate[]> {
    return this.emailTemplateService.findAll();
  }

  @Get('sent-emails')
  async findAllSentEmails(): Promise<SentEmail[]> {
    return await this.emailTemplateService.findAllSentEmails();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmailTemplate> {
    return this.emailTemplateService.findOne(+id);
  }

  @Post()
  async create(@Body() emailTemplate: EmailTemplate): Promise<EmailTemplate> {
    return this.emailTemplateService.create(emailTemplate);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() emailTemplate: EmailTemplate): Promise<EmailTemplate> {
    return this.emailTemplateService.update(+id, emailTemplate);
  }

  @Post(':id/send')
  async sendEmail(@Param('id') id: number) {
    await this.sendEmailsUseCase.sendEmail(id);
  }
}