import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TagReadDTO {
  @Expose()
  id: number;

  @Expose()
  value: string;

  @Expose()
  description?: string;
}
