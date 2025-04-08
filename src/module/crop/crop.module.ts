/**
 * Module de gestion des cultures
 * 
 * Ce module gère les fonctionnalités liées aux cultures dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des cultures,
 * permettant de créer, lire, mettre à jour et supprimer des cultures.
 * 
 * @module CropModule
 */
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { Crop } from './entities/crop.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../cultivation-bed/entities/cultivation-bed.entity';
import { CropStatus } from '../crop-status/entities/crop-status.entity';
import { CropStatusService } from '../crop-status/crop-status.service';
import { CropStatusController } from '../crop-status/crop-status.controller';

/**
 * Module de gestion des cultures
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des cultures.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Crop, CultivationSpace, CultivationBed, CropStatus])
  ],
  controllers: [CropController, CropStatusController],
  providers: [CropService, CropStatusService],
  exports: [CropService, CropStatusService]
})
export class CropModule implements OnModuleInit {
  constructor(private cropStatusService: CropStatusService) {}

  async onModuleInit() {
    // Initialiser les statuts prédéfinis au démarrage du module
    await this.cropStatusService.initializePredefinedStatuses();
  }
}
