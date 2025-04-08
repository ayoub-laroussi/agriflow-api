/**
 * Contrôleur de gestion des statuts de culture
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des statuts de culture,
 * permettant les opérations CRUD (Create, Read, Update, Delete) sur les statuts.
 * 
 * @module CropStatusController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CropStatusService } from './crop-status.service';
import { CreateCropStatusDto } from './dto/create-crop-status.dto';
import { UpdateCropStatusDto } from './dto/update-crop-status.dto';
import { CropStatus } from './entities/crop-status.entity';

/**
 * Contrôleur de gestion des statuts de culture
 * 
 * Expose les endpoints RESTful pour manipuler les données des statuts de culture.
 * Le préfixe de route est "/crop-statuses".
 */
@ApiTags('crop-statuses')
@Controller('crop-statuses')
export class CropStatusController {
  constructor(private readonly cropStatusService: CropStatusService) {}

  /**
   * Crée un nouveau statut de culture
   * @param {CreateCropStatusDto} createCropStatusDto - Données pour la création du statut
   * @returns {Promise<CropStatus>} Statut créé
   */
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau statut de culture' })
  @ApiResponse({ status: 201, description: 'Le statut a été créé avec succès.' })
  create(@Body() createCropStatusDto: CreateCropStatusDto): Promise<CropStatus> {
    return this.cropStatusService.create(createCropStatusDto);
  }

  /**
   * Récupère tous les statuts de culture
   * @returns {Promise<CropStatus[]>} Liste de tous les statuts
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les statuts de culture' })
  @ApiResponse({ status: 200, description: 'Liste des statuts récupérée avec succès.' })
  findAll(): Promise<CropStatus[]> {
    return this.cropStatusService.findAll();
  }

  /**
   * Récupère un statut par son ID
   * @param {string} id - ID du statut à récupérer
   * @returns {Promise<CropStatus>} Statut trouvé
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un statut par son ID' })
  @ApiResponse({ status: 200, description: 'Statut récupéré avec succès.' })
  findOne(@Param('id') id: string): Promise<CropStatus> {
    return this.cropStatusService.findOne(id);
  }

  /**
   * Met à jour un statut
   * @param {string} id - ID du statut à mettre à jour
   * @param {UpdateCropStatusDto} updateCropStatusDto - Données pour la mise à jour
   * @returns {Promise<CropStatus>} Statut mis à jour
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un statut' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour avec succès.' })
  update(@Param('id') id: string, @Body() updateCropStatusDto: UpdateCropStatusDto): Promise<CropStatus> {
    return this.cropStatusService.update(id, updateCropStatusDto);
  }

  /**
   * Supprime un statut
   * @param {string} id - ID du statut à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un statut' })
  @ApiResponse({ status: 200, description: 'Statut supprimé avec succès.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cropStatusService.remove(id);
  }
} 