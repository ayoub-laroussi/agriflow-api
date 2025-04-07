/**
 * Module de gestion des couvertures de sol
 * 
 * Ce module gère les fonctionnalités liées aux couvertures de sol dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des couvertures de sol,
 * permettant de créer, lire, mettre à jour et supprimer des couvertures de sol.
 * 
 * @module SoilCoverModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilCoverService } from './soilcover.service';
import { SoilCoverController } from './soilcover.controller';
import { SoilCover } from './entities/soilcover.entity';

/**
 * Module de gestion des couvertures de sol
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des couvertures de sol.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SoilCover])],
  controllers: [SoilCoverController],
  providers: [SoilCoverService],
})
export class SoilCoverModule {}
