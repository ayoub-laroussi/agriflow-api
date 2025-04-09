/**
 * Module de gestion des actions agricoles
 * 
 * Ce module configure les dépendances nécessaires pour la gestion des actions agricoles,
 * notamment les repositories TypeORM et les services associés.
 * 
 * @module AgriculturalActionModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgriculturalActionService } from './agricultural-action.service';
import { AgriculturalActionController } from './agricultural-action.controller';
import { AgriculturalAction } from './entities/agricultural-action.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../cultivation-bed/entities/cultivation-bed.entity';
import { Crop } from '../crop/entities/crop.entity';

/**
 * Module de gestion des actions agricoles
 * 
 * Configure les dépendances et les repositories nécessaires
 * pour le fonctionnement du module d'actions agricoles.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgriculturalAction,
      CultivationSpace,
      CultivationBed,
      Crop,
    ]),
  ],
  controllers: [AgriculturalActionController],
  providers: [AgriculturalActionService],
  exports: [AgriculturalActionService],
})
export class AgriculturalActionModule {}
