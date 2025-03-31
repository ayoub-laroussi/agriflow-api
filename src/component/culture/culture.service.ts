import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { Culture } from './entities/culture.entity';

@Injectable()
export class CultureService {
  constructor(
    @InjectRepository(Culture)
    private cultureRepository: Repository<Culture>,
  ) {}

  async create(createCultureDto: CreateCultureDto) {
    const culture = this.cultureRepository.create(createCultureDto);
    return await this.cultureRepository.save(culture);
  }

  async findAll() {
    return await this.cultureRepository.find();
  }

  async findOne(id: number) {
    const culture = await this.cultureRepository.findOne({ where: { id } });
    if (!culture) {
      throw new NotFoundException(`Culture avec l'ID ${id} non trouvée`);
    }
    return culture;
  }

  async update(id: number, updateCultureDto: UpdateCultureDto) {
    const culture = await this.findOne(id);
    Object.assign(culture, updateCultureDto);
    return await this.cultureRepository.save(culture);
  }

  async remove(id: number) {
    const culture = await this.findOne(id);
    return await this.cultureRepository.remove(culture);
  }

  async setStatut(id: number, statut: string) {
    const culture = await this.findOne(id);
    culture.statut = statut;
    return await this.cultureRepository.save(culture);
  }
}
