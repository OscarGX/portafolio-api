import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { SourceControlPlatformEnum } from '../../../data/enums/source-control-platform.enum';

export class ProjectRepositoryCreateDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(SourceControlPlatformEnum)
  platform: SourceControlPlatformEnum;

  @IsString()
  url: string;

  @IsBoolean()
  public: boolean;
}
