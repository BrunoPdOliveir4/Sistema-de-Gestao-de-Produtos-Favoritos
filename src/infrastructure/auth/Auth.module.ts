import { Module } from '@nestjs/common';
import { AuthService } from './services/Auth.service';
import { ClientModule } from 'src/modules/clients/Client.module';
import { MailModule } from '../mail/Mail.module';
import { AuthController } from './controller/Auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
