/**
 * Entité représentant les préférences de notification d'un utilisateur
 * 
 * Cette entité définit la structure de données pour les préférences de notification
 * d'un utilisateur dans l'application, incluant les types de notifications activés
 * et les canaux de communication préférés.
 * 
 * @module NotificationPreference
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { NotificationType } from './notification.entity';

/**
 * Énumération des canaux de notification possibles
 */
export enum NotificationChannel {
  EMAIL = 'email',
  IN_APP = 'application',
  PUSH = 'push',
  SMS = 'sms'
}

/**
 * Entité Préférence de Notification
 * 
 * Représente les préférences de notification d'un utilisateur avec ses propriétés.
 * Permet de configurer quels types de notifications l'utilisateur souhaite recevoir
 * et par quels canaux.
 */
@Entity('notification_preferences')
export class NotificationPreference {
  @ApiProperty({ description: 'Identifiant unique des préférences' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'ID de l\'utilisateur associé' })
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty({ description: 'Indique si les notifications sont globalement activées' })
  @Column({ default: true, type: 'boolean' })
  emailEnabled: boolean;

  @ApiProperty({ description: 'Indique si les notifications push sont activées' })
  @Column({ default: true, type: 'boolean' })
  pushEnabled: boolean;

  @ApiProperty({ description: 'Indique si les notifications SMS sont activées' })
  @Column({ default: true, type: 'boolean' })
  smsEnabled: boolean;

  @ApiProperty({ description: 'Indique si les alertes de croissance sont activées' })
  @Column({ default: true, type: 'boolean' })
  cropAlertsEnabled: boolean;

  @ApiProperty({ description: 'Indique si les alertes météorologiques sont activées' })
  @Column({ default: true, type: 'boolean' })
  weatherAlertsEnabled: boolean;

  @ApiProperty({ description: 'Indique si les rappels de tâche sont activés' })
  @Column({ default: true, type: 'boolean' })
  taskRemindersEnabled: boolean;

  @ApiProperty({ description: 'Types de notifications activés' })
  @Column({ 
    name: 'enabled_types', 
    type: 'simple-array', 
    default: Object.values(NotificationType).join(',')
  })
  enabledTypes: string[];

  @ApiProperty({ description: 'Canaux de notification activés' })
  @Column({ 
    name: 'enabled_channels', 
    type: 'simple-array', 
    default: Object.values(NotificationChannel).join(',')
  })
  enabledChannels: string[];

  @ApiProperty({ description: 'Adresse email pour les notifications' })
  @Column({ name: 'email', type: 'varchar', length: 100, nullable: true })
  email: string;

  @ApiProperty({ description: 'Numéro de téléphone pour les notifications' })
  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone: string;

  @ApiProperty({ description: 'Heure quotidienne d\'envoi des résumés (HH:MM)' })
  @Column({ name: 'daily_digest_time', type: 'varchar', length: 5, default: '08:00' })
  dailyDigestTime: string;

  @ApiProperty({ description: 'Jours de la semaine pour les résumés (1-7, lundi=1)' })
  @Column({ name: 'weekly_digest_days', type: 'simple-array', default: '1,3,5' })
  weeklyDigestDays: string[];

  @ApiProperty({ description: 'Utilisateur associé à ces préférences' })
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
} 