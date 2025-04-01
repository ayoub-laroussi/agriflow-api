import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = new Crop();
    Object.assign(crop, createCropDto);
    return await this.cropRepository.save(crop);
  }

  findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  async findOne(id: string): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id },
    });
    if (!crop) {
      throw new NotFoundException(`Culture avec l'ID ${id} non trouvé`);
    }
    return crop;
  }

  async update(id: string, updateCropDto: UpdateCropDto): Promise<Crop> {
    const crop = await this.findOne(id);
    Object.assign(crop, updateCropDto);
    return await this.cropRepository.save(crop);
  }

  async remove(id: string): Promise<void> {
    await this.cropRepository.delete({ id });
  }
}
