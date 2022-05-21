import { IsOptional, IsString } from 'class-validator';

export class TagCreateDTO {
  @IsString()
  value: string;

  @IsString()
  @IsOptional()
  description?: string;
}
