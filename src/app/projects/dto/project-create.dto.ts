import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { StatusEnum } from 'src/data/enums/status.enum';
import { Type } from 'class-transformer';
import { ProjectRepositoryCreateDTO } from 'src/app/repos/dto';

export class ProjectTagCreateDTO {
  @IsInt()
  id: number;
}

export class ProjectTechnologyCreateDTO {
  @IsInt()
  id: number;
}

export class ProjectCreateDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  thumbnail: string;

  @IsString()
  videoUrl: string;

  @IsEnum(StatusEnum)
  status: StatusEnum;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  clientName?: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProjectTagCreateDTO)
  tags: ProjectTagCreateDTO[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProjectTechnologyCreateDTO)
  technologies: ProjectTechnologyCreateDTO[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProjectRepositoryCreateDTO)
  repos: ProjectRepositoryCreateDTO[];
}
