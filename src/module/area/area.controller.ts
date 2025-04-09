/**
 * Contrôleur pour la gestion des zones
 * 
 * Ce contrôleur expose les points d'entrée REST pour la gestion des zones,
 * permettant de créer, récupérer, mettre à jour et supprimer des zones.
 * 
 * @module AreaController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';

/**
 * Contrôleur de gestion des zones
 */
@ApiTags('areas')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  /**
   * Crée une nouvelle zone
   * 
   * @param createAreaDto DTO contenant les données de la zone à créer
   * @returns La zone créée
   */
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle zone' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'La zone a été créée avec succès',
    type: Area,
  })
  async create(@Body() createAreaDto: CreateAreaDto) {
    const area = await this.areaService.create(createAreaDto);
    return {
      message: 'Zone créée avec succès',
      data: area,
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Récupère toutes les zones
   * 
   * @returns Liste de toutes les zones
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les zones' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des zones récupérée avec succès',
    type: [Area],
  })
  async findAll() {
    const areas = await this.areaService.findAll();
    return {
      message: 'Zones récupérées avec succès',
      data: areas,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Récupère une zone par son ID
   * 
   * @param id ID de la zone à récupérer
   * @returns La zone trouvée
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une zone par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la zone', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zone récupérée avec succès',
    type: Area,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zone non trouvée',
  })
  async findOne(@Param('id') id: string) {
    const area = await this.areaService.findOne(id);
    return {
      message: 'Zone récupérée avec succès',
      data: area,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Met à jour une zone
   * 
   * @param id ID de la zone à mettre à jour
   * @param updateAreaDto DTO contenant les données à mettre à jour
   * @returns La zone mise à jour
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une zone' })
  @ApiParam({ name: 'id', description: 'ID de la zone', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zone mise à jour avec succès',
    type: Area,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zone non trouvée',
  })
  async update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    const area = await this.areaService.update(id, updateAreaDto);
    return {
      message: 'Zone mise à jour avec succès',
      data: area,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Supprime une zone
   * 
   * @param id ID de la zone à supprimer
   * @returns Informations sur la suppression
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une zone' })
  @ApiParam({ name: 'id', description: 'ID de la zone', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zone supprimée avec succès',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zone non trouvée',
  })
  remove(@Param('id') id: string) {
    return this.areaService.remove(id);
  }
}
