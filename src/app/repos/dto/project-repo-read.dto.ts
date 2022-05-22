import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProjectRepositoryReadDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  platform: string;

  @Expose()
  url: string;

  @Expose()
  public: boolean;
}
