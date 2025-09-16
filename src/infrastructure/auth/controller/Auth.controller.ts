import { Controller, Get, Param } from "@nestjs/common";
import { AuthService } from "../services/Auth.service";
import { GetTokenDto } from "../dto/GetToken.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService,
    ){}

    @Get(':email')
    async getNewJwt(@Param('email') email: GetTokenDto){
        return this.service.getNewJwt(email);
    }
}