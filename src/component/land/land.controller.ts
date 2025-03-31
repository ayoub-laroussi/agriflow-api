import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandService } from './land.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';

@Controller('land')
export class LandController {
  constructor(private readonly landService: LandService) {}

  @Post()
  create(@Body() createLandDto: CreateLandDto) {
    return this.landService.create(createLandDto);
  }

  @Get()
  findAll() {
    return this.landService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandDto: UpdateLandDto) {
    return this.landService.update(+id, updateLandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landService.remove(+id);
  }
}
