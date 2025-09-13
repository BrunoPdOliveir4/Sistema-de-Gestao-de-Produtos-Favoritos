import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { decodedPayload } from 'src/common/types/payload';

function extractUser(ctx: ExecutionContext): any {
  const request = ctx.switchToHttp().getRequest();
  const authHeader = request.headers.authorization;
  const configService: ConfigService = request.app.get('ConfigService');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Token not found');
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtService = new JwtService({
      secret: configService.get<string>('jwtSecret'),
    });

    return jwtService.verify(token);
  } catch (err) {
    throw new UnauthorizedException('Invalid token' + err);
  }
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): decodedPayload => {
    return extractUser(ctx);
  },
);

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const user = extractUser(ctx);
    return user.sub;
  },
);
