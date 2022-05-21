import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequestDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
