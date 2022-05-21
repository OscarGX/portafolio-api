import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TechnologyService } from './services/technology.service';
import { TechnologyCreateDTO } from './dto';
import { RoleEnum } from '../../data/enums/rol.enum';
import { Roles } from '../auth/decorators/rol.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiTags('Technologies')
@Controller(`${API_BASE_URL}/technologies`)
export class TechnologyController {
  constructor(private readonly _techService: TechnologyService) {}

  @Get('')
  public async getAll() {
    try {
      const techs = await this._techService.getAll();
      return techs;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  public async createOne(@Body() body: TechnologyCreateDTO) {
    try {
      const tech = await this._techService.createOne(body);
      if (tech) return tech;
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
}
