import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Service } from '../entities/Service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Service | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByIds(ids: string[]): Promise<Service[]> {
    return this.repository.find({
      where: { id: In(ids) },
    });
  }

  async findByName(name: string): Promise<Service | null> {
    return this.repository.findOne({ where: { name } });
  }

  async create(data: Partial<Service>): Promise<Service> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Service>): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
