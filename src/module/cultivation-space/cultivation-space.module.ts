/**
 * Module de gestion des espaces de culture
 * 
 * Ce module gère les fonctionnalités liées aux espaces de culture dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des espaces de culture,
 * permettant de créer, lire, mettre à jour et supprimer des espaces de culture.
 * 
 * @module CultivationSpaceModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivationSpaceService } from './cultivation-space.service';
import { CultivationSpaceController } from './cultivation-space.controller';
import { CultivationSpace } from './entities/cultivation-space.entity';
import { Land } from '../land/entities/land.entity';

/**
 * Module de gestion des espaces de culture
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des espaces de culture.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [TypeOrmModule.forFeature([CultivationSpace, Land])],
  controllers: [CultivationSpaceController],
  providers: [CultivationSpaceService],
})
export class CultivationSpaceModule {}
