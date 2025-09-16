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
import { ServiceService } from '../services/Service.service';
import { CreateServiceDto } from '../dtos/CreateService.dto';
import { AuthGuard } from 'src/infrastructure/auth/guards/Auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/Roles.guard';
import { Roles } from 'src/infrastructure/decorators/Roles.decorator';
import { Role } from 'src/modules/clients/enums/Role.enum';

//**A proposta é no futuro fazer roles e, apenas o findAll e findByName serão públicas. */
@Controller('service')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Get()
  async findAllServices() {
    return this.service.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  @Post()
  async create(@Body() data: CreateServiceDto) {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
