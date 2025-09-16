import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { DatabaseModule } from './infrastructure/database/Database.module';
import { ProductModule } from './modules/products/Products.module';
import { ServiceModule } from './modules/services/Service.module';
import { ClientModule } from './modules/clients/Client.module';
import { FavoriteModule } from './modules/favorites/Favorite.module';
import { AuthModule } from './infrastructure/auth/Auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RequestCounterMiddleware } from './infrastructure/middleware/RequestCounter.middleware';
import { JwtModule } from '@nestjs/jwt';

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
          limit: 100,
        },
        {
          name: 'prioritary',
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
    DatabaseModule,
    ProductModule,
    ServiceModule,
    ClientModule,
    FavoriteModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestCounterMiddleware).forRoutes('*');
  }
}
