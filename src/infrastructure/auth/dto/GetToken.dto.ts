import { IsEmail, IsString } from "class-validator";

export class GetTokenDto {
    @IsEmail()
    @IsString()
    email: string;
}