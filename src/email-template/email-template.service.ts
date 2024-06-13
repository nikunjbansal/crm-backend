import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from './email-template.entity';
import { SentEmail } from './sent-email.entity';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplate)
    private readonly emailTemplateRepository: Repository<EmailTemplate>,
    @InjectRepository(SentEmail)
    private readonly sentEmailRepository: Repository<SentEmail>,
  ) {}

  async findAll(): Promise<EmailTemplate[]> {
    return this.emailTemplateRepository.find();
  }

  async findOne(id: number): Promise<EmailTemplate> {
    const nonProfit = await this.emailTemplateRepository.findOne({ where: { id } });
    if (!nonProfit) {
      throw new NotFoundException(`Email Template with ID ${id} not found`);
    }
    return nonProfit;
  }

  async create(emailTemplate: EmailTemplate): Promise<EmailTemplate> {
    return this.emailTemplateRepository.save(emailTemplate);
  }

  async update(id: number, emailTemplate: EmailTemplate): Promise<EmailTemplate> {
    await this.emailTemplateRepository.update(id, emailTemplate);
    return this.findOne(id);
  }

  async findAllSentEmails(): Promise<SentEmail[]> {
    return await this.sentEmailRepository.find({ relations: { nonProfit: true, template: true } });
  }
}