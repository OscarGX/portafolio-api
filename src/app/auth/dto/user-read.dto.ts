import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserRolReadDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description?: string;
}

@Exclude()
export class UserReadDTO {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  @Type(() => UserRolReadDTO)
  role: UserRolReadDTO;
}
