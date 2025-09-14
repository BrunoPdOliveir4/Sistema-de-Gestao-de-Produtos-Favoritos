import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ServiceService } from '../services/Service.service';
import { CreateServiceDto } from '../dtos/CreateService.dto';

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

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
