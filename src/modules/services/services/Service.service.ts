import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ServiceRepository } from '../repositories/Service.repository';
import { Service } from '../entities/Service.entity';
import { CreateServiceDto } from '../dtos/CreateService.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServiceService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly axios: HttpService,
  ) {}
  async findAll(): Promise<Service[]> {
    return this.repository.findAll();
  }

  async findByName(name: string): Promise<Service> {
    const service = await this.repository.findByName(name);
    if (!service) throw new NotFoundException('Serviço não encontrado');
    return service;
  }

  async create(service: CreateServiceDto) {
    await this.validateUrl(service.url);
    await this.ensureUniqueName(service.name);
    return this.createService(service);
  }

  private async validateUrl(url: string) {
    try {
      const response = await firstValueFrom(this.axios.get(url));
      if (response.status !== 200) {
        throw new BadRequestException("Url inválida!");
      }
    } catch {
      throw new BadRequestException("Não foi possível acessar a URL!");
    }
  }

  private async ensureUniqueName(name: string) {
    const serviceExists = await this.repository.findByName(name);
    if (serviceExists) {
      throw new BadRequestException("Já existe um serviço com esse nome!");
    }
  }

  private async createService(service: CreateServiceDto) {
    return await this.repository.create({
      ...service,
      createdAt: new Date(),
    });
  }


  async delete(id: string) {
    return await this.repository.delete(id);
  }

}
