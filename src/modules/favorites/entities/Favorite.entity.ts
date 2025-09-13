import { Client } from "src/modules/clients/entities/Client.entity";
import { Service } from "src/modules/services/entities/Service.entity";
import { 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Client, (client) => client.favorites, { onDelete: "CASCADE" })
  client: Client;

  @ManyToOne(() => Service, (service) => service.favorites, { onDelete: "CASCADE" })
  service: Service;

  @Column({ nullable: true })
  productId: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  deletedAt: Date | null;
}
