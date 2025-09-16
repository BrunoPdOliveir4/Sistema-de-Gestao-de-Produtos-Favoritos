import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceService } from 'src/modules/services/services/Service.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly axios: HttpService,
    private readonly serviceService: ServiceService,
  ) {}
  async getProducts(name, limit: number, page: number) {
    const service =
      name === 'default'
        ? { url: 'https://fakestoreapi.com/products' }
        : await this.serviceService.findByName(name);

    const response = await firstValueFrom(
      this.axios.get(`${service.url}?limit=${limit}&page=${page}`),
    );
    return response.data;
  }

  async getProductById(name: string, productId: string) {
    const service = await this.serviceService.findByName(name);
    const product = await this.requestById(service.url, productId)
    return product;
  }

  async verifyProductExists(serviceId:string, productId:string){
    const service = await this.serviceService.findById(serviceId);
    await this.requestById(service.url, productId);
    return; // Não preciso retornar nada porque não salvo dados do produto
  }

  async requestById(url, id){
    try {
      const response = await firstValueFrom( this.axios.get(`${url}/${id}`));
      if (response.status !== 200) {
        throw new BadRequestException('Url inválida!');
      }
      return response.data;
    } catch {
      throw new BadRequestException('Não foi possível acessar a URL!');
    }
  }
}
