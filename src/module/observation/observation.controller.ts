/**
 * Contrôleur pour la gestion des observations
 * 
 * Ce contrôleur expose les endpoints pour gérer les observations dans l'application,
 * incluant la création, la récupération, la mise à jour et la suppression d'observations,
 * ainsi que des recherches spécifiques par date et par relation.
 * 
 * @module ObservationController
 */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  ParseUUIDPipe, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ObservationService } from './observation.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { ParseDatePipe } from '../../common/pipes/parse-date.pipe';

/**
 * Interface pour la réponse API standardisée
 */
interface ApiResponseFormat<T> {
  message: string;
  data?: T;
  statusCode: number;
}

/**
 * Contrôleur pour la gestion des observations
 */
@ApiTags('observations')
@Controller('observations')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  /**
   * Crée une nouvelle observation
   */
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle observation' })
  @ApiResponse({ 
    status: 201, 
    description: 'Observation créée avec succès',
    type: Observation
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Espace de culture ou terrain non trouvé' })
  async create(@Body() createObservationDto: CreateObservationDto): Promise<ApiResponseFormat<Observation>> {
    const observation = await this.observationService.create(createObservationDto);
    return {
      message: 'Observation créée avec succès',
      data: observation,
      statusCode: HttpStatus.CREATED
    };
  }

  /**
   * Récupère toutes les observations
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les observations' })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des observations récupérée avec succès',
    type: [Observation]
  })
  async findAll(): Promise<ApiResponseFormat<Observation[]>> {
    const observations = await this.observationService.findAll();
    return {
      message: 'Liste des observations récupérée avec succès',
      data: observations,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Récupère les observations par plage de dates
   */
  @Get('by-date-range')
  @ApiOperation({ summary: 'Récupérer les observations par plage de dates' })
  @ApiQuery({ name: 'startDate', description: 'Date de début (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: 'Date de fin (YYYY-MM-DD)', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Observations pour la plage de dates récupérées avec succès',
    type: [Observation]
  })
  async findByDateRange(
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ): Promise<ApiResponseFormat<Observation[]>> {
    const observations = await this.observationService.findByDateRange(startDate, endDate);
    return {
      message: 'Observations pour la période récupérées avec succès',
      data: observations,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Récupère les observations pour un espace de culture spécifique
   */
  @Get('by-cultivation-space/:id')
  @ApiOperation({ summary: 'Récupérer les observations par espace de culture' })
  @ApiParam({ name: 'id', description: 'ID de l\'espace de culture' })
  @ApiResponse({ 
    status: 200, 
    description: 'Observations pour l\'espace de culture récupérées avec succès',
    type: [Observation]
  })
  async findByCultivationSpace(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponseFormat<Observation[]>> {
    const observations = await this.observationService.findByCultivationSpace(id);
    return {
      message: `Observations pour l'espace de culture ${id} récupérées avec succès`,
      data: observations,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Récupère les observations pour un terrain spécifique
   */
  @Get('by-land/:id')
  @ApiOperation({ summary: 'Récupérer les observations par terrain' })
  @ApiParam({ name: 'id', description: 'ID du terrain' })
  @ApiResponse({ 
    status: 200, 
    description: 'Observations pour le terrain récupérées avec succès',
    type: [Observation]
  })
  async findByLand(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponseFormat<Observation[]>> {
    const observations = await this.observationService.findByLand(id);
    return {
      message: `Observations pour le terrain ${id} récupérées avec succès`,
      data: observations,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Récupère une observation par son ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une observation par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'observation' })
  @ApiResponse({ 
    status: 200, 
    description: 'Observation récupérée avec succès',
    type: Observation
  })
  @ApiResponse({ status: 404, description: 'Observation non trouvée' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponseFormat<Observation>> {
    const observation = await this.observationService.findOne(id);
    return {
      message: 'Observation récupérée avec succès',
      data: observation,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Met à jour une observation
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une observation' })
  @ApiParam({ name: 'id', description: 'ID de l\'observation' })
  @ApiResponse({ 
    status: 200, 
    description: 'Observation mise à jour avec succès',
    type: Observation
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Observation non trouvée' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateObservationDto: UpdateObservationDto,
  ): Promise<ApiResponseFormat<Observation>> {
    const observation = await this.observationService.update(id, updateObservationDto);
    return {
      message: 'Observation mise à jour avec succès',
      data: observation,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Supprime une observation
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer une observation' })
  @ApiParam({ name: 'id', description: 'ID de l\'observation' })
  @ApiResponse({ status: 200, description: 'Observation supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Observation non trouvée' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponseFormat<null>> {
    await this.observationService.remove(id);
    return {
      message: 'Observation supprimée avec succès',
      statusCode: HttpStatus.OK
    };
  }
}
