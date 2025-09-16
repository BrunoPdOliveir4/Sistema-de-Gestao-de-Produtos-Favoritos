import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from '../services/Client.service';
import { CreateClientDto } from '../dtos/CreateClient.dto';
import { Role } from '../enums/Role.enum';
import { AuthGuard } from 'src/infrastructure/auth/guards/Auth.guard';
import { UserId } from 'src/infrastructure/decorators/UserId.decorator';

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getMe(@UserId() id: string) {
    return this.service.find(id);
  }

  @Post()
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
  @Delete()
  @HttpCode(204)
  async deleteMe(@UserId() id: string) {
    return this.service.delete(id);
  }
}
