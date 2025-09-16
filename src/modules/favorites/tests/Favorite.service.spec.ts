import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from '../services/Favorite.service';
import { FavoriteRepository } from '../repositories/Favorite.repository';
import { ProductService } from '../../products/services/Product.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('FavoriteService', () => {
  let favoriteService: FavoriteService;
  let repository: FavoriteRepository;
  let productService: ProductService;

  const mockFavorite = {
    id: '1',
    productId: '100',
    client: { id: '1' },
    service: { id: '1', url: 'http://service.com' },
    createdAt: new Date(),
  };

  const mockProduct = { id: 100, name: 'Produto Teste' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteService,
        {
          provide: FavoriteRepository,
          useValue: {
            findClientFavoriteExists: jest.fn(),
            create: jest.fn(),
            findByClient: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ProductService,
          useValue: {
            verifyProductExists: jest.fn(),
            getProductByUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    favoriteService = module.get<FavoriteService>(FavoriteService);
    repository = module.get<FavoriteRepository>(FavoriteRepository);
    productService = module.get<ProductService>(ProductService);
  });

  describe('createFavorite', () => {
    it('deve criar um favorito com sucesso', async () => {
      (repository.findClientFavoriteExists as jest.Mock).mockResolvedValue(false);
      (productService.verifyProductExists as jest.Mock).mockResolvedValue(mockProduct);
      (repository.create as jest.Mock).mockResolvedValue(mockFavorite);

      const dto = { serviceId: '1', productId: '100' };
      const result = await favoriteService.createFavorite('1', dto);

      expect(repository.findClientFavoriteExists).toHaveBeenCalledWith('1', '100', '1');
      expect(productService.verifyProductExists).toHaveBeenCalledWith('1', '100');
      expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({
        clientId: '1',
        serviceId: '1',
        productId: '100',
      }));
      expect(result).toEqual({ ...mockProduct, favoriteId: '1' });
    });

    it('deve lançar BadRequestException se o favorito já existir', async () => {
      (repository.findClientFavoriteExists as jest.Mock).mockResolvedValue(true);
      const dto = { serviceId: '1', productId: '100' };
      await expect(favoriteService.createFavorite('1', dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAllFavoritesByClient', () => {
    it('deve retornar produtos favoritos filtrados', async () => {
      const favorites = [mockFavorite];
      (repository.findByClient as jest.Mock).mockResolvedValue(favorites);
      (productService.getProductByUrl as jest.Mock).mockResolvedValue([mockProduct]);

      const result = await favoriteService.getAllFavoritesByClient('1');

      expect(repository.findByClient).toHaveBeenCalledWith('1');
      expect(productService.getProductByUrl).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('getFavoriteById', () => {
    it('deve retornar um favorito pelo ID', async () => {
      (repository.find as jest.Mock).mockResolvedValue(mockFavorite);
      const result = await favoriteService.getFavoriteById('1');
      expect(result).toEqual(mockFavorite);
    });

    it('deve lançar NotFoundException se o favorito não existir', async () => {
      (repository.find as jest.Mock).mockResolvedValue(null);
      await expect(favoriteService.getFavoriteById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFavorite', () => {
    it('deve deletar o favorito se o usuário for o dono', async () => {
      (repository.find as jest.Mock).mockResolvedValue(mockFavorite);
      (repository.delete as jest.Mock).mockResolvedValue(undefined);

      await favoriteService.deleteFavorite('1', '1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('deve lançar ForbiddenException se o usuário não for o dono', async () => {
      (repository.find as jest.Mock).mockResolvedValue(mockFavorite);
      await expect(favoriteService.deleteFavorite('1', 'outroUsuario')).rejects.toThrow(ForbiddenException);
    });
  });
});
