import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from '../services/Service.service';
import { ServiceRepository } from '../repositories/Service.repository';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ServiceService', () => {
  let serviceService: ServiceService;
  let repository: ServiceRepository;
  let httpService: HttpService;

  const mockService = {
    id: '1',
    name: 'Teste',
    url: 'http://teste.com',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        {
          provide: ServiceRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    serviceService = module.get<ServiceService>(ServiceService);
    repository = module.get<ServiceRepository>(ServiceRepository);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('findAll', () => {
    it('deve retornar todos os serviços', async () => {
      (repository.findAll as jest.Mock).mockResolvedValue([mockService]);
      const result = await serviceService.findAll();
      expect(result).toEqual([mockService]);
    });
  });

  describe('findById', () => {
    it('deve retornar um serviço pelo ID', async () => {
      (repository.findById as jest.Mock).mockResolvedValue(mockService);
      const result = await serviceService.findById('1');
      expect(result).toEqual(mockService);
    });

    it('deve lançar NotFoundException se o serviço não existir', async () => {
      (repository.findById as jest.Mock).mockResolvedValue(null);
      await expect(serviceService.findById('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByName', () => {
    it('deve retornar um serviço pelo nome', async () => {
      (repository.findByName as jest.Mock).mockResolvedValue(mockService);
      const result = await serviceService.findByName('Teste');
      expect(result).toEqual(mockService);
    });

    it('deve lançar NotFoundException se o serviço não existir', async () => {
      (repository.findByName as jest.Mock).mockResolvedValue(null);
      await expect(serviceService.findByName('Desconhecido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    const dto = { name: 'Teste', url: 'http://teste.com' };

    it('deve criar um serviço com sucesso', async () => {
      (httpService.get as jest.Mock).mockReturnValue(of({ status: 200 }));
      (repository.findByName as jest.Mock).mockResolvedValue(null);
      (repository.create as jest.Mock).mockResolvedValue(mockService);

      const result = await serviceService.create(dto);
      expect(result).toEqual(mockService);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining(dto),
      );
    });

    it('deve lançar BadRequestException se a URL for inválida', async () => {
      (httpService.get as jest.Mock).mockReturnValue(
        throwError(() => new Error('fail')),
      );
      await expect(serviceService.create(dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('deve lançar BadRequestException se já existir um serviço com o mesmo nome', async () => {
      (httpService.get as jest.Mock).mockReturnValue(of({ status: 200 }));
      (repository.findByName as jest.Mock).mockResolvedValue(mockService);

      await expect(serviceService.create(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('delete', () => {
    it('deve deletar um serviço pelo ID', async () => {
      (repository.delete as jest.Mock).mockResolvedValue(true);
      const result = await serviceService.delete('1');
      expect(result).toBe(true);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
