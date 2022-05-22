import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SourceControlPlatformEnum } from '../enums/source-control-platform.enum';
import { Project } from './project.entity';

@Entity('repositories')
export class ProjectRepository {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: SourceControlPlatformEnum,
    nullable: false,
  })
  platform: SourceControlPlatformEnum;

  @Column({
    type: 'text',
    nullable: false,
  })
  url: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  public: boolean;

  @ManyToOne(() => Project, (project) => project.repos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: Project;
}
