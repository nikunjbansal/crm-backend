import { PartialType } from '@nestjs/mapped-types';
import { CreateNonProfitDto } from './create-non-profit.dto';

export class UpdateNonProfitDto extends PartialType(CreateNonProfitDto) {}
