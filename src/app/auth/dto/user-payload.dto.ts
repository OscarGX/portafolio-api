import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AuthUsuarioRol {
  @Expose()
  id: number;
}

@Exclude()
export class AuthUsuarioPayload {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => AuthUsuarioRol)
  role: AuthUsuarioRol;
}
