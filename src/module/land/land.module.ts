/**
 * Module de gestion des terrains
 * 
 * Ce module gère les fonctionnalités liées aux terrains dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des terrains,
 * permettant de créer, lire, mettre à jour et supprimer des terrains.
 * 
 * @module LandModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandService } from './land.service';
import { LandController } from './land.controller';
import { Land } from './entities/land.entity';
import { User } from '../user/entities/user.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';

/**
 * Module de gestion des terrains
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des terrains.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Land, User, CultivationSpace])],
  controllers: [LandController],
  providers: [LandService],
})
export class LandModule {}
