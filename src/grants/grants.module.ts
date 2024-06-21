import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantsController } from './grants.controller';
import { Grants } from './grants.entity';
import { GrantsService } from './grants.service';
import { ParseCsvService } from './parse-csv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grants])],
  controllers: [GrantsController],
  providers: [ParseCsvService, GrantsService]
})
export class GrantsModule {}
