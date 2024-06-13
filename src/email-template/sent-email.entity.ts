import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmailTemplate } from './email-template.entity';
import { NonProfit } from '../non-profit/non-profit.entity';

@Entity()
export class SentEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sentAt: Date;

  @ManyToOne(() => EmailTemplate, (template) => template.sentEmails)
  template: EmailTemplate;

  @ManyToOne(() => NonProfit, (nonProfit) => nonProfit.sentEmails)
  nonProfit: NonProfit;

  @Column()
  subject: string;

  @Column()
  body: string;
}