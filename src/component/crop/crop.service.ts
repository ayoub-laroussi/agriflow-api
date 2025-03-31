import { Injectable } from '@nestjs/common';
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

  create(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = this.cropRepository.create(createCropDto);
    return this.cropRepository.save(crop);
  }

  findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  findOne(id: string): Promise<Crop> {
    return this.cropRepository.findOneBy({ id_crop: id });
  }

  async update(id: string, updateCropDto: UpdateCropDto): Promise<Crop> {
    await this.cropRepository.update(id_crop, updateCropDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.cropRepository.delete(id_crop);
  }
}
