import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grants } from "./grants.entity";

@Injectable()
export class GrantsService {
  constructor(
    @InjectRepository(Grants)
    private readonly grantsRepository: Repository<Grants>
  ) {}

  async getAll(): Promise<Grants[]> {
    return await this.grantsRepository.find();
  }

  async save(grants: Grants[]) {
    await this.grantsRepository.delete({});
    await this.grantsRepository.save(grants);
  }

}