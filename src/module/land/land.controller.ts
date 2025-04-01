import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LandService } from './land.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { Land } from './entities/land.entity';

@ApiTags('lands')
@Controller('lands')
export class LandController {
  constructor(private readonly landService: LandService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau terrain' })
  @ApiResponse({ status: 201, description: 'Le terrain a été créé avec succès.' })
  create(@Body() createLandDto: CreateLandDto): Promise<Land> {
    return this.landService.create(createLandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les terrains' })
  @ApiResponse({ status: 200, description: 'Liste des terrains récupérée avec succès.' })
  findAll(): Promise<Land[]> {
    return this.landService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un terrain par son ID' })
  @ApiResponse({ status: 200, description: 'Terrain récupéré avec succès.' })
  findOne(@Param('id') id: string): Promise<Land> {
    return this.landService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupérer tous les terrains d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des terrains de l\'utilisateur récupérée avec succès.' })
  findByUserId(@Param('userId') userId: string): Promise<Land[]> {
    return this.landService.findByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un terrain' })
  @ApiResponse({ status: 200, description: 'Terrain mis à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateLandDto: UpdateLandDto): Promise<Land> {
    return this.landService.update(id, updateLandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un terrain' })
  @ApiResponse({ status: 200, description: 'Terrain supprimé avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.landService.remove(id);
  }
}
