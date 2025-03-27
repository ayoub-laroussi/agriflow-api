import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerrainService } from './terrain.service';
import { CreateTerrainDto } from './dto/create-terrain.dto';
import { UpdateTerrainDto } from './dto/update-terrain.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Terrain } from './entities/terrain.entity';

@ApiTags('terrain')
@Controller('terrain')
export class TerrainController {
  constructor(private readonly terrainService: TerrainService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau terrain' })
  @ApiResponse({ status: 201, description: 'Le terrain a été créé avec succès.', type: Terrain })
  create(@Body() createTerrainDto: CreateTerrainDto) {
    return this.terrainService.create(createTerrainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les terrains' })
  @ApiResponse({ status: 200, description: 'Liste des terrains récupérée avec succès.', type: [Terrain] })
  findAll() {
    return this.terrainService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un terrain par son ID' })
  @ApiResponse({ status: 200, description: 'Terrain trouvé.', type: Terrain })
  @ApiResponse({ status: 404, description: 'Terrain non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.terrainService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un terrain' })
  @ApiResponse({ status: 200, description: 'Le terrain a été mis à jour avec succès.', type: Terrain })
  @ApiResponse({ status: 404, description: 'Terrain non trouvé.' })
  update(@Param('id') id: string, @Body() updateTerrainDto: UpdateTerrainDto) {
    return this.terrainService.update(+id, updateTerrainDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un terrain' })
  @ApiResponse({ status: 200, description: 'Le terrain a été supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Terrain non trouvé.' })
  remove(@Param('id') id: string) {
    return this.terrainService.remove(+id);
  }
}
