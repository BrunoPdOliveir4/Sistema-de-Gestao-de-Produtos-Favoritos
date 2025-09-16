import { Controller, Get, Query, Param, UseInterceptors } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ProductService } from '../services/Product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Products')
@Controller('product')
@UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @Get()
  @ApiOperation({ summary: 'Listar produtos do serviço padrão' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número máximo de produtos',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  async getProductsFromDefaultService(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const service = 'default';
    return this.service.getProducts(service, limit, page);
  }

  @Get(':serviceName')
  @ApiOperation({ summary: 'Listar produtos de um serviço específico' })
  @ApiParam({
    name: 'serviceName',
    description: 'Nome do serviço',
    example: 'amazon',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número máximo de produtos',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  async getProducts(
    @Param('serviceName') serviceName?: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.service.getProducts(serviceName, limit, page);
  }

  @Get(':serviceName/:productId')
  @ApiOperation({ summary: 'Obter detalhes de um produto por ID e serviço' })
  @ApiParam({
    name: 'serviceName',
    description: 'Nome do serviço',
    example: 'amazon',
  })
  @ApiParam({
    name: 'productId',
    description: 'ID do produto',
    example: '12345',
  })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async getProductById(
    @Param('serviceName') serviceName: string,
    @Param('productId') productId: string,
  ) {
    return this.service.getProductById(serviceName, productId);
  }
}
