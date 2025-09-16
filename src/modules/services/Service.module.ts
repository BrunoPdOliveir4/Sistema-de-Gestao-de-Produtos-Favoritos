import { Module } from '@nestjs/common';
import { ServiceService } from './services/Service.service';
import { ServiceRepository } from './repositories/Service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/Service.entity';
import { ServiceController } from './controllers/Service.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Service]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    HttpModule
  ],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService],
})
export class ServiceModule {}
