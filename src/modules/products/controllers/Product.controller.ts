import { Controller, Get, Query, Param } from "@nestjs/common";
import { ProductService } from "../services/Product.service";

@Controller('Product')
export class ProductController{
    constructor(
        private readonly service: ProductService
    ){}

    @Get(':serviceName')
    async getProducts(@Param('serviceName') serviceName: string, @Query('page') page){
        return this.service.getProducts(serviceName)
    }

    @Get(':serviceName/:productId')
    async getProductById(@Param('serviceName') serviceName: string, @Param('productId') productId: string){
        return this.service.getProductById(serviceName, productId)
    }

}