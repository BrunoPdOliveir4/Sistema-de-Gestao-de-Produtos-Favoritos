import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/infrastructure/decorators/Roles.decorator';
import { Role } from 'src/modules/clients/enums/Role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Nenhuma restrição de roles
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request['role']?.role; // assumindo que no payload do JWT tem `role`

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta rota.',
      );
    }

    return true;
  }
}
