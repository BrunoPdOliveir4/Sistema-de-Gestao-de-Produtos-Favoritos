import { Favorite } from "src/modules/favorites/entities/Favorite.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('service')
export class Service {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    name: string;
    
    @Column()
    url: string;

    @CreateDateColumn({type: "timestamp with local time zone", name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp with local time zone", name: "updated_at"})
    updatedAt: Date;
    
    @DeleteDateColumn({type: "timestamp with local time zone", name: "deleted_at"})
    deletedAt: Date;

    @OneToMany(() => Favorite, (favorite) => favorite.service)
    favorites: Favorite[];
}