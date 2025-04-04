import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultivationBedDto } from './dto/create-cultivation-bed.dto';
import { UpdateCultivationBedDto } from './dto/update-cultivation-bed.dto';
import { CultivationBed } from './entities/cultivation-bed.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';

@Injectable()
export class CultivationBedService {
  constructor(
    @InjectRepository(CultivationBed)
    private cultivationBedRepository: Repository<CultivationBed>,
    @InjectRepository(CultivationSpace)
    private cultivationSpaceRepository: Repository<CultivationSpace>,
  ) {}

  async create(createCultivationBedDto: CreateCultivationBedDto): Promise<CultivationBed> {
    // Vérifier que l'espace de culture existe
    const cultivationSpace = await this.cultivationSpaceRepository.findOne({
      where: { id: createCultivationBedDto.cultivation_space_id },
    });

    if (!cultivationSpace) {
      throw new NotFoundException(
        `Espace de culture avec l'ID ${createCultivationBedDto.cultivation_space_id} non trouvé`,
      );
    }

    // Créer la planche de culture
    const cultivationBed = new CultivationBed();
    cultivationBed.name = createCultivationBedDto.name;
    cultivationBed.description = createCultivationBedDto.description;
    cultivationBed.length = createCultivationBedDto.length;
    cultivationBed.width = createCultivationBedDto.width;
    cultivationBed.area = createCultivationBedDto.area;
    cultivationBed.soilType = createCultivationBedDto.soil_type;
    cultivationBed.phLevel = createCultivationBedDto.ph_level;
    cultivationBed.fertilityLevel = createCultivationBedDto.fertility_level;
    cultivationBed.drainageLevel = createCultivationBedDto.drainage_level;
    cultivationBed.orientation = createCultivationBedDto.orientation;
    cultivationBed.commentary = createCultivationBedDto.commentary;
    cultivationBed.cultivationSpaceId = createCultivationBedDto.cultivation_space_id;

    return this.cultivationBedRepository.save(cultivationBed);
  }

  findAll(): Promise<CultivationBed[]> {
    return this.cultivationBedRepository.find({
      relations: ['cultivationSpace', 'crops'],
    });
  }

  async findOne(id: string): Promise<CultivationBed> {
    const cultivationBed = await this.cultivationBedRepository.findOne({
      where: { id },
      relations: ['cultivationSpace', 'crops'],
    });

    if (!cultivationBed) {
      throw new NotFoundException(`Planche de culture avec l'ID ${id} non trouvée`);
    }

    return cultivationBed;
  }

  async update(id: string, updateCultivationBedDto: UpdateCultivationBedDto): Promise<CultivationBed> {
    const cultivationBed = await this.findOne(id);

    // Vérifier que l'espace de culture existe si l'ID est fourni
    if (updateCultivationBedDto.cultivation_space_id) {
      const cultivationSpace = await this.cultivationSpaceRepository.findOne({
        where: { id: updateCultivationBedDto.cultivation_space_id },
      });

      if (!cultivationSpace) {
        throw new NotFoundException(
          `Espace de culture avec l'ID ${updateCultivationBedDto.cultivation_space_id} non trouvé`,
        );
      }
      
      cultivationBed.cultivationSpaceId = updateCultivationBedDto.cultivation_space_id;
    }

    // Mettre à jour les propriétés si elles sont fournies
    if (updateCultivationBedDto.name !== undefined) cultivationBed.name = updateCultivationBedDto.name;
    if (updateCultivationBedDto.description !== undefined) cultivationBed.description = updateCultivationBedDto.description;
    if (updateCultivationBedDto.length !== undefined) cultivationBed.length = updateCultivationBedDto.length;
    if (updateCultivationBedDto.width !== undefined) cultivationBed.width = updateCultivationBedDto.width;
    if (updateCultivationBedDto.area !== undefined) cultivationBed.area = updateCultivationBedDto.area;
    if (updateCultivationBedDto.soil_type !== undefined) cultivationBed.soilType = updateCultivationBedDto.soil_type;
    if (updateCultivationBedDto.ph_level !== undefined) cultivationBed.phLevel = updateCultivationBedDto.ph_level;
    if (updateCultivationBedDto.fertility_level !== undefined) cultivationBed.fertilityLevel = updateCultivationBedDto.fertility_level;
    if (updateCultivationBedDto.drainage_level !== undefined) cultivationBed.drainageLevel = updateCultivationBedDto.drainage_level;
    if (updateCultivationBedDto.orientation !== undefined) cultivationBed.orientation = updateCultivationBedDto.orientation;
    if (updateCultivationBedDto.commentary !== undefined) cultivationBed.commentary = updateCultivationBedDto.commentary;

    return this.cultivationBedRepository.save(cultivationBed);
  }

  async remove(id: string): Promise<void> {
    const result = await this.cultivationBedRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Planche de culture avec l'ID ${id} non trouvée`);
    }
  }

  findByCultivationSpaceId(cultivationSpaceId: string): Promise<CultivationBed[]> {
    return this.cultivationBedRepository.find({
      where: { cultivationSpaceId },
      relations: ['crops'],
    });
  }
}
