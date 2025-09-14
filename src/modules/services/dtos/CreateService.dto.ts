import { IsAlphanumeric, IsString, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsAlphanumeric()
  name: string;

  @IsUrl()
  @IsString()
  url: string;
}
