import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlancheService } from './planche.service';
import { CreatePlancheDto } from './dto/create-planche.dto';
import { UpdatePlancheDto } from './dto/update-planche.dto';

@Controller('planche')
export class PlancheController {
  constructor(private readonly plancheService: PlancheService) {}

  @Post()
  create(@Body() createPlancheDto: CreatePlancheDto) {
    return this.plancheService.create(createPlancheDto);
  }

  @Get()
  findAll() {
    return this.plancheService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plancheService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlancheDto: UpdatePlancheDto) {
    return this.plancheService.update(+id, updatePlancheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plancheService.remove(+id);
  }
}
