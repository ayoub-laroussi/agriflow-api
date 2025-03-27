import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspaceCultureService } from './espace-culture.service';
import { CreateEspaceCultureDto } from './dto/create-espace-culture.dto';
import { UpdateEspaceCultureDto } from './dto/update-espace-culture.dto';

@Controller('espace-culture')
export class EspaceCultureController {
  constructor(private readonly espaceCultureService: EspaceCultureService) {}

  @Post()
  create(@Body() createEspaceCultureDto: CreateEspaceCultureDto) {
    return this.espaceCultureService.create(createEspaceCultureDto);
  }

  @Get()
  findAll() {
    return this.espaceCultureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.espaceCultureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspaceCultureDto: UpdateEspaceCultureDto) {
    return this.espaceCultureService.update(+id, updateEspaceCultureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.espaceCultureService.remove(+id);
  }
}
