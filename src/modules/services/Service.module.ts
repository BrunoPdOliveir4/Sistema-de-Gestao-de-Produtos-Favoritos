import { Module } from '@nestjs/common';
import { ServiceService } from './services/Service.service';
import { ServiceRepository } from './repositories/Service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/Service.entity';
import { ServiceController } from './controllers/Service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService],
})
export class ServiceModule {}
