import { Injectable } from '@nestjs/common';
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

  async getProductById(name: string, id: string) {
    const service = await this.serviceService.findByName(name);
    const response = await firstValueFrom(
      this.axios.get(`${service.url}/${id}`),
    );
    return response.data;
  }
  
}
