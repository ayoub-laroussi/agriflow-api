import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';
import { CultivationSpace } from './entities/cultivation-space.entity';

@Injectable()
export class CultivationSpaceService {
  constructor(
    @InjectRepository(CultivationSpace)
    private readonly cultivationSpaceRepository: Repository<CultivationSpace>,
  ) {}

  async create(createCultivationSpaceDto: CreateCultivationSpaceDto): Promise<CultivationSpace> {
    const cultivationSpace = new CultivationSpace();
    Object.assign(cultivationSpace, createCultivationSpaceDto);
    return await this.cultivationSpaceRepository.save(cultivationSpace);
  }

  findAll(): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find({
      relations: ['land'],
    });
  }

  async findOne(id: string): Promise<CultivationSpace> {
    const cultivationSpace = await this.cultivationSpaceRepository.findOne({
      where: { id },
      relations: ['land'],
    });
    if (!cultivationSpace) {
      throw new NotFoundException(`Espace de culture avec l'ID ${id} non trouvé`);
    }
    return cultivationSpace;
  }

  async update(id: string, updateCultivationSpaceDto: UpdateCultivationSpaceDto): Promise<CultivationSpace> {
    const cultivationSpace = await this.findOne(id);
    Object.assign(cultivationSpace, updateCultivationSpaceDto);
    return await this.cultivationSpaceRepository.save(cultivationSpace);
  }

  async remove(id: string): Promise<void> {
    await this.cultivationSpaceRepository.delete({ id });
  }

  findByLandId(landId: string): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find({
      where: { landId },
      relations: ['land'],
    });
  }
}
