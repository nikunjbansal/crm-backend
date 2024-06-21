import { Injectable, BadRequestException } from '@nestjs/common';
import { Grants } from './grants.entity';
import * as csvParser from 'csv-parser';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GrantsCsvRow, GrantsCsvHeaderMapping } from './grants-csv-row.types';
import { Readable } from 'stream';

@Injectable()
export class ParseCsvService {
  constructor() {}

  async parseCsv(csvContent: string): Promise<Grants[]> {
    const results = [];
    const stream = Readable.from(csvContent);
    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (data) => results.push(this.transformRow(data)))
        .on('end', async () => {
          try {
            let grants: Grants[] = [];
            for (const row of results) {
              const validatedRow = await this.validateCsvRow(row);
              const entity = this.mapRowToEntity(validatedRow);
              grants.push(entity);
            }
            resolve(grants);
          } catch (error) {
            console.error('Error processing row:', error);
            reject(new BadRequestException('CSV row validation failed'));
          }
        })
        .on('error', (error) => reject(error));
    });
  }

  transformRow(row: {[key: string]: string}): any {
    const transformedRow = {};
    for (const [header, value] of Object.entries(row)) {
      const cleanHeader = GrantsCsvHeaderMapping[header.trim()] || header;
      if (cleanHeader === 'durationStart' || cleanHeader === 'durationEnd') {
        transformedRow[cleanHeader] = new Date(value);
      } else if (cleanHeader === 'requestedAmount' || cleanHeader === 'awardedAmount') {
        const numericValue = parseFloat(value.replace(/[$,]/g, '').trim());
        transformedRow[cleanHeader] = numericValue;
      } else if (cleanHeader === 'tags') {
        transformedRow[cleanHeader] = value.split(',').map(tag => tag.trim());
      } else {
        transformedRow[cleanHeader] = value || undefined;
      }
    }
    return transformedRow;
  }

  async validateCsvRow(row: any): Promise<GrantsCsvRow> {
    const validatedRow = plainToClass(GrantsCsvRow, row);
    const errors = await validate(validatedRow);
    if (errors.length > 0) {
      throw new BadRequestException(`Validation failed: ${errors}`);
    }
    return validatedRow;
  }

  mapRowToEntity(row: GrantsCsvRow): Grants {
    const entity = new Grants();
    entity.nonprofitLegalName = row.nonprofitLegalName;
    entity.grantSubmissionName = row.grantSubmissionName;
    entity.stage = row.stage;
    entity.foundationOwner = row.foundationOwner;
    entity.requestedAmount = row.requestedAmount;
    entity.awardedAmount = row.awardedAmount;
    entity.grantType = row.grantType;
    entity.tags = row.tags;
    entity.durationStart = row.durationStart;
    entity.durationEnd = row.durationEnd;
    entity.additionalFileFolderPath = row.additionalFileFolderPath;
    entity.grantSubmissionId = row.grantSubmissionId;
    return entity;
  }
}
