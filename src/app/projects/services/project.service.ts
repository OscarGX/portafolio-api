import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../../data/entities/project.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { StatusEnum } from 'src/data/enums/status.enum';
import { ProjectCreateDTO, ProjectEditStatusDTO, ProjectReadDTO } from '../dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly _projectRepo: Repository<Project>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAll(): Promise<ProjectReadDTO[]> {
    const projects = await this._projectRepo.find({
      where: { status: StatusEnum.ACTIVE },
    });
    if (projects) {
      const projectsDTO = this._mapper.toArrayDTO<ProjectReadDTO>(
        projects,
        ProjectReadDTO,
      );
      return projectsDTO;
    }
    return null;
  }

  public async getOneById(id: string): Promise<ProjectReadDTO> {
    const project = await this._projectRepo.findOne(id);
    if (project) {
      return this._mapper.toDTO<ProjectReadDTO>(project, ProjectReadDTO);
    }
    return null;
  }

  public async createOne(body: ProjectCreateDTO): Promise<ProjectReadDTO> {
    const project = this._projectRepo.create(body);
    const projectDB = await this._projectRepo.save(project);
    if (projectDB) {
      const projectDTO = this._mapper.toDTO<ProjectReadDTO>(
        projectDB,
        ProjectReadDTO,
      );
      return projectDTO;
    }
    return null;
  }

  public async updateStatus(
    id: string,
    body: ProjectEditStatusDTO,
  ): Promise<boolean> {
    const updated = await this._projectRepo.update(id, body);
    return updated.affected > 0;
  }
}
