import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEspaceCultureDto } from './dto/create-espace-culture.dto';
import { UpdateEspaceCultureDto } from './dto/update-espace-culture.dto';
import { EspaceCulture } from './entities/espace-culture.entity';

@Injectable()
export class EspaceCultureService {
  constructor(
    @InjectRepository(EspaceCulture)
    private espaceCultureRepository: Repository<EspaceCulture>,
  ) {}

  async create(createEspaceCultureDto: CreateEspaceCultureDto) {
    const espaceCulture = this.espaceCultureRepository.create(createEspaceCultureDto);
    return await this.espaceCultureRepository.save(espaceCulture);
  }

  async findAll() {
    return await this.espaceCultureRepository.find();
  }

  async findOne(id: number) {
    const espaceCulture = await this.espaceCultureRepository.findOne({ where: { id } });
    if (!espaceCulture) {
      throw new NotFoundException(`Espace de culture avec l'ID ${id} non trouvé`);
    }
    return espaceCulture;
  }

  async update(id: number, updateEspaceCultureDto: UpdateEspaceCultureDto) {
    const espaceCulture = await this.findOne(id);
    Object.assign(espaceCulture, updateEspaceCultureDto);
    return await this.espaceCultureRepository.save(espaceCulture);
  }

  async remove(id: number) {
    const espaceCulture = await this.findOne(id);
    return await this.espaceCultureRepository.remove(espaceCulture);
  }
}
