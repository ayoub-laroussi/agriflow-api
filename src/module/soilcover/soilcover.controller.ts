import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SoilCoverService } from './soilcover.service';
import { CreateSoilCoverDto } from './dto/create-soilcover.dto';
import { UpdateSoilCoverDto } from './dto/update-soilcover.dto';
import { SoilCover } from './entities/soilcover.entity';

@ApiTags('soil-covers')
@Controller('soil-covers')
export class SoilCoverController {
  constructor(private readonly soilCoverService: SoilCoverService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle couverture du sol' })
  @ApiResponse({ status: 201, description: 'La couverture du sol a été créée avec succès.' })
  create(@Body() createSoilCoverDto: CreateSoilCoverDto): Promise<SoilCover> {
    return this.soilCoverService.create(createSoilCoverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les couvertures du sol' })
  @ApiResponse({ status: 200, description: 'Liste des couvertures du sol récupérée avec succès.' })
  findAll(): Promise<SoilCover[]> {
    return this.soilCoverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une couverture du sol par son ID' })
  @ApiResponse({ status: 200, description: 'Couverture du sol récupérée avec succès.' })
  findOne(@Param('id') id: string): Promise<SoilCover> {
    return this.soilCoverService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une couverture du sol' })
  @ApiResponse({ status: 200, description: 'Couverture du sol mise à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateSoilCoverDto: UpdateSoilCoverDto): Promise<SoilCover> {
    return this.soilCoverService.update(id, updateSoilCoverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une couverture du sol' })
  @ApiResponse({ status: 200, description: 'Couverture du sol supprimée avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.soilCoverService.remove(id);
  }
}
