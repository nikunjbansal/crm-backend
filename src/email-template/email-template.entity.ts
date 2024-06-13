import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SentEmail } from './sent-email.entity';

@Entity()
export class EmailTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  body: string;

  @OneToMany(() => SentEmail, (sentEmail) => sentEmail.template)
  sentEmails: SentEmail[];
}