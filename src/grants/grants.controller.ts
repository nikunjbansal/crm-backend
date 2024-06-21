import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Grants } from './grants.entity';
import { GrantsService } from './grants.service';
import { ParseCsvService } from './parse-csv.service';

@Controller('grants')
export class GrantsController {
  constructor(
    private readonly parseCsvService: ParseCsvService,
    private readonly grantsService: GrantsService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const grants = await this.parseCsvService.parseCsv(file.buffer.toString());
    await this.grantsService.save(grants);
    return { message: 'File processed successfully', grants };
  }

  @Get('/')
  async getGrants(): Promise<Grants[]> {
    return await this.grantsService.getAll();
  }
}
