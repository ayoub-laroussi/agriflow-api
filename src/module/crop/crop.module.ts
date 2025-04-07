/**
 * Module de gestion des cultures
 * 
 * Ce module gère les fonctionnalités liées aux cultures dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des cultures,
 * permettant de créer, lire, mettre à jour et supprimer des cultures.
 * 
 * @module CropModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { Crop } from './entities/crop.entity';

/**
 * Module de gestion des cultures
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des cultures.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Crop])],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
