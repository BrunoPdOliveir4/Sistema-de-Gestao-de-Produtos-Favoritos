import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entities/Favorite.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Favorite])],
    controllers: [],
    providers: [],
    exports: []
})
export class FavoriteModule {};