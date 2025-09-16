import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../services/Client.service';
import { ClientRepository } from '../repositories/Client.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

describe('ClientService', () => {
  let clientService: ClientService;
  let repository: ClientRepository;

  const mockClient = { id: '1', email: 'teste@example.com', name: 'Teste' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: ClientRepository,
          useValue: {
            find: jest.fn(),
            findByEmail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  describe('find', () => {
    it('deve retornar um cliente pelo ID', async () => {
      (repository.find as jest.Mock).mockResolvedValue(mockClient);
      const result = await clientService.find('1');
      expect(result).toEqual(mockClient);
    });

    it('deve lançar NotFoundException se o cliente não existir', async () => {
      (repository.find as jest.Mock).mockResolvedValue(null);
      await expect(clientService.find('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByEmail', () => {
    it('deve retornar um cliente pelo email', async () => {
      (repository.findByEmail as jest.Mock).mockResolvedValue(mockClient);
      const result = await clientService.findByEmail('teste@example.com');
      expect(result).toEqual(mockClient);
    });

    it('deve lançar NotFoundException se o cliente não existir', async () => {
      (repository.findByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        clientService.findByEmail('desconhecido@example.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('deve criar um novo cliente com sucesso', async () => {
      const dto = { email: 'novo@example.com', name: 'Novo Cliente' };
      (repository.findByEmail as jest.Mock).mockResolvedValue(null);
      (repository.create as jest.Mock).mockResolvedValue({ id: '2', ...dto });

      const result = await clientService.create(dto);
      expect(result).toEqual({ id: '2', ...dto });
      expect(repository.create).toHaveBeenCalledWith(dto);
    });

    it('deve lançar NotFoundException se o email não for fornecido', async () => {
      await expect(clientService.create({ name: 'Sem Email' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar BadRequestException se o email já existir', async () => {
      const dto = { email: 'teste@example.com', name: 'Teste' };
      (repository.findByEmail as jest.Mock).mockResolvedValue(mockClient);

      await expect(clientService.create(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar um cliente', async () => {
      const updateResult: UpdateResult = { affected: 1, raw: {} } as any;
      (repository.update as jest.Mock).mockResolvedValue(updateResult);

      const result = await clientService.update('1', { name: 'Atualizado' });
      expect(result).toEqual(updateResult);
      expect(repository.update).toHaveBeenCalledWith('1', {
        name: 'Atualizado',
      });
    });
  });

  describe('delete', () => {
    it('deve deletar um cliente pelo ID', async () => {
      (repository.delete as jest.Mock).mockResolvedValue(undefined);

      await clientService.delete('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
