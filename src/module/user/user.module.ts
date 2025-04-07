/**
 * Module de gestion des utilisateurs
 * 
 * Ce module fournit les fonctionnalités de gestion des utilisateurs de l'application,
 * incluant la création, récupération, mise à jour et suppression d'utilisateurs.
 * Il établit également les relations avec les rôles et les terrains associés aux utilisateurs.
 * 
 * @module UserModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Land } from '../land/entities/land.entity';

/**
 * Module de gestion des utilisateurs
 * 
 * Configure le contrôleur et le service pour la gestion des utilisateurs,
 * et importe les entités nécessaires via TypeORM.
 * Exporte également le service utilisateur pour qu'il soit disponible dans d'autres modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Land])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
