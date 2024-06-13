import { IsString, IsEmail } from 'class-validator';

export class CreateNonProfitDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;
}
