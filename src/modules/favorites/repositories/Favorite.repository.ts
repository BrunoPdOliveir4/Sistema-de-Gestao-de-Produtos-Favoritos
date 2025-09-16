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

  async findByService(id: string): Promise<Favorite | null> {
    return this.repository.findOne({ where: { service: {id} } });
  }

  async findByClient(id: string): Promise<Favorite | null> {
    return this.repository.findOne({ where: { client: {id} } });
  }

  async create(data: Partial<Favorite>): Promise<Favorite> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Favorite>): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
