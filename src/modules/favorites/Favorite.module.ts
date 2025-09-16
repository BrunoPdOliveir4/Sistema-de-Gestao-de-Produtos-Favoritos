import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/Favorite.entity';
import { ProductModule } from '../products/Products.module';
import { FavoriteService } from './services/Favorite.service';
import { FavoriteRepository } from './repositories/Favorite.repository';
import { FavoriteController } from './controllers/Favorite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), ProductModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository],
  exports: [FavoriteService],
})
export class FavoriteModule {}
