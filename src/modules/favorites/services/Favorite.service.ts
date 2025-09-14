import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../repositories/Favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly repository: FavoriteRepository) {}
}
