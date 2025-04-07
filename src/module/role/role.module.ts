/**
 * Module de gestion des rôles
 * 
 * Ce module gère les fonctionnalités liées aux rôles dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des rôles,
 * permettant de créer, lire, mettre à jour et supprimer des rôles.
 * 
 * @module RoleModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';

/**
 * Module de gestion des rôles
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des rôles.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
