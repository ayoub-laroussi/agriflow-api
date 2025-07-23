/**
 * Contrôleur de gestion des terrains
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des terrains,
 * permettant les opérations CRUD (Create, Read, Update, Delete) sur les terrains.
 * 
 * @module LandController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LandService } from './land.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { Land } from './entities/land.entity';

/**
 * Contrôleur de gestion des terrains
 * 
 * Expose les endpoints RESTful pour manipuler les données des terrains.
 * Le préfixe de route est "/lands".
 */
@ApiTags('lands')
@Controller('lands')
export class LandController {
  constructor(private readonly landService: LandService) {}

  /**
   * Crée un nouveau terrain
   * @param {CreateLandDto} createLandDto - Données pour la création du terrain
   * @returns {Promise<Land>} Terrain créé
   */
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau terrain' })
  @ApiResponse({ status: 201, description: 'Le terrain a été créé avec succès.' })
  create(@Body() createLandDto: CreateLandDto): Promise<Land> {
    return this.landService.create(createLandDto);
  }

  /**
   * Récupère tous les terrains
   * @returns {Promise<Land[]>} Liste de tous les terrains
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les terrains' })
  @ApiResponse({ status: 200, description: 'Liste des terrains récupérée avec succès.' })
  findAll(): Promise<Land[]> {
    return this.landService.findAll();
  }

  /**
   * Récupère un terrain par son ID
   * @param {string} id - ID du terrain à récupérer
   * @returns {Promise<Land>} Terrain trouvé
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un terrain par son ID' })
  @ApiResponse({ status: 200, description: 'Terrain récupéré avec succès.' })
  findOne(@Param('id') id: string): Promise<Land> {
    return this.landService.findOne(id);
  }

  /**
   * Récupère tous les terrains d'un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Land[]>} Liste des terrains de l'utilisateur
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupérer tous les terrains d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des terrains de l\'utilisateur récupérée avec succès.' })
  findByUserId(@Param('userId') userId: string): Promise<Land[]> {
    return this.landService.findByUser(userId);
  }

  /**
   * Met à jour un terrain
   * @param {string} id - ID du terrain à mettre à jour
   * @param {UpdateLandDto} updateLandDto - Données pour la mise à jour
   * @returns {Promise<Land>} Terrain mis à jour
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un terrain' })
  @ApiResponse({ status: 200, description: 'Terrain mis à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateLandDto: UpdateLandDto): Promise<Land> {
    return this.landService.update(id, updateLandDto);
  }

  /**
   * Supprime un terrain
   * @param {string} id - ID du terrain à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un terrain' })
  @ApiResponse({ status: 200, description: 'Terrain supprimé avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.landService.remove(id);
  }
}
