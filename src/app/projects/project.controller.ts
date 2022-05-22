import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProjectService } from './services/project.service';
import { ProjectCreateDTO, ProjectEditStatusDTO } from './dto';
import { RoleEnum } from 'src/data/enums/rol.enum';
import { Roles } from '../auth/decorators/rol.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Response } from 'express';
import { ErrorResponseDTO } from 'src/common/dto';

@ApiTags('Projects')
@Controller(`${API_BASE_URL}/projects`)
export class ProjectController {
  constructor(private readonly _projectService: ProjectService) {}

  @Get('')
  public async getAll() {
    try {
      const projects = await this._projectService.getAll();
      return projects;
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
  public async createOne(@Body() body: ProjectCreateDTO) {
    try {
      const project = await this._projectService.createOne(body);
      if (project) return project;
      return null;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBody({ type: ProjectEditStatusDTO })
  @ApiResponse({ status: HttpStatus.OK, type: ProjectEditStatusDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDTO })
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('status/:id')
  public async updateProjectStatus(
    @Param('id') id: string,
    @Body() body: ProjectEditStatusDTO,
    @Res() res: Response,
  ) {
    try {
      const project = await this._projectService.getOneById(id);
      if (project) {
        await this._projectService.updateStatus(id, body);
        return res.status(HttpStatus.OK).json(body);
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Project not found', ok: false });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
