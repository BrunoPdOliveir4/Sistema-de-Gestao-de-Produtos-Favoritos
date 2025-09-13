import { Module } from "@nestjs/common";
import { ProductService } from "./services/Product.service";

@Module({
    imports: [],
    controllers: [],
    providers: [ProductService],
    exports: [],

})
export class ProductModule {};