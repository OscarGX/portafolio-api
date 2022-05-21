import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
