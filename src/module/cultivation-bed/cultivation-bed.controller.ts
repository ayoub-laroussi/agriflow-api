import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CultivationBedService } from './cultivation-bed.service';
import { CreateCultivationBedDto } from './dto/create-cultivation-bed.dto';
import { UpdateCultivationBedDto } from './dto/update-cultivation-bed.dto';
import { CultivationBed } from './entities/cultivation-bed.entity';

@ApiTags('cultivation-beds')
@Controller('cultivation-beds')
export class CultivationBedController {
  constructor(private readonly cultivationBedService: CultivationBedService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle planche de culture' })
  @ApiResponse({ status: 201, description: 'La planche de culture a été créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiResponse({ status: 404, description: 'L\'espace de culture spécifié n\'existe pas.' })
  create(@Body() createCultivationBedDto: CreateCultivationBedDto): Promise<CultivationBed> {
    return this.cultivationBedService.create(createCultivationBedDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les planches de culture' })
  @ApiResponse({ status: 200, description: 'Liste des planches de culture récupérée avec succès.' })
  findAll(): Promise<CultivationBed[]> {
    return this.cultivationBedService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une planche de culture par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la planche de culture' })
  @ApiResponse({ status: 200, description: 'Planche de culture récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Planche de culture non trouvée.' })
  findOne(@Param('id') id: string): Promise<CultivationBed> {
    return this.cultivationBedService.findOne(id);
  }

  @Get('cultivation-space/:cultivationSpaceId')
  @ApiOperation({ summary: 'Récupérer toutes les planches de culture d\'un espace de culture' })
  @ApiParam({ name: 'cultivationSpaceId', description: 'ID de l\'espace de culture' })
  @ApiResponse({ status: 200, description: 'Liste des planches de culture de l\'espace de culture récupérée avec succès.' })
  findByCultivationSpaceId(@Param('cultivationSpaceId') cultivationSpaceId: string): Promise<CultivationBed[]> {
    return this.cultivationBedService.findByCultivationSpaceId(cultivationSpaceId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une planche de culture' })
  @ApiParam({ name: 'id', description: 'ID de la planche de culture' })
  @ApiResponse({ status: 200, description: 'Planche de culture mise à jour avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiResponse({ status: 404, description: 'Planche de culture non trouvée.' })
  update(
    @Param('id') id: string,
    @Body() updateCultivationBedDto: UpdateCultivationBedDto,
  ): Promise<CultivationBed> {
    return this.cultivationBedService.update(id, updateCultivationBedDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une planche de culture' })
  @ApiParam({ name: 'id', description: 'ID de la planche de culture' })
  @ApiResponse({ status: 200, description: 'Planche de culture supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Planche de culture non trouvée.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cultivationBedService.remove(id);
  }
}
