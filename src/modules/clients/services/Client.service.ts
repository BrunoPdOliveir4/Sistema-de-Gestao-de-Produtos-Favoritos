import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../repositories/Client.repository';
import { Client } from '../entities/Client.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async find(id: string): Promise<Client> {
    const client = await this.repository.find(id);
    if (!client) throw new NotFoundException('Client não encontrado');
    return client;
  }

  async create(data: Partial<Client>): Promise<Client> {
    return await this.repository.create(data);
  }

  async update(id: string, data: Partial<Client>): Promise<UpdateResult> {
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  // MELHORAR ISTO PQ NÃO TÁ MT COERENTE
}
