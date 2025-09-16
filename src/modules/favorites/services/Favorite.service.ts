import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteRepository } from '../repositories/Favorite.repository';
import { ProductService } from '../../products/services/Product.service';
import { Favorite } from '../entities/Favorite.entity';
import { CreateFavoriteDto } from '../dtos/CreateFavorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly repository: FavoriteRepository,
    private readonly productService: ProductService,
  ) {}

  async createFavorite(clientId: string, data: CreateFavoriteDto) {
    await this.ensureFavoriteDoesNotExist(clientId, data);

    const product = await this.verifyProduct(data);

    const favorite = await this.saveFavorite(clientId, data);

    return this.buildFavoriteResponse(product, favorite.id);
  }

  async getAllFavoritesByClient(clientId: string) {
    const favorites = await this.repository.findByClient(clientId);
    const services = this.getLatestFavoritesByService(favorites);
    const products = await this.fetchProductsForServices(services);
    const filteredProducts = this.filterProducts(favorites, products);
    return filteredProducts;
  }

  async getFavoriteById(id:string){
    const favorite = await this.repository.find(id);
    if(!favorite) throw new NotFoundException("Favorite not Found!")
    return favorite;
  }

  async deleteFavorite(id, userId) {
    const favorite = await this.getFavoriteById(id);
    if(favorite.client.id === userId){
      await this.repository.delete(id);
      return;
    }
    throw new ForbiddenException("Você não tem permissão para deletar este favorito.")
  }

  //Funções auxiliares do GET
  private getLatestFavoritesByService(
    favorites: Favorite[],
  ): { url: string; productId: string }[] {
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

  private async fetchProductsForServices(
    services: { url: string; productId: string }[],
  ) {
    const promises = services.map((svc) =>
      this.productService.getProductByUrl(svc.url, Number(svc.productId), 1),
    );

    const results = await Promise.all(promises);

    return results.flat();
  }

  private filterProducts(favorites: Favorite[], products: any[]) {
    const favoriteProductIds = new Set(favorites.map((fav) => fav.productId));

    return products.filter((product) =>
      favoriteProductIds.has(String(product.id)),
    );
  }
  
  private async ensureFavoriteDoesNotExist(clientId: string, data: CreateFavoriteDto) {
    const exists = await this.repository.findClientFavoriteExists(
      data.serviceId,
      data.productId,
      clientId,
    );

    if (exists) {
      throw new BadRequestException('Este produto já é seu favorito!');
    }
  }

  //Funções auxiliares do POST

  private async verifyProduct(data: CreateFavoriteDto) {
    return this.productService.verifyProductExists(
      data.serviceId,
      data.productId,
    );
  }

  private async saveFavorite(clientId: string, data: CreateFavoriteDto) {
    return this.repository.create({
      clientId,
      serviceId: data.serviceId,
      productId: data.productId,
      createdAt: new Date(),
    });
  }

  private buildFavoriteResponse(product: any, favoriteId: string) {
    return {
      ...product,
      favoriteId,
    };
  }

  
}
