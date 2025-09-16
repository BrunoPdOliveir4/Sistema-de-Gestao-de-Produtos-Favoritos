import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheck } from './common/types/HealthCheck.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health-Check') 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<HealthCheck> {
    return await this.appService.getHealthCheck();
  }
}
