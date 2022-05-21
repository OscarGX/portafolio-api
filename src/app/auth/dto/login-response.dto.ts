import { AuthUsuarioPayload } from './user-payload.dto';

export class LoginResponseDTO extends AuthUsuarioPayload {
  accessToken: string;
}
