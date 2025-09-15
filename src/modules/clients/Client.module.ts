import { Module } from "@nestjs/common";
import { ClientService } from "./services/Client.service";
import { ClientRepository } from "./repositories/Client.repository";
import { ClientController } from "./controllers/Client.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./entities/Client.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository],
    exports: []
})
export class ClientModule {};