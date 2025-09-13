import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ProductService {
    constructor(
        private readonly axios: HttpService
    ){}

    async getProducts(name: string){
        return;
    }

    async getProductById(name:string, id: string){
        return;
    }
}