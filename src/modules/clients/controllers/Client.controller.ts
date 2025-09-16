import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientService } from '../services/Client.service';
import { CreateClientDto } from '../dtos/CreateClient.dto';
import { Role } from '../enums/Role.enum';
import { AuthGuard } from 'src/infrastructure/auth/guards/Auth.guard';
import { UserId } from 'src/infrastructure/decorators/UserId.decorator';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Retorna os dados do usuário logado' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário retornados com sucesso.',
  })
  async getMe(@UserId() id: string) {
    return this.service.find(id);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async createClient(@Body() client: CreateClientDto) {
    if (!client.role) client.role = Role.USER;

    const registeredClient = await this.service.create(client);

    return {
      registeredClient,
      message:
        'Você foi registrado, agora para retirar seu token deve fazer uma requisição em: /auth/{your email}',
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir a conta do usuário logado' })
  @ApiResponse({ status: 204, description: 'Conta excluída com sucesso.' })
  async deleteMe(@UserId() id: string) {
    return this.service.delete(id);
  }
}
