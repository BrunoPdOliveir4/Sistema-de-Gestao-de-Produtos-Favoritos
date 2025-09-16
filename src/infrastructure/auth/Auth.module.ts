import { Module } from '@nestjs/common';
import { AuthService } from './services/Auth.service';
import { ClientModule } from 'src/modules/clients/Client.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/Mail.module';
import { AuthController } from './controller/Auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
        global: true,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
            secret: config.get<string>('JWT_SECRET'),   
            signOptions: { expiresIn: '1y' },
        }),
    }),
        ClientModule, MailModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
