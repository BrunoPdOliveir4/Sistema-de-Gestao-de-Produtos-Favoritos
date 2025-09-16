import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/modules/clients/services/Client.service';
import { DecodedPayload, Payload } from 'src/common/types/AuthPayload.type';
import { Client } from 'src/modules/clients/entities/Client.entity';
import { MailService } from 'src/infrastructure/mail/service/Mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly clientService: ClientService,
    private readonly mailService: MailService
) {}

  async getJwt(client: Payload) {
    const payload: DecodedPayload = { sub: client.id, email: client.email, role: client.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1y' });
    const {email} = client;
    await this.mailService.sendVerificationEmail(email, token);
    return { message: `A sua API-Key foi enviada para o email: ${email}` };
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async getNewJwt(email){
    const payload:Client = await this.clientService.findByEmail(email);
    return this.getJwt({id: payload.id, email: payload.email, role: payload.role})
  }
}
