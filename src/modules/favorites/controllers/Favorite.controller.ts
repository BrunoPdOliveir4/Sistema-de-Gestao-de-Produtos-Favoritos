import { Controller } from '@nestjs/common';
import { FavoriteService } from '../services/Favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}
}
