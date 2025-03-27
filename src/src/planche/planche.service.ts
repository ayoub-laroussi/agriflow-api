import { Injectable } from '@nestjs/common';
import { CreatePlancheDto } from './dto/create-planche.dto';
import { UpdatePlancheDto } from './dto/update-planche.dto';

@Injectable()
export class PlancheService {
  create(createPlancheDto: CreatePlancheDto) {
    return 'This action adds a new planche';
  }

  findAll() {
    return `This action returns all planche`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planche`;
  }

  update(id: number, updatePlancheDto: UpdatePlancheDto) {
    return `This action updates a #${id} planche`;
  }

  remove(id: number) {
    return `This action removes a #${id} planche`;
  }
}
