import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagService } from './services/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../../data/entities/tag.entity';

@Module({
  controllers: [TagsController],
  providers: [TagService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
