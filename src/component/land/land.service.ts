import { Injectable } from '@nestjs/common';
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

  create(createLandDto: CreateLandDto): Promise<Land> {
    const land = this.landRepository.create(createLandDto);
    return this.landRepository.save(land);
  }

  findAll(): Promise<Land[]> {
    return this.landRepository.find({
      relations: ['user', 'cultivationSpaces'],
    });
  }

  findOne(id: string): Promise<Land> {
    return this.landRepository.findOne({
      where: { id_land: id },
      relations: ['user', 'cultivationSpaces'],
    });
  }

  async update(id: string, updateLandDto: UpdateLandDto): Promise<Land> {
    await this.landRepository.update(id_land, updateLandDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.landRepository.delete(id_land);
  }

  findByUserId(userId: string): Promise<Land[]> {
    return this.landRepository.find({
      where: { id_user: userId },
      relations: ['user', 'cultivationSpaces'],
    });
  }
}
