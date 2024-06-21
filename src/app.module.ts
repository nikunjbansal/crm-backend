import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonProfitModule } from './non-profit/non-profit.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { GrantsModule } from './grants/grants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "sqlite",
      "database": "nonprofits.sqlite",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    NonProfitModule,
    EmailTemplateModule,
    GrantsModule,
  ],
})
export class AppModule {}
