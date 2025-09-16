import { Favorite } from 'src/modules/favorites/entities/Favorite.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../enums/Role.enum';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: Role;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone', name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.client)
  favorites: Favorite[];
}
