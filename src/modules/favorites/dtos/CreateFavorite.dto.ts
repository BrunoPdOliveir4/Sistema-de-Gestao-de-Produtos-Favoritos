import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'ID do serviço a ser favoritado',
    example: '1',
  })
  @IsString()
  serviceId: string;

  @ApiProperty({
    description: 'ID do produto a ser favoritado',
    example: '14',
  })
  @IsString()
  productId: string;
}
