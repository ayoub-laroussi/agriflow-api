import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';
import { CultivationSpace } from './entities/cultivation-space.entity';

@Injectable()
export class CultivationSpaceService {
  constructor(
    @InjectRepository(CultivationSpace)
    private cultivationSpaceRepository: Repository<CultivationSpace>,
  ) {}

  create(createCultivationSpaceDto: CreateCultivationSpaceDto): Promise<CultivationSpace> {
    const cultivationSpace = this.cultivationSpaceRepository.create(createCultivationSpaceDto);
    return this.cultivationSpaceRepository.save(cultivationSpace);
  }

  findAll(): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find({
      relations: ['land'],
    });
  }

  findOne(id: string): Promise<CultivationSpace> {
    return this.cultivationSpaceRepository.findOne({
      where: { id_cultivation_space: id },
      relations: ['land'],
    });
  }

  async update(id: string, updateCultivationSpaceDto: UpdateCultivationSpaceDto): Promise<CultivationSpace> {
    await this.cultivationSpaceRepository.update(id_cultivation_space, updateCultivationSpaceDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.cultivationSpaceRepository.delete(id_cultivation_space);
  }

  findByLandId(landId: string): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find({
      where: { id_land: landId },
      relations: ['land'],
    });
  }
}
