import { IsString } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    serviceId: string
    @IsString()
    productId: string
}