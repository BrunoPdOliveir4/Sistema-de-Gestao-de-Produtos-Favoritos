import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from '../enums/Role.enum';

export class CreateClientDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsEmail()
  @IsString()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role = Role.USER;
}
