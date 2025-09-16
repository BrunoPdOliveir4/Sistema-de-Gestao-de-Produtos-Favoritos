import { IsAlphanumeric, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Nome do serviço (somente caracteres alfanuméricos)',
    example: 'MyService123',
  })
  @IsString()
  @IsAlphanumeric()
  name: string;

  @ApiProperty({
    description: 'URL do serviço',
    example: 'https://meuservico.com',
  })
  @IsUrl()
  @IsString()
  url: string;
}
