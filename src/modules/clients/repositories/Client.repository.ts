import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from '../entities/Client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async find(id: string): Promise<Client | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(data: Partial<Client>): Promise<Client> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Client>): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
