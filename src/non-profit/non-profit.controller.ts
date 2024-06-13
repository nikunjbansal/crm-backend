import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { NonProfitService } from './non-profit.service';
import { CreateNonProfitDto } from './dto/create-non-profit.dto';
import { UpdateNonProfitDto } from './dto/update-non-profit.dto';
import { NonProfit } from './non-profit.entity';

@Controller('non-profits')
export class NonProfitController {
  constructor(private readonly nonProfitService: NonProfitService) {}

  @Get()
  async findAll(): Promise<NonProfit[]> {
    return this.nonProfitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<NonProfit> {
    return this.nonProfitService.findOne(id);
  }

  @Post()
  async create(@Body() createNonProfitDto: CreateNonProfitDto): Promise<NonProfit> {
    return this.nonProfitService.create(createNonProfitDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateNonProfitDto: UpdateNonProfitDto,
  ): Promise<NonProfit> {
    return this.nonProfitService.update(id, updateNonProfitDto);
  }
}
