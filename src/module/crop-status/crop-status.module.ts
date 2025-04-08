/**
 * Module de gestion des statuts de culture
 * 
 * Ce module gère les fonctionnalités liées aux statuts de culture dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des statuts,
 * permettant de créer, lire, mettre à jour et supprimer des statuts.
 * 
 * @module CropStatusModule
 */
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropStatusService } from './crop-status.service';
import { CropStatusController } from './crop-status.controller';
import { CropStatus } from './entities/crop-status.entity';

/**
 * Module de gestion des statuts de culture
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des statuts.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([CropStatus])
  ],
  controllers: [CropStatusController],
  providers: [CropStatusService],
  exports: [CropStatusService]
})
export class CropStatusModule implements OnModuleInit {
  constructor(private cropStatusService: CropStatusService) {}

  async onModuleInit() {
    // Initialiser les statuts prédéfinis au démarrage du module
    await this.cropStatusService.initializePredefinedStatuses();
  }
} 