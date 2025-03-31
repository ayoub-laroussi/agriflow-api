import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoilCoverDto } from './dto/create-soilcover.dto';
import { UpdateSoilCoverDto } from './dto/update-soilcover.dto';
import { SoilCover } from './entities/soilcover.entity';

@Injectable()
export class SoilCoverService {
  constructor(
    @InjectRepository(SoilCover)
    private soilCoverRepository: Repository<SoilCover>,
  ) {}

  create(createSoilCoverDto: CreateSoilCoverDto): Promise<SoilCover> {
    const soilCover = this.soilCoverRepository.create(createSoilCoverDto);
    return this.soilCoverRepository.save(soilCover);
  }

  findAll(): Promise<SoilCover[]> {
    return this.soilCoverRepository.find();
  }

  findOne(id: string): Promise<SoilCover> {
    return this.soilCoverRepository.findOneBy({ id_soil_cover: id });
  }

  async update(id: string, updateSoilCoverDto: UpdateSoilCoverDto): Promise<SoilCover> {
    await this.soilCoverRepository.update(id_soil_cover, updateSoilCoverDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.soilCoverRepository.delete(id_soil_cover);
  }
}
