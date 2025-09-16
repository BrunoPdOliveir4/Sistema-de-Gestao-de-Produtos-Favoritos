import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entities/Favorite.entity';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,
  ) {}

  async find(id: string): Promise<Favorite | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByService(id: string): Promise<Favorite[]> {
    return this.repository.find({ where: { service: { id } } });
  }

  async findByClient(id: string): Promise<Favorite[]> {
    return this.repository.find({
      where: { client: { id } },
      relations: ['service'],
    });
  }

  async findClientFavoriteExists(
    serviceId,
    productId,
    clientId
  ): Promise<Favorite | null> {
    return this.repository.findOne({
      where: { service: { id: serviceId }, productId, client: {id: clientId} },
      relations: ['service'],
    });
  }

  async create({
    clientId,
    serviceId,
    productId,
    createdAt,
  }): Promise<Favorite> {
    return this.repository.save({
      client: { id: clientId },
      service: { id: serviceId },
      productId,
      created_at: createdAt,
    });
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
