import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionAgricoleService } from './action-agricole.service';
import { CreateActionAgricoleDto } from './dto/create-action-agricole.dto';
import { UpdateActionAgricoleDto } from './dto/update-action-agricole.dto';

@Controller('action-agricole')
export class ActionAgricoleController {
  constructor(private readonly actionAgricoleService: ActionAgricoleService) {}

  @Post()
  create(@Body() createActionAgricoleDto: CreateActionAgricoleDto) {
    return this.actionAgricoleService.create(createActionAgricoleDto);
  }

  @Get()
  findAll() {
    return this.actionAgricoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionAgricoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionAgricoleDto: UpdateActionAgricoleDto) {
    return this.actionAgricoleService.update(+id, updateActionAgricoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionAgricoleService.remove(+id);
  }
}
