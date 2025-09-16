import { Module } from '@nestjs/common';
import { ProductService } from './services/Product.service';
import { ProductController } from './controllers/Product.controller';
import { HttpModule } from '@nestjs/axios';
import { ServiceModule } from '../services/Service.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register([
      {
        ttl: 25,
        max: 100,
      },
    ]),
    HttpModule,
    ServiceModule,
  ],
  controllers: [ProductController],
  providers: [ProductService
  ],
  exports: [ProductService],
})
export class ProductModule {}
