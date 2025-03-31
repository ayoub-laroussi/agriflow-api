import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createSoilCoverDto: CreateSoilCoverDto): Promise<SoilCover> {
    const soilCover = new SoilCover();
    Object.assign(soilCover, createSoilCoverDto);
    return await this.soilCoverRepository.save(soilCover);
  }

  findAll(): Promise<SoilCover[]> {
    return this.soilCoverRepository.find();
  }

  async findOne(id: string): Promise<SoilCover> {
    const soilCover = await this.soilCoverRepository.findOneBy({ id_soil_cover: id });
    if (!soilCover) {
      throw new NotFoundException(`Couverture de sol avec l'ID ${id} non trouvé`);
    }
    return soilCover;
  }

  async update(id: string, updateSoilCoverDto: UpdateSoilCoverDto): Promise<SoilCover> {
    const soilCover = await this.findOne(id);
    Object.assign(soilCover, updateSoilCoverDto);
    return await this.soilCoverRepository.save(soilCover);
  }

  async remove(id: string): Promise<void> {
    await this.soilCoverRepository.delete({ id_soil_cover: id });
  }
}
