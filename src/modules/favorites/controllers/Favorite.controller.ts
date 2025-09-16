import { Controller, Post } from '@nestjs/common';
import { FavoriteService } from '../services/Favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Post()
  async create(){
    
  }
}
