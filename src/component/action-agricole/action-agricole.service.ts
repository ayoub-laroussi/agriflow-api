import { Injectable } from '@nestjs/common';
import { CreateActionAgricoleDto } from './dto/create-action-agricole.dto';
import { UpdateActionAgricoleDto } from './dto/update-action-agricole.dto';

@Injectable()
export class ActionAgricoleService {
  create(createActionAgricoleDto: CreateActionAgricoleDto) {
    return 'This action adds a new actionAgricole';
  }

  findAll() {
    return `This action returns all actionAgricole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionAgricole`;
  }

  update(id: number, updateActionAgricoleDto: UpdateActionAgricoleDto) {
    return `This action updates a #${id} actionAgricole`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionAgricole`;
  }
}
