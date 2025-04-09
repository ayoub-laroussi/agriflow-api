/**
 * Contrôleur pour la gestion des préférences de notification
 * 
 * Ce contrôleur expose les endpoints pour gérer les préférences de notification
 * dans l'application, permettant aux utilisateurs de configurer leurs préférences.
 * 
 * @module NotificationPreferenceController
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  NotFoundException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotificationPreferenceService } from './notification-preference.service';
import { CreateNotificationPreferenceDto } from './dto/create-notification-preference.dto';
import { UpdateNotificationPreferenceDto } from './dto/update-notification-preference.dto';
import { NotificationPreference } from './entities/notification-preference.entity';

/**
 * Interface pour la réponse API standardisée
 */
interface ApiResponseFormat<T> {
  message: string;
  data?: T;
  statusCode: number;
}

/**
 * Contrôleur pour la gestion des préférences de notification
 */
@ApiTags('notification-preferences')
@Controller('notification-preferences')
export class NotificationPreferenceController {
  constructor(private readonly notificationPreferenceService: NotificationPreferenceService) {}

  /**
   * Crée ou met à jour les préférences de notification d'un utilisateur
   */
  @Post()
  @ApiOperation({ summary: 'Créer ou mettre à jour les préférences de notification d\'un utilisateur' })
  @ApiResponse({ 
    status: 201, 
    description: 'Préférences créées ou mises à jour avec succès',
    type: NotificationPreference
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async createOrUpdate(
    @Body() createDto: CreateNotificationPreferenceDto
  ): Promise<ApiResponseFormat<NotificationPreference>> {
    const preferences = await this.notificationPreferenceService.createOrUpdate(createDto);
    return {
      message: 'Préférences de notification créées ou mises à jour avec succès',
      data: preferences,
      statusCode: HttpStatus.CREATED
    };
  }

  /**
   * Récupère toutes les préférences de notification
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les préférences de notification' })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des préférences récupérée avec succès',
    type: [NotificationPreference]
  })
  async findAll(): Promise<ApiResponseFormat<NotificationPreference[]>> {
    const preferences = await this.notificationPreferenceService.findAll();
    return {
      message: 'Liste des préférences de notification récupérée avec succès',
      data: preferences,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Récupère les préférences de notification d'un utilisateur
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupérer les préférences de notification d\'un utilisateur' })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
  @ApiResponse({ 
    status: 200, 
    description: 'Préférences récupérées avec succès',
    type: NotificationPreference
  })
  @ApiResponse({ status: 404, description: 'Préférences non trouvées' })
  async findByUserId(
    @Param('userId') userId: string
  ): Promise<ApiResponseFormat<NotificationPreference>> {
    const preferences = await this.notificationPreferenceService.findByUserId(userId);
    
    if (!preferences) {
      throw new NotFoundException(`Préférences de notification non trouvées pour l'utilisateur ${userId}`);
    }
    
    return {
      message: 'Préférences de notification récupérées avec succès',
      data: preferences,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Récupère des préférences de notification par ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer des préférences de notification par ID' })
  @ApiParam({ name: 'id', description: 'ID des préférences' })
  @ApiResponse({ 
    status: 200, 
    description: 'Préférences récupérées avec succès',
    type: NotificationPreference
  })
  @ApiResponse({ status: 404, description: 'Préférences non trouvées' })
  async findOne(
    @Param('id') id: string
  ): Promise<ApiResponseFormat<NotificationPreference>> {
    const preferences = await this.notificationPreferenceService.findOne(id);
    
    if (!preferences) {
      throw new NotFoundException(`Préférences de notification non trouvées avec l'ID ${id}`);
    }
    
    return {
      message: 'Préférences de notification récupérées avec succès',
      data: preferences,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Met à jour des préférences de notification
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour des préférences de notification' })
  @ApiParam({ name: 'id', description: 'ID des préférences' })
  @ApiResponse({ 
    status: 200, 
    description: 'Préférences mises à jour avec succès',
    type: NotificationPreference
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Préférences non trouvées' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateNotificationPreferenceDto
  ): Promise<ApiResponseFormat<NotificationPreference>> {
    const preferences = await this.notificationPreferenceService.update(id, updateDto);
    
    if (!preferences) {
      throw new NotFoundException(`Préférences de notification non trouvées avec l'ID ${id}`);
    }
    
    return {
      message: 'Préférences de notification mises à jour avec succès',
      data: preferences,
      statusCode: HttpStatus.OK
    };
  }

  /**
   * Supprime des préférences de notification
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer des préférences de notification' })
  @ApiParam({ name: 'id', description: 'ID des préférences' })
  @ApiResponse({ status: 200, description: 'Préférences supprimées avec succès' })
  @ApiResponse({ status: 404, description: 'Préférences non trouvées' })
  async remove(
    @Param('id') id: string
  ): Promise<ApiResponseFormat<null>> {
    // Vérifier si les préférences existent
    const preferences = await this.notificationPreferenceService.findOne(id);
    
    if (!preferences) {
      throw new NotFoundException(`Préférences de notification non trouvées avec l'ID ${id}`);
    }
    
    await this.notificationPreferenceService.remove(id);
    return {
      message: 'Préférences de notification supprimées avec succès',
      statusCode: HttpStatus.OK
    };
  }
} 