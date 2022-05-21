import { IsOptional, IsString } from 'class-validator';

export class TechnologyCreateDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
