import { BadRequestException, Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../repositories/Favorite.repository';
import { ProductService } from 'src/modules/products/services/Product.service';
import { ServiceWithProduct } from '../types/ServiceWithProduct.type';
import { Favorite } from '../entities/Favorite.entity';
import { CreateFavoriteDto } from '../dtos/CreateFavorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly repository: FavoriteRepository,
    private readonly productService: ProductService
  ) {}

  async createFavorite(clientId, data: CreateFavoriteDto){
    const favoriteExists = await this.repository.findByServiceAndProduct(data.serviceId, data.productId);
    if(favoriteExists){
      throw new BadRequestException("Este produto já é seu favorito!")
    }
    await this.productService.verifyProductExists(data.serviceId, data.productId)
    
    return this.repository.create({
      clientId,
      serviceId: data.serviceId,
      productId: data.productId,
      createdAt: new Date()
    })
  }

  async deleteFavorite(id){
    await this.repository.delete(id);
  }

  async getAllFavoritesByClient(clientId: string){
    const favorites = await this.repository.findByClient(clientId);
    const services = this.getLatestFavoritesByService(favorites);
  }

  private getLatestFavoritesByService(favorites: Favorite[]): { url: string; productId: string }[] {
    const grouped = new Map<string, { url: string; productId: string }>();

    for (const fav of favorites) {
      const serviceId = fav.service.id;
      const serviceUrl = fav.service.url;

      const current = grouped.get(serviceId);
      if (!current || BigInt(fav.productId) > BigInt(current.productId)) {
        grouped.set(serviceId, { url: serviceUrl, productId: fav.productId });
      }
    }

    return Array.from(grouped.values());
  }

  private async fetchProductsForServices(services: { url: string; productId: string }[]) {
    const promises = services.map(svc =>
      this.productService.getProducts(svc.url, Number(svc.productId), 1)
    );

    const results = await Promise.all(promises);

    return results.flat(); 
  }

}
