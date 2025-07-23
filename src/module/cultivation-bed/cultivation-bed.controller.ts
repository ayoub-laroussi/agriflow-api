/**
 * Contrôleur de gestion des planches de culture
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des planches de culture,
 * permettant les opérations CRUD (Create, Read, Update, Delete) ainsi que
 * des recherches spécifiques par espace de culture.
 * 
 * @module CultivationBedController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CultivationBedService } from './cultivation-bed.service';
import { CreateCultivationBedDto } from './dto/create-cultivation-bed.dto';
import { UpdateCultivationBedDto } from './dto/update-cultivation-bed.dto';
import { CultivationBed } from './entities/cultivation-bed.entity';

/**
 * Contrôleur de gestion des planches de culture
 * 
 * Expose les endpoints RESTful pour manipuler les données des planches de culture.
 * Le préfixe de route est "/cultivation-beds".
 */
@ApiTags('cultivation-beds')
@Controller('cultivation-beds')
export class CultivationBedController {
  constructor(private readonly cultivationBedService: CultivationBedService) {}

  /**
   * Crée une nouvelle planche de culture
   * @param {CreateCultivationBedDto} createCultivationBedDto - Données pour la création de la planche de culture
   * @returns {Promise<CultivationBed>} Planche de culture créée
   */
  @Post()
  @ApiOperation({ 
    summary: 'Créer une nouvelle planche de culture',
    description: `
      Crée une nouvelle planche de culture associée à un espace de culture existant.
      La planche de culture permet de définir un espace plus précis à l'intérieur d'un espace de culture
      où des cultures spécifiques seront plantées. Les planches peuvent avoir des caractéristiques
      propres comme leur type de sol, leur pH, leurs dimensions, etc.
    ` 
  })
  @ApiBody({ 
    type: CreateCultivationBedDto,
    description: 'Données pour la création d\'une nouvelle planche de culture'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'La planche de culture a été créée avec succès.',
    type: CultivationBed
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Requête invalide. Vérifiez que les données respectent les contraintes de validation.'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'L\'espace de culture spécifié n\'existe pas. Vérifiez l\'ID de l\'espace de culture.'
  })
  create(@Body() createCultivationBedDto: CreateCultivationBedDto): Promise<CultivationBed> {
    return this.cultivationBedService.create(createCultivationBedDto);
  }

  /**
   * Récupère toutes les planches de culture
   * @returns {Promise<CultivationBed[]>} Liste de toutes les planches de culture
   */
  @Get()
  @ApiOperation({ 
    summary: 'Récupérer toutes les planches de culture',
    description: `
      Retourne la liste de toutes les planches de culture enregistrées dans le système.
      Les données retournées incluent les relations avec l'espace de culture parent
      et les cultures qui y sont associées.
    `
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des planches de culture récupérée avec succès.',
    type: [CultivationBed]
  })
  findAll(): Promise<CultivationBed[]> {
    return this.cultivationBedService.findAll();
  }

  /**
   * Récupère une planche de culture par son ID
   * @param {string} id - ID de la planche de culture à récupérer
   * @returns {Promise<CultivationBed>} Planche de culture trouvée
   */
  @Get(':id')
  @ApiOperation({ 
    summary: 'Récupérer une planche de culture par son ID',
    description: `
      Retourne les détails d'une planche de culture spécifique identifiée par son UUID.
      Les données incluent l'espace de culture parent et les cultures associées.
    `
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identifiant UUID de la planche de culture',
    type: 'string',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Planche de culture récupérée avec succès.',
    type: CultivationBed
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Planche de culture non trouvée. L\'ID spécifié n\'existe pas.'
  })
  findOne(@Param('id') id: string): Promise<CultivationBed> {
    return this.cultivationBedService.findOne(id);
  }

  /**
   * Récupère toutes les planches de culture d'un espace de culture
   * @param {string} cultivationSpaceId - ID de l'espace de culture
   * @returns {Promise<CultivationBed[]>} Liste des planches de culture associées à l'espace
   */
  @Get('cultivation-space/:cultivationSpaceId')
  @ApiOperation({ 
    summary: 'Récupérer toutes les planches de culture d\'un espace de culture',
    description: `
      Retourne la liste des planches de culture associées à un espace de culture spécifique.
      Permet de visualiser comment un espace de culture est divisé en planches.
    `
  })
  @ApiParam({ 
    name: 'cultivationSpaceId', 
    description: 'Identifiant UUID de l\'espace de culture',
    type: 'string',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des planches de culture de l\'espace de culture récupérée avec succès.',
    type: [CultivationBed]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Espace de culture non trouvé, ou aucune planche associée.'
  })
  findByCultivationSpaceId(@Param('cultivationSpaceId') cultivationSpaceId: string): Promise<CultivationBed[]> {
    return this.cultivationBedService.findByCultivationSpace(cultivationSpaceId);
  }

  /**
   * Met à jour une planche de culture
   * @param {string} id - ID de la planche de culture à mettre à jour
   * @param {UpdateCultivationBedDto} updateCultivationBedDto - Données pour la mise à jour
   * @returns {Promise<CultivationBed>} Planche de culture mise à jour
   */
  @Patch(':id')
  @ApiOperation({ 
    summary: 'Mettre à jour une planche de culture',
    description: `
      Met à jour les informations d'une planche de culture existante.
      Seuls les champs fournis dans la requête seront modifiés.
    `
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identifiant UUID de la planche de culture à modifier',
    type: 'string',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @ApiBody({ 
    type: UpdateCultivationBedDto,
    description: 'Données pour la mise à jour de la planche de culture (tous les champs sont optionnels)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Planche de culture mise à jour avec succès.',
    type: CultivationBed
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Requête invalide. Vérifiez que les données respectent les contraintes de validation.'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Planche de culture ou espace de culture non trouvé.'
  })
  update(
    @Param('id') id: string,
    @Body() updateCultivationBedDto: UpdateCultivationBedDto,
  ): Promise<CultivationBed> {
    return this.cultivationBedService.update(id, updateCultivationBedDto);
  }

  /**
   * Supprime une planche de culture
   * @param {string} id - ID de la planche de culture à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ 
    summary: 'Supprimer une planche de culture',
    description: `
      Supprime définitivement une planche de culture du système.
      Cette action supprimera également les associations avec les cultures,
      mais ne supprimera pas les cultures elles-mêmes.
    `
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identifiant UUID de la planche de culture à supprimer',
    type: 'string',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Planche de culture supprimée avec succès.'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Planche de culture non trouvée. L\'ID spécifié n\'existe pas.'
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.cultivationBedService.remove(id);
  }
}
