import { Injectable } from '@nestjs/common';
import { CreateActionAgricoleDto } from './dto/create-action-agricole.dto';
import { UpdateActionAgricoleDto } from './dto/update-action-agricole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionAgricole } from './entities/action-agricole.entity';

@Injectable()
export class ActionAgricoleService {
  constructor(
    @InjectRepository(ActionAgricole)
    private actionAgricoleRepository: Repository<ActionAgricole>,
  ) {}

  async create(createActionAgricoleDto: CreateActionAgricoleDto) {
    const actionAgricole = this.actionAgricoleRepository.create(createActionAgricoleDto);
    return await this.actionAgricoleRepository.save(actionAgricole);
  }

  findAll() {
    return this.actionAgricoleRepository.find(
      {
        relations: ['plantation'],
      }
    );
  }

  async findOne(id: number) {
    try {
      const actionAgricole = await this.actionAgricoleRepository.findOne({
        where: { id },
        relations: ['plantation'],
      });
      return actionAgricole;
    } catch (error) {
      throw new Error('Action agricole non trouvée');
    }
  }

  update(id: number, updateActionAgricoleDto: UpdateActionAgricoleDto) {
    return `This action updates a #${id} actionAgricole`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionAgricole`;
  }
}

