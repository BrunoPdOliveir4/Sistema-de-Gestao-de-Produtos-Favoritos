import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../repositories/Client.repository';
import { Client } from '../entities/Client.entity';
import { UpdateResult } from 'typeorm';
import { CreateClientDto } from '../dtos/CreateClient.dto';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async find(id: string): Promise<Client> {
    const client = await this.repository.find(id);
    if (!client) throw new NotFoundException('Client não encontrado');
    return client;
  }

  async create(data: Partial<CreateClientDto>): Promise<Client> {
    if (!data.email) {
      throw new NotFoundException('Email é obrigatório');
    }
    const alreadyExists = await this.repository.findByEmail(data.email);
    if(!alreadyExists){
      const client = await this.repository.create(data);

      /**
       * Enviar email
       */
      return client;
    }
    throw new BadRequestException("Já existe um usuário com este email.")
  }

  async update(id: string, data: Partial<Client>): Promise<UpdateResult> {
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

}
