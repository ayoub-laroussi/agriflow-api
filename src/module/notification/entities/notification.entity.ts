/**
 * Entité représentant une notification dans le système
 * 
 * Cette entité définit la structure de données d'une notification dans l'application,
 * incluant son type, son contenu, sa date d'envoi et son statut.
 * Elle est mappée à la table 'notifications' dans la base de données.
 * 
 * @module Notification
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

/**
 * Énumération des types de notification possibles
 */
export enum NotificationType {
  ACTION_REMINDER = 'rappel_action',
  CROP_STATUS = 'statut_culture',
  SYSTEM = 'système',
  WEATHER_ALERT = 'alerte_météo',
  CUSTOM = 'personnalisé'
}

/**
 * Énumération des niveaux de priorité de notification
 */
export enum NotificationPriority {
  LOW = 'basse',
  MEDIUM = 'moyenne',
  HIGH = 'haute'
}

/**
 * Entité Notification
 * 
 * Représente une notification avec ses propriétés et relations.
 * Une notification est toujours associée à un utilisateur et peut
 * avoir différents types et niveaux de priorité.
 */
@Entity('notifications')
export class Notification {
  @ApiProperty({ description: 'Identifiant unique de la notification' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ 
    description: 'Type de notification',
    enum: NotificationType,
    example: NotificationType.ACTION_REMINDER
  })
  @Column({ 
    name: 'type', 
    length: 50, 
    type: 'varchar',
    enum: NotificationType
  })
  type: NotificationType;

  @ApiProperty({ description: 'Titre de la notification' })
  @Column({ name: 'title', length: 100, type: 'varchar' })
  title: string;

  @ApiProperty({ description: 'Contenu de la notification' })
  @Column({ name: 'content', type: 'text' })
  content: string;

  @ApiProperty({ 
    description: 'Niveau de priorité',
    enum: NotificationPriority,
    example: NotificationPriority.MEDIUM
  })
  @Column({ 
    name: 'priority', 
    length: 20, 
    type: 'varchar',
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM
  })
  priority: NotificationPriority;

  @ApiProperty({ description: 'Date planifiée d\'envoi de la notification' })
  @Column({ name: 'scheduled_date', type: 'timestamp' })
  scheduledDate: Date;

  @ApiProperty({ description: 'Indique si la notification a été lue' })
  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @ApiProperty({ description: 'Indique si la notification a été envoyée' })
  @Column({ name: 'is_sent', type: 'boolean', default: false })
  isSent: boolean;

  @ApiProperty({ description: 'Date d\'envoi effective de la notification' })
  @Column({ name: 'sent_date', type: 'timestamp', nullable: true })
  sentDate: Date;

  @ApiProperty({ description: 'Identifiant de l\'entité associée (action, culture, etc.)' })
  @Column({ name: 'related_entity_id', type: 'uuid', nullable: true })
  relatedEntityId: string;

  @ApiProperty({ description: 'Type de l\'entité associée (action, culture, etc.)' })
  @Column({ name: 'related_entity_type', length: 50, type: 'varchar', nullable: true })
  relatedEntityType: string;

  @ApiProperty({ description: 'Indique si la notification est récurrente' })
  @Column({ name: 'is_recurring', type: 'boolean', default: false })
  isRecurring: boolean;

  @ApiProperty({ description: 'Expression cron pour les notifications récurrentes' })
  @Column({ name: 'recurrence_pattern', length: 100, type: 'varchar', nullable: true })
  recurrencePattern: string;

  @ApiProperty({ description: 'Utilisateur destinataire de la notification' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ description: 'ID de l\'utilisateur destinataire' })
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
