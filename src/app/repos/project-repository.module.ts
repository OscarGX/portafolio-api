import { Module } from '@nestjs/common';
import { ProjectRepositoryController } from './project-repository.controller';
import { ProjectRepositoryService } from './services/project-repository.service';

@Module({
  controllers: [ProjectRepositoryController],
  providers: [ProjectRepositoryService]
})
export class ProjectRepositoryModule {}
