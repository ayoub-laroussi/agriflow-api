/**
 * Module de gestion des observations
 * 
 * Ce module gère les fonctionnalités liées aux observations dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des observations,
 * permettant de créer, lire, mettre à jour et supprimer des observations.
 * 
 * @module ObservationModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';
import { Observation } from './entities/observation.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { Land } from '../land/entities/land.entity';

/**
 * Module de gestion des observations
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des observations.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Observation, CultivationSpace, Land])
  ],
  controllers: [ObservationController],
  providers: [ObservationService],
  exports: [ObservationService]
})
export class ObservationModule {}
