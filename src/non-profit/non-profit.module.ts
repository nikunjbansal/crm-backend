import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonProfitService } from './non-profit.service';
import { NonProfitController } from './non-profit.controller';
import { NonProfit } from './non-profit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NonProfit])],
  providers: [NonProfitService],
  controllers: [NonProfitController],
  exports: [NonProfitService]
})
export class NonProfitModule {}
