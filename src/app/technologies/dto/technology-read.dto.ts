import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TechnologyReadDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description?: string;
}
