import { Injectable } from '@nestjs/common';
import { CreateEspaceCultureDto } from './dto/create-espace-culture.dto';
import { UpdateEspaceCultureDto } from './dto/update-espace-culture.dto';

@Injectable()
export class EspaceCultureService {
  create(createEspaceCultureDto: CreateEspaceCultureDto) {
    return 'This action adds a new espaceCulture';
  }

  findAll() {
    return `This action returns all espaceCulture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} espaceCulture`;
  }

  update(id: number, updateEspaceCultureDto: UpdateEspaceCultureDto) {
    return `This action updates a #${id} espaceCulture`;
  }

  remove(id: number) {
    return `This action removes a #${id} espaceCulture`;
  }
}
