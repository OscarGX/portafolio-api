import { Module } from '@nestjs/common';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './services/technology.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from '../../data/entities/technology.entity';

@Module({
  controllers: [TechnologyController],
  providers: [TechnologyService],
  imports: [TypeOrmModule.forFeature([Technology])],
})
export class TechnologyModule {}
