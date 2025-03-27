import { Injectable } from '@nestjs/common';
import { CreateTerrainDto } from './dto/create-terrain.dto';
import { UpdateTerrainDto } from './dto/update-terrain.dto';

@Injectable()
export class TerrainService {
  create(createTerrainDto: CreateTerrainDto) {
    return 'This action adds a new terrain';
  }

  findAll() {
    return `This action returns all terrain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} terrain`;
  }

  update(id: number, updateTerrainDto: UpdateTerrainDto) {
    return `This action updates a #${id} terrain`;
  }

  remove(id: number) {
    return `This action removes a #${id} terrain`;
  }
}
