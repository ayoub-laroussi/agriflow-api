/**
 * Module de gestion des utilisateurs étendu
 * 
 * Ce module étend les fonctionnalités de gestion des utilisateurs 
 * pour ajouter des fonctionnalités supplémentaires comme la gestion
 * des profils et des préférences.
 * 
 * @module UsersModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

/**
 * Module de gestion des utilisateurs étendu
 * 
 * Configure le module en important le module utilisateur de base
 * et en ajoutant des fonctionnalités supplémentaires.
 */
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {} 