import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { Land } from './entities/land.entity';

@Injectable()
export class LandService {
  constructor(
    @InjectRepository(Land)
    private landRepository: Repository<Land>,
  ) {}

  async create(createLandDto: CreateLandDto): Promise<Land> {
    const land = this.landRepository.create(createLandDto);
    return await this.landRepository.save(land);
  }

  findAll(): Promise<Land[]> {
    return this.landRepository.find({
      relations: ['user', 'cultivationSpaces'],
    });
  }

  async findOne(id: string): Promise<Land> {
    const land = await this.landRepository.findOne({
      where: { id_land: id },
      relations: ['user', 'cultivationSpaces'],
    });
    if (!land) {
      throw new NotFoundException(`Terrain avec l'ID ${id} non trouvé`);
    }
    return land;
  }

  async update(id: string, updateLandDto: UpdateLandDto): Promise<Land> {
    const land = await this.findOne(id);
    Object.assign(land, updateLandDto);
    return await this.landRepository.save(land);
  }

  async remove(id: string): Promise<void> {
    await this.landRepository.delete({ id_land: id });
  }

  findByUserId(userId: string): Promise<Land[]> {
    return this.landRepository.find({
      where: { id_user: userId },
      relations: ['user', 'cultivationSpaces'],
    });
  }
}
