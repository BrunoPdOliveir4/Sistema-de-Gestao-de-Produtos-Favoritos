import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/modules/clients/entities/Client.entity';
import { Favorite } from 'src/modules/favorites/entities/Favorite.entity';
import { Service } from 'src/modules/services/entities/Service.entity';
import { DatabaseSeedService } from './SeedService';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [Client, Favorite, Service],
          synchronize: true,
          logging: true,
        };
      },
    }),
  ],
  providers: [DatabaseSeedService],
  exports: [DatabaseSeedService]
})
export class DatabaseModule {}
