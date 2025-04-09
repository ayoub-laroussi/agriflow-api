/**
 * Module de gestion des notifications
 * 
 * Ce module gère les fonctionnalités liées aux notifications dans l'application.
 * Il fournit des services et des contrôleurs pour la gestion des notifications et des préférences,
 * permettant de créer, lire, mettre à jour et supprimer des notifications.
 * 
 * @module NotificationModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { User } from '../user/entities/user.entity';
import { NotificationSchedulerService } from './notification-scheduler.service';
import { NotificationPreferenceController } from './notification-preference.controller';
import { NotificationPreferenceService } from './notification-preference.service';

/**
 * Module de gestion des notifications
 * 
 * Configure les dépendances et les composants nécessaires pour la gestion des notifications.
 * Importe le module TypeORM pour l'accès aux données et configure les contrôleurs et services.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationPreference, User])
  ],
  controllers: [NotificationController, NotificationPreferenceController],
  providers: [
    NotificationService, 
    NotificationPreferenceService, 
    NotificationSchedulerService
  ],
  exports: [
    NotificationService, 
    NotificationPreferenceService
  ]
})
export class NotificationModule {}
