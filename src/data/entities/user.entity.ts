import { Role } from './role.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Generated('uuid')
  @Column({
    unique: true,
  })
  refreshToken: string;

  @ManyToOne(() => Role, (rol) => rol.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  role: Role;
}
