import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { DatabaseModule } from './infrastructure/database/Database.module';
import { ProductModule } from './modules/products/Products.module';
import { ServiceModule } from './modules/services/Service.module';
import { ClientModule } from './modules/clients/Client.module';
import { FavoriteModule } from './modules/favorites/Favorite.module';
import { AuthModule } from './infrastructure/auth/Auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'basic',
          ttl: 60000,
          limit: 100
        },
        {
          name: 'prioritary',
          ttl: 60000,
          limit: 10
        }
      ]
    }),
    DatabaseModule,
    ProductModule,
    ServiceModule,
    ClientModule,
    FavoriteModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
