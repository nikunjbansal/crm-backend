import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsInt, IsEnum, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export enum GrantType {
  OPERATING_GRANT = 'OPERATING_GRANT',
  PROJECT_GRANT = 'PROJECT_GRANT'
}

export class GrantsCsvRow {
  @IsString()
  @IsNotEmpty()
  nonprofitLegalName: string;

  @IsString()
  @IsNotEmpty()
  grantSubmissionName: string;

  @IsString()
  @IsNotEmpty()
  stage: string;

  @IsString()
  @IsNotEmpty()
  foundationOwner: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  requestedAmount: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  awardedAmount?: number;

  @IsEnum(GrantType)
  @IsNotEmpty()
  grantType: GrantType;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  durationStart: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  durationEnd: Date;

  @IsString()
  @IsOptional()
  additionalFileFolderPath?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  grantSubmissionId?: number;
}

export const GrantsCsvHeaderMapping = {
  'Nonprofit Legal Name': 'nonprofitLegalName',
  'Grant Submission Name': 'grantSubmissionName',
  'Stage': 'stage',
  'Foundation Owner': 'foundationOwner',
  'Requested Amount': 'requestedAmount',
  'Awarded Amount': 'awardedAmount',
  'Grant Type': 'grantType',
  'Tags': 'tags',
  'Duration Start': 'durationStart',
  'Duration End': 'durationEnd',
  'Additional File Folder Path': 'additionalFileFolderPath',
  'Grant Submission Id': 'grantSubmissionId'
};
