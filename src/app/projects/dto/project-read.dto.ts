import { Exclude, Expose, Type } from 'class-transformer';
import { ProjectRepositoryReadDTO } from 'src/app/repos/dto';
import { TagReadDTO } from 'src/app/tags/dto';
import { TechnologyReadDTO } from 'src/app/technologies/dto';

@Exclude()
export class ProjectReadDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  thumbnail: string;

  @Expose()
  videoUrl: string;

  @Expose()
  status: number;

  @Expose()
  year?: number;

  @Expose()
  clientName?: string;

  @Expose()
  @Type(() => TagReadDTO)
  tags: TagReadDTO[];

  @Expose()
  @Type(() => TechnologyReadDTO)
  technologies: TechnologyReadDTO[];

  @Expose()
  @Type(() => ProjectRepositoryReadDTO)
  repos: ProjectRepositoryReadDTO[];
}
