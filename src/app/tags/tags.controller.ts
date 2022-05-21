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
import { TagService } from './services/tag.service';
import { TagCreateDTO } from './dto';
import { Roles } from '../auth/decorators/rol.decorator';
import { UseGuards } from '@nestjs/common';
import { RoleEnum } from '../../data/enums/rol.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiTags('Tags')
@Controller(`${API_BASE_URL}/tags`)
export class TagsController {
  constructor(private readonly _tagService: TagService) {}

  @Get('')
  public async getAll() {
    try {
      const tags = await this._tagService.getAll();
      return tags;
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
  @Post()
  public async createOne(@Body() body: TagCreateDTO) {
    try {
      const tag = await this._tagService.createOne(body);
      if (tag) return tag;
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
