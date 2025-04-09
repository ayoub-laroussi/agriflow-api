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

/**
 * Module de gestion des zones
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des zones.
 * Importe le module TypeORM pour l'accès aux données.
 */
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [],
})
export class AreaModule {} 