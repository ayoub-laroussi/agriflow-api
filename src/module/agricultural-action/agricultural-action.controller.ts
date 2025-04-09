/**
 * Contrôleur de gestion des actions agricoles
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des actions agricoles.
 * Il fournit des routes pour créer, lire, mettre à jour et supprimer des actions,
 * ainsi que des routes spécifiques pour rechercher des actions par date et type.
 * 
 * @module AgriculturalActionController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AgriculturalActionService } from './agricultural-action.service';
import { CreateAgriculturalActionDto } from './dto/create-agricultural-action.dto';
import { UpdateAgriculturalActionDto } from './dto/update-agricultural-action.dto';
import { FindByDateRangeDto } from './dto/find-by-date-range.dto';
import { FindByTypeDto } from './dto/find-by-type.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AgriculturalAction, AgriculturalActionType } from './entities/agricultural-action.entity';

/**
 * Contrôleur de gestion des actions agricoles
 * 
 * Expose les endpoints REST pour la manipulation des actions agricoles
 * avec documentation Swagger complète.
 */
@ApiTags('actions-agricoles')
@Controller('agricultural-actions')
export class AgriculturalActionController {
  constructor(private readonly agriculturalActionService: AgriculturalActionService) {}

  /**
   * Crée une nouvelle action agricole
   * 
   * @param {CreateAgriculturalActionDto} createAgriculturalActionDto - Données pour la création
   * @returns {Promise<AgriculturalAction>} L'action créée
   */
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle action agricole' })
  @ApiResponse({ 
    status: 201, 
    description: 'L\'action a été créée avec succès',
    type: AgriculturalAction 
  })
  create(@Body() createAgriculturalActionDto: CreateAgriculturalActionDto) {
    return this.agriculturalActionService.create(createAgriculturalActionDto);
  }

  /**
   * Récupère toutes les actions agricoles
   * 
   * @returns {Promise<AgriculturalAction[]>} Liste de toutes les actions
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les actions agricoles' })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des actions agricoles',
    type: [AgriculturalAction] 
  })
  findAll() {
    return this.agriculturalActionService.findAll();
  }

  /**
   * Récupère une action agricole par son ID
   * 
   * @param {string} id - ID de l'action à récupérer
   * @returns {Promise<AgriculturalAction>} L'action trouvée
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une action agricole par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'action agricole' })
  @ApiResponse({ 
    status: 200, 
    description: 'L\'action agricole a été trouvée',
    type: AgriculturalAction 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'L\'action agricole n\'a pas été trouvée' 
  })
  findOne(@Param('id') id: string) {
    return this.agriculturalActionService.findOne(id);
  }

  /**
   * Met à jour une action agricole
   * 
   * @param {string} id - ID de l'action à mettre à jour
   * @param {UpdateAgriculturalActionDto} updateAgriculturalActionDto - Données pour la mise à jour
   * @returns {Promise<AgriculturalAction>} L'action mise à jour
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une action agricole' })
  @ApiParam({ name: 'id', description: 'ID de l\'action agricole' })
  @ApiResponse({ 
    status: 200, 
    description: 'L\'action a été mise à jour avec succès',
    type: AgriculturalAction 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'L\'action agricole n\'a pas été trouvée' 
  })
  update(
    @Param('id') id: string,
    @Body() updateAgriculturalActionDto: UpdateAgriculturalActionDto,
  ) {
    return this.agriculturalActionService.update(id, updateAgriculturalActionDto);
  }

  /**
   * Supprime une action agricole
   * 
   * @param {string} id - ID de l'action à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une action agricole' })
  @ApiParam({ name: 'id', description: 'ID de l\'action agricole' })
  @ApiResponse({ 
    status: 200, 
    description: 'L\'action a été supprimée avec succès' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'L\'action agricole n\'a pas été trouvée' 
  })
  remove(@Param('id') id: string) {
    return this.agriculturalActionService.remove(id);
  }

  /**
   * Récupère les actions agricoles pour une période donnée
   * 
   * @param {Date} startDate - Date de début de la période
   * @param {Date} endDate - Date de fin de la période
   * @returns {Promise<AgriculturalAction[]>} Liste des actions dans la période
   */
  @Get('by-date-range')
  @ApiOperation({ summary: 'Récupérer les actions agricoles par période' })
  @ApiQuery({ 
    name: 'startDate', 
    description: 'Date de début de la période',
    type: Date 
  })
  @ApiQuery({ 
    name: 'endDate', 
    description: 'Date de fin de la période',
    type: Date 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des actions dans la période spécifiée',
    type: [AgriculturalAction] 
  })
  findByDateRange(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.agriculturalActionService.findByDateRange(startDate, endDate);
  }

  /**
   * Récupère les actions agricoles par type
   * 
   * @param {FindByTypeDto} findByTypeDto - Type d'action à rechercher
   * @returns {Promise<AgriculturalAction[]>} Liste des actions du type spécifié
   */
  @Get('by-type')
  @ApiOperation({ summary: 'Récupérer les actions agricoles par type' })
  @ApiQuery({ 
    name: 'type', 
    description: 'Type d\'action agricole',
    enum: AgriculturalActionType,
    example: AgriculturalActionType.PLANTATION
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des actions du type spécifié',
    type: [AgriculturalAction] 
  })
  findByType(@Query('type') type: AgriculturalActionType) {
    return this.agriculturalActionService.findByType(type);
  }
}
