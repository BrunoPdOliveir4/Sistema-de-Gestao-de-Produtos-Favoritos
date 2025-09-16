import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/Auth.service';
import { GetTokenDto } from '../dto/GetToken.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get(':email')
  @ApiOperation({ summary: 'Gerar um novo JWT para o usuário pelo email' })
  @ApiParam({
    name: 'email',
    description: 'Email do usuário para gerar o token',
    example: 'usuario@email.com',
  })
  @ApiResponse({ status: 200, description: 'JWT gerado com sucesso.', schema: { example: { token: 'eyJhbGciOiJIUzI1...' } } })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async getNewJwt(@Param('email') email: GetTokenDto) {
    return this.service.getNewJwt(email);
  }
}
