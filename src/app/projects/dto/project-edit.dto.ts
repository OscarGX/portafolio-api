import { PickType } from '@nestjs/mapped-types';
import { ProjectCreateDTO } from './project-create.dto';

export class ProjectEditStatusDTO extends PickType(ProjectCreateDTO, [
  'status',
] as const) {}
