import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NonProfit } from './non-profit.entity';
import { CreateNonProfitDto } from './dto/create-non-profit.dto';
import { UpdateNonProfitDto } from './dto/update-non-profit.dto';

@Injectable()
export class NonProfitService {
  constructor(
    @InjectRepository(NonProfit)
    private nonProfitRepository: Repository<NonProfit>,
  ) {}

  async findAll(): Promise<NonProfit[]> {
    return this.nonProfitRepository.find();
  }

  async findOne(id: number): Promise<NonProfit> {
    const nonProfit = await this.nonProfitRepository.findOne({ where: { id } });
    if (!nonProfit) {
      throw new NotFoundException(`NonProfit with ID ${id} not found`);
    }
    return nonProfit;
  }

  async create(createNonProfitDto: CreateNonProfitDto): Promise<NonProfit> {
    const nonProfit = this.nonProfitRepository.create(createNonProfitDto);
    return this.nonProfitRepository.save(nonProfit);
  }

  async update(id: number, updateNonProfitDto: UpdateNonProfitDto): Promise<NonProfit> {
    const nonProfit = await this.findOne(id);
    Object.assign(nonProfit, updateNonProfitDto);
    return this.nonProfitRepository.save(nonProfit);
  }
}
