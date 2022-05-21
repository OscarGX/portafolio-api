import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/data/enums/rol.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
