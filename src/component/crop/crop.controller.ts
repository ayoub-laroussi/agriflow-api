import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';

@ApiTags('crops')
@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle culture' })
  @ApiResponse({ status: 201, description: 'La culture a été créée avec succès.' })
  create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    return this.cropService.create(createCropDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les cultures' })
  @ApiResponse({ status: 200, description: 'Liste des cultures récupérée avec succès.' })
  findAll(): Promise<Crop[]> {
    return this.cropService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une culture par son ID' })
  @ApiResponse({ status: 200, description: 'Culture récupérée avec succès.' })
  findOne(@Param('id') id: string): Promise<Crop> {
    return this.cropService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une culture' })
  @ApiResponse({ status: 200, description: 'Culture mise à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto): Promise<Crop> {
    return this.cropService.update(id, updateCropDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une culture' })
  @ApiResponse({ status: 200, description: 'Culture supprimée avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cropService.remove(id);
  }
}
