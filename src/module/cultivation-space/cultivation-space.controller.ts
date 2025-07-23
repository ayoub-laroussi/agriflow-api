/**
 * Contrôleur de gestion des espaces de culture
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des espaces de culture,
 * permettant les opérations CRUD (Create, Read, Update, Delete) sur les espaces de culture.
 * 
 * @module CultivationSpaceController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CultivationSpaceService } from './cultivation-space.service';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';
import { CultivationSpace } from './entities/cultivation-space.entity';

/**
 * Contrôleur de gestion des espaces de culture
 * 
 * Expose les endpoints RESTful pour manipuler les données des espaces de culture.
 * Le préfixe de route est "/cultivation-spaces".
 */
@ApiTags('cultivation-spaces')
@Controller('cultivation-spaces')
export class CultivationSpaceController {
  constructor(private readonly cultivationSpaceService: CultivationSpaceService) {}

  /**
   * Crée un nouvel espace de culture
   * @param {CreateCultivationSpaceDto} createCultivationSpaceDto - Données pour la création de l'espace de culture
   * @returns {Promise<CultivationSpace>} Espace de culture créé
   */
  @Post()
  @ApiOperation({ summary: 'Créer un nouvel espace de culture' })
  @ApiResponse({ status: 201, description: 'L\'espace de culture a été créé avec succès.' })
  create(@Body() createCultivationSpaceDto: CreateCultivationSpaceDto): Promise<CultivationSpace> {
    return this.cultivationSpaceService.create(createCultivationSpaceDto);
  }

  /**
   * Récupère tous les espaces de culture
   * @returns {Promise<CultivationSpace[]>} Liste de tous les espaces de culture
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les espaces de culture' })
  @ApiResponse({ status: 200, description: 'Liste des espaces de culture récupérée avec succès.' })
  findAll(): Promise<CultivationSpace[]> {
    return this.cultivationSpaceService.findAll();
  }

  /**
   * Récupère un espace de culture par son ID
   * @param {string} id - ID de l'espace de culture à récupérer
   * @returns {Promise<CultivationSpace>} Espace de culture trouvé
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un espace de culture par son ID' })
  @ApiResponse({ status: 200, description: 'Espace de culture récupéré avec succès.' })
  findOne(@Param('id') id: string): Promise<CultivationSpace> {
    return this.cultivationSpaceService.findOne(id);
  }

  /**
   * Récupère tous les espaces de culture d'un terrain
   * @param {string} landId - ID du terrain
   * @returns {Promise<CultivationSpace[]>} Liste des espaces de culture du terrain
   */
  @Get('land/:landId')
  @ApiOperation({ summary: 'Récupérer tous les espaces de culture d\'un terrain' })
  @ApiResponse({ status: 200, description: 'Liste des espaces de culture du terrain récupérée avec succès.' })
  findByLandId(@Param('landId') landId: string): Promise<CultivationSpace[]> {
    return this.cultivationSpaceService.findByLand(landId);
  }

  /**
   * Met à jour un espace de culture
   * @param {string} id - ID de l'espace de culture à mettre à jour
   * @param {UpdateCultivationSpaceDto} updateCultivationSpaceDto - Données pour la mise à jour
   * @returns {Promise<CultivationSpace>} Espace de culture mis à jour
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un espace de culture' })
  @ApiResponse({ status: 200, description: 'Espace de culture mis à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateCultivationSpaceDto: UpdateCultivationSpaceDto): Promise<CultivationSpace> {
    return this.cultivationSpaceService.update(id, updateCultivationSpaceDto);
  }

  /**
   * Supprime un espace de culture
   * @param {string} id - ID de l'espace de culture à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un espace de culture' })
  @ApiResponse({ status: 200, description: 'Espace de culture supprimé avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cultivationSpaceService.remove(id);
  }
}
