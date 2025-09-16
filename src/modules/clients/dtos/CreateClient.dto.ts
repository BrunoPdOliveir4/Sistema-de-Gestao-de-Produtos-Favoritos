import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from '../enums/Role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'João da Silva',
    maxLength: 150,
  })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao@email.com',
    maxLength: 100,
  })
  @IsEmail()
  @IsString()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({
    description: 'Role do cliente (opcional, default USER)',
    enum: Role,
    example: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role)
  role: Role = Role.USER;
}
