/**
 * Module de gestion des planches de culture
 * 
 * Ce module fournit les fonctionnalités de gestion des planches de culture dans l'application,
 * incluant la création, récupération, mise à jour et suppression de planches de culture.
 * Il établit également les relations avec les espaces de culture.
 * 
 * @module CultivationBedModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivationBedService } from './cultivation-bed.service';
import { CultivationBedController } from './cultivation-bed.controller';
import { CultivationBed } from './entities/cultivation-bed.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';

/**
 * Module de gestion des planches de culture
 * 
 * Configure le contrôleur et le service pour la gestion des planches de culture,
 * et importe les entités nécessaires via TypeORM.
 * Exporte également le service de planches de culture pour qu'il soit disponible dans d'autres modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([CultivationBed, CultivationSpace])],
  controllers: [CultivationBedController],
  providers: [CultivationBedService],
  exports: [CultivationBedService],
})
export class CultivationBedModule {}
