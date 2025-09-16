import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServiceService } from '../services/Service.service';
import { CreateServiceDto } from '../dtos/CreateService.dto';
import { AuthGuard } from 'src/infrastructure/auth/guards/Auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/Roles.guard';
import { Roles } from 'src/infrastructure/decorators/Roles.decorator';
import { Role } from 'src/modules/clients/enums/Role.enum';

@ApiTags('Services')
@Controller('service')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os serviços' })
  @ApiResponse({
    status: 200,
    description: 'Lista de serviços retornada com sucesso.',
  })
  async findAllServices() {
    return this.service.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Buscar um serviço pelo nome' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado.' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado.' })
  async findByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo serviço (Apenas ADMIN)' })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() data: CreateServiceDto) {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir um serviço pelo ID (Apenas ADMIN)' })
  @ApiResponse({ status: 204, description: 'Serviço excluído com sucesso.' })
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
