import { Injectable } from '@nestjs/common';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';

@Injectable()
export class CultureService {
  create(createCultureDto: CreateCultureDto) {
    return 'This action adds a new culture';
  }

  findAll() {
    return `This action returns all culture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} culture`;
  }

  update(id: number, updateCultureDto: UpdateCultureDto) {
    return `This action updates a #${id} culture`;
  }

  remove(id: number) {
    return `This action removes a #${id} culture`;
  }
}
