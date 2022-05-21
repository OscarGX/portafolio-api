import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { MapperService } from 'src/common/mapper/mapper.service';
import { Repository } from 'typeorm';
import { User } from '../../../data/entities/user.entity';
import {
  AuthUsuarioPayload,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
  UserCreateDTO,
  UserReadDTO,
} from '../dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>,
    private readonly _mapper: MapperService,
    private readonly _jwtService: JwtService,
  ) {}

  public async createOne(user: UserCreateDTO): Promise<UserReadDTO> {
    const userEntity = this._userRepo.create(user);
    userEntity.password = hashSync(userEntity.password, 10);
    const userDB = await this._userRepo.save(userEntity);
    const userDTO = this._mapper.toDTO<UserReadDTO>(userDB, UserReadDTO);
    return userDB ? userDTO : null;
  }

  public async login(user: AuthUsuarioPayload): Promise<LoginResponseDTO> {
    const loginResponse: LoginResponseDTO = {
      accessToken: this._jwtService.sign(instanceToPlain(user)),
      ...user,
    };
    return loginResponse;
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthUsuarioPayload> {
    const user = await this.findOneAuth(username);
    if (user && compareSync(password, user.password)) {
      const userDTO = this._mapper.toDTO<AuthUsuarioPayload>(
        user,
        AuthUsuarioPayload,
      );
      return userDTO;
    }
    return null;
  }

  private async findOneAuth(username: string): Promise<User | undefined> {
    return this._userRepo.findOne({
      where: { username },
    });
  }

  public async findOneRefreshToken(
    refresTokenObj: RefreshTokenRequestDTO,
  ): Promise<User | undefined> {
    return this._userRepo.findOne({
      where: {
        username: refresTokenObj.username,
        refreshToken: refresTokenObj.refreshToken,
      },
    });
  }

  public async refreshToken(usuario: User): Promise<RefreshTokenResponseDTO> {
    const userDTO = this._mapper.toDTO<AuthUsuarioPayload>(
      usuario,
      AuthUsuarioPayload,
    );
    userDTO.refreshToken = uuidv4();
    const updated = await this._userRepo.update(userDTO.id, {
      refreshToken: userDTO.refreshToken,
    });
    return updated.affected > 0
      ? {
          accessToken: this._jwtService.sign(instanceToPlain(userDTO)),
          refreshToken: userDTO.refreshToken,
        }
      : null;
  }
}
