import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../../../data/entities/tag.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { TagCreateDTO, TagReadDTO } from '../dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly _tagRepo: Repository<Tag>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAll(): Promise<TagReadDTO[]> {
    const tags = await this._tagRepo.find();
    if (tags) {
      const tagsDTO = this._mapper.toArrayDTO<TagReadDTO>(tags, TagReadDTO);
      return tagsDTO;
    }
    return null;
  }

  public async createOne(body: TagCreateDTO): Promise<TagReadDTO> {
    const tag = this._tagRepo.create(body);
    const tagDB = await this._tagRepo.save(tag);
    if (tagDB) {
      const tagDTO = this._mapper.toDTO<TagReadDTO>(tagDB, TagReadDTO);
      return tagDTO;
    }
    return null;
  }
}
