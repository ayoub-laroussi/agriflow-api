/**
 * Module de gestion des zones
 * 
 * Ce module fournit les fonctionnalités de gestion des zones dans l'application,
 * incluant la création, récupération, mise à jour et suppression des zones.
 * 
 * @module AreaModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area } from './entities/area.entity';

/**
 * Module de gestion des zones
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des zones.
 * Importe le module TypeORM pour l'accès aux données.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
