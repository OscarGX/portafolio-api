import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  AuthLoginRequestDTO,
  RefreshTokenRequestDTO,
  UserCreateDTO,
} from './dto';
import { Roles } from './decorators/rol.decorator';
import { RoleEnum } from 'src/data/enums/rol.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Response } from 'express';
import { Get } from '@nestjs/common';

@ApiTags('Auth')
@Controller(`${API_BASE_URL}/auth`)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDTO: AuthLoginRequestDTO) {
    const loginResponse = await this._authService.login(req.user);
    return loginResponse;
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('new-user')
  public async newUser(@Body() userDTO: UserCreateDTO) {
    try {
      const user = await this._authService.createOne(userDTO);
      if (user) return user;
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('refresh')
  public async refreshToken(
    @Res() res: Response,
    @Body() refreshDTO: RefreshTokenRequestDTO,
  ) {
    try {
      const user = await this._authService.findOneRefreshToken(refreshDTO);
      if (user) {
        const refreshToken = await this._authService.refreshToken(user);
        if (refreshToken) return res.status(HttpStatus.OK).json(refreshToken);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ ok: false, message: 'Error al refrescar el token' });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        message: 'El usuario no existe, o los datos están mal',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  public test() {
    return { ok: true };
  }
}
