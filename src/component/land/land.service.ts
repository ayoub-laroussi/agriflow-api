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

  async create(createLandDto: CreateLandDto) {
    const land = this.landRepository.create({
      ...createLandDto,
      landCreationDate: new Date(),
      landModificationDate: new Date(),
    });
    return await this.landRepository.save(land);
  }

  async findAll() {
    return await this.landRepository.find();
  }

  async findOne(id: number) {
    const land = await this.landRepository.findOne({ where: { id } });
    if (!land) {
      throw new NotFoundException(`Terrain avec l'ID ${id} non trouvé`);
    }
    return land;
  }

  async update(id: number, updateLandDto: UpdateLandDto) {
    const land = await this.findOne(id);
    Object.assign(land, {
      ...updateLandDto,
      landModificationDate: new Date(),
    });
    return await this.landRepository.save(land);
  }

  async remove(id: number) {
    const land = await this.findOne(id);
    return await this.landRepository.remove(land);
  }
}
