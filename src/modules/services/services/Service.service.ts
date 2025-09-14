import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ServiceRepository } from '../repositories/Service.repository';
import { Service } from '../entities/Service.entity';
import { CreateServiceDto } from '../dtos/CreateService.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}
  async findAll(): Promise<Service[]> {
    return this.repository.findAll();
  }

  async findByName(name: string): Promise<Service> {
    const service = await this.repository.findByName(name);
    if (!service) throw new NotFoundException('Serviço não encontrado');
    return service;
  }

  async create(service: CreateServiceDto) {
    //verificar se já existe um serviço com o mesmo nome
    const serviceExists = await this.repository.findByName(service.name);
    if (!serviceExists) {
      return await this.repository.create({
        ...service,
        createdAt: new Date(),
      });
    }
    throw new BadRequestException('Já existe um serviço com esse nome!');
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
