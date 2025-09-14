import { Controller, Get, Query, Param, UseInterceptors } from '@nestjs/common';
import { ProductService } from '../services/Product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('product')
@UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async getProductsFromDefaultService(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const service = 'default';
    return this.service.getProducts(service, limit, page);
  }

  @Get(':serviceName')
  async getProducts(
    @Param('serviceName') serviceName?: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.service.getProducts(serviceName, limit, page);
  }

  @Get(':serviceName/:productId')
  async getProductById(
    @Param('serviceName') serviceName: string,
    @Param('productId') productId: string,
  ) {
    console.log(serviceName, productId);
    return this.service.getProductById(serviceName, productId);
  }
}
