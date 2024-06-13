import { SentEmail } from '../email-template/sent-email.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class NonProfit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @OneToMany(() => SentEmail, (sentEmail) => sentEmail.nonProfit)
  sentEmails: SentEmail[];
}
