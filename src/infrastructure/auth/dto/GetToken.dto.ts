import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTokenDto {
  @ApiProperty({
    description: 'Email do usuário para gerar o token',
    example: 'usuario@email.com',
  })
  @IsEmail()
  @IsString()
  email: string;
}
