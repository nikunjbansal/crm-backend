import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GrantType } from './grants-csv-row.types';

@Entity()
export class Grants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nonprofitLegalName: string;

  @Column()
  grantSubmissionName: string;

  @Column()
  stage: string;

  @Column()
  foundationOwner: string;

  @Column('decimal', { precision: 10, scale: 2 })
  requestedAmount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  awardedAmount?: number;

  @Column()
  grantType: GrantType;

  @Column('json')
  tags?: string[];

  @Column('date')
  durationStart: Date;

  @Column('date')
  durationEnd: Date;

  @Column({ nullable: true })
  additionalFileFolderPath?: string;

  @Column({ nullable: true })
  grantSubmissionId?: number;
}
