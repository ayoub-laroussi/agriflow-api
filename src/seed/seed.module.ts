/**
 * Module de seeding de la base de données
 * 
 * Ce module fournit les fonctionnalités pour initialiser la base de données
 * avec des données de test pour l'application.
 * 
 * @module SeedModule
 */
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Module de seeding
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([])
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService]
})
export class SeedModule {} 