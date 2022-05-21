import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserRoleCreateDTO {
  @IsInt()
  id: number;
}

export class UserCreateDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @ValidateNested()
  @Type(() => UserRoleCreateDTO)
  role: UserRoleCreateDTO;
}
