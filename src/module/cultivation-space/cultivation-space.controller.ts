import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CultivationSpaceService } from './cultivation-space.service';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';
import { CultivationSpace } from './entities/cultivation-space.entity';

@ApiTags('cultivation-spaces')
@Controller('cultivation-spaces')
export class CultivationSpaceController {
  constructor(private readonly cultivationSpaceService: CultivationSpaceService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel espace de culture' })
  @ApiResponse({ status: 201, description: 'L\'espace de culture a été créé avec succès.' })
  create(@Body() createCultivationSpaceDto: CreateCultivationSpaceDto): Promise<CultivationSpace> {
    return this.cultivationSpaceService.create(createCultivationSpaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les espaces de culture' })
  @ApiResponse({ status: 200, description: 'Liste des espaces de culture récupérée avec succès.' })
  findAll(): Promise<CultivationSpace[]> {
    return this.cultivationSpaceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un espace de culture par son ID' })
  @ApiResponse({ status: 200, description: 'Espace de culture récupéré avec succès.' })
  findOne(@Param('id') id: string): Promise<CultivationSpace> {
    return this.cultivationSpaceService.findOne(id);
  }

  @Get('land/:landId')
  @ApiOperation({ summary: 'Récupérer tous les espaces de culture d\'un terrain' })
  @ApiResponse({ status: 200, description: 'Liste des espaces de culture du terrain récupérée avec succès.' })
  findByLandId(@Param('landId') landId: string): Promise<CultivationSpace[]> {
    return this.cultivationSpaceService.findByLandId(landId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un espace de culture' })
  @ApiResponse({ status: 200, description: 'Espace de culture mis à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateCultivationSpaceDto: UpdateCultivationSpaceDto): Promise<CultivationSpace> {
    return this.cultivationSpaceService.update(id, updateCultivationSpaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un espace de culture' })
  @ApiResponse({ status: 200, description: 'Espace de culture supprimé avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cultivationSpaceService.remove(id);
  }
}
