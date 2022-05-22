import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { StatusEnum } from '../enums/status.enum';
import { Tag } from './tag.entity';
import { Technology } from './technology.entity';
import { OneToMany } from 'typeorm';
import { ProjectRepository } from './project-repository.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  thumbnail: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  videoUrl: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @Column({
    type: 'int',
    nullable: true,
  })
  year?: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  clientName?: string;

  @ManyToMany(() => Tag, (tag) => tag.projects, {
    cascade: ['insert', 'remove'],
    eager: true,
  })
  @JoinTable({
    name: 'project-tags',
  })
  tags: Tag[];

  @ManyToMany(() => Technology, (tech) => tech.projects, {
    cascade: ['insert', 'remove'],
    eager: true,
  })
  @JoinTable({
    name: 'project-technologies',
  })
  technologies: Technology[];

  @OneToMany(() => ProjectRepository, (repo) => repo.project, {
    eager: true,
    cascade: ['insert', 'remove'],
  })
  repos: ProjectRepository[];
}
