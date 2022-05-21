import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from '../../../data/entities/technology.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { TechnologyCreateDTO, TechnologyReadDTO } from '../dto';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private readonly _technologyRepo: Repository<Technology>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAll(): Promise<TechnologyReadDTO[]> {
    const techs = await this._technologyRepo.find();
    if (techs) {
      const techsDTO = this._mapper.toArrayDTO<TechnologyReadDTO>(
        techs,
        TechnologyReadDTO,
      );
      return techsDTO;
    }
    return null;
  }

  public async createOne(
    body: TechnologyCreateDTO,
  ): Promise<TechnologyReadDTO> {
    const tech = this._technologyRepo.create(body);
    const techDB = await this._technologyRepo.save(tech);
    if (techDB) {
      const techDTO = this._mapper.toDTO<TechnologyReadDTO>(
        techDB,
        TechnologyReadDTO,
      );
      return techDTO;
    }
    return null;
  }
}
