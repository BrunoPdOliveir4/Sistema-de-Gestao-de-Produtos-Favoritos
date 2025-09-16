import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DecodedPayload } from 'src/common/types/AuthPayload.type';

function extractUser(ctx: ExecutionContext): any {
  const request = ctx.switchToHttp().getRequest();
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Token not found');
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    });

    return jwtService.verify(token);
  } catch (err) {
    throw new UnauthorizedException('Invalid token' + err);
  }
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): DecodedPayload => {
    return extractUser(ctx);
  },
);

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const user = extractUser(ctx);
    return user.sub;
  },
);
