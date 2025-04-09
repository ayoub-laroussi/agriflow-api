/**
 * Contrôleur de seeding de la base de données
 * 
 * Ce contrôleur expose un endpoint pour initialiser la base de données
 * avec des données de test.
 * 
 * @module SeedController
 */
import { Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';

/**
 * Interface pour la réponse API standardisée
 */
interface ApiResponseFormat<T> {
  message: string;
  data?: T;
  statusCode: number;
}

/**
 * Contrôleur de seeding
 */
@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  /**
   * Initialise la base de données avec des données de test
   */
  @Post()
  @ApiOperation({ summary: 'Initialiser la base de données avec des données de test' })
  @ApiResponse({
    status: 201,
    description: 'Base de données initialisée avec succès'
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur lors de l\'initialisation de la base de données'
  })
  async seed(): Promise<ApiResponseFormat<null>> {
    await this.seedService.seed();
    
    return {
      message: 'Base de données initialisée avec succès',
      statusCode: HttpStatus.CREATED
    };
  }
} 