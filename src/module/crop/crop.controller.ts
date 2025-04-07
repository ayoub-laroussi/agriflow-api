/**
 * Contrôleur de gestion des cultures
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des cultures,
 * permettant les opérations CRUD (Create, Read, Update, Delete) sur les cultures.
 * 
 * @module CropController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';

/**
 * Contrôleur de gestion des cultures
 * 
 * Expose les endpoints RESTful pour manipuler les données des cultures.
 * Le préfixe de route est "/crops".
 */
@ApiTags('crops')
@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  /**
   * Crée une nouvelle culture
   * @param {CreateCropDto} createCropDto - Données pour la création de la culture
   * @returns {Promise<Crop>} Culture créée
   */
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle culture' })
  @ApiResponse({ status: 201, description: 'La culture a été créée avec succès.' })
  create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    return this.cropService.create(createCropDto);
  }

  /**
   * Récupère toutes les cultures
   * @returns {Promise<Crop[]>} Liste de toutes les cultures
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les cultures' })
  @ApiResponse({ status: 200, description: 'Liste des cultures récupérée avec succès.' })
  findAll(): Promise<Crop[]> {
    return this.cropService.findAll();
  }

  /**
   * Récupère une culture par son ID
   * @param {string} id - ID de la culture à récupérer
   * @returns {Promise<Crop>} Culture trouvée
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une culture par son ID' })
  @ApiResponse({ status: 200, description: 'Culture récupérée avec succès.' })
  findOne(@Param('id') id: string): Promise<Crop> {
    return this.cropService.findOne(id);
  }

  /**
   * Met à jour une culture
   * @param {string} id - ID de la culture à mettre à jour
   * @param {UpdateCropDto} updateCropDto - Données pour la mise à jour
   * @returns {Promise<Crop>} Culture mise à jour
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une culture' })
  @ApiResponse({ status: 200, description: 'Culture mise à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto): Promise<Crop> {
    return this.cropService.update(id, updateCropDto);
  }

  /**
   * Supprime une culture
   * @param {string} id - ID de la culture à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une culture' })
  @ApiResponse({ status: 200, description: 'Culture supprimée avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cropService.remove(id);
  }
}
