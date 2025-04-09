/**
 * DTO pour la création des préférences de notification
 */
import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsUUID, 
  IsBoolean, 
  IsOptional, 
  IsEmail,
  IsPhoneNumber,
  MaxLength,
  Matches,
  IsArray,
  IsNumber
} from 'class-validator';
import { NotificationType } from '../entities/notification.entity';
import { NotificationChannel } from '../entities/notification-preference.entity';

export class CreateNotificationPreferenceDto {
  @ApiProperty({
    description: 'ID de l\'utilisateur',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Indique si les notifications sont globalement activées',
    example: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @ApiProperty({
    description: 'Types de notifications activés',
    example: Object.values(NotificationType),
    isArray: true,
    required: false
  })
  @IsArray()
  @IsOptional()
  enabledTypes?: string[];

  @ApiProperty({
    description: 'Canaux de notification activés',
    example: Object.values(NotificationChannel),
    isArray: true,
    required: false
  })
  @IsArray()
  @IsOptional()
  enabledChannels?: string[];

  @ApiProperty({
    description: 'Adresse email pour les notifications',
    example: 'utilisateur@example.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Numéro de téléphone pour les notifications',
    example: '+33612345678',
    required: false
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Heure quotidienne d\'envoi des résumés (HH:MM)',
    example: '08:00',
    required: false
  })
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Le format de l\'heure doit être HH:MM (ex: 08:00)'
  })
  @IsOptional()
  dailyDigestTime?: string;

  @ApiProperty({
    description: 'Jours de la semaine pour les résumés (1-7, lundi=1)',
    example: ['1', '3', '5'],
    required: false,
    isArray: true
  })
  @IsArray()
  @IsOptional()
  weeklyDigestDays?: string[];

  @ApiProperty({ description: 'Indique si les notifications par email sont activées', default: true })
  @IsBoolean()
  @IsOptional()
  emailEnabled?: boolean;

  @ApiProperty({ description: 'Indique si les notifications push sont activées', default: true })
  @IsBoolean()
  @IsOptional()
  pushEnabled?: boolean;

  @ApiProperty({ description: 'Indique si les notifications SMS sont activées', default: true })
  @IsBoolean()
  @IsOptional()
  smsEnabled?: boolean;

  @ApiProperty({ description: 'Indique si les alertes de cultures sont activées', default: true })
  @IsBoolean()
  @IsOptional()
  cropAlertsEnabled?: boolean;

  @ApiProperty({ description: 'Indique si les alertes météo sont activées', default: true })
  @IsBoolean()
  @IsOptional()
  weatherAlertsEnabled?: boolean;

  @ApiProperty({ description: 'Indique si les rappels de tâches sont activés', default: true })
  @IsBoolean()
  @IsOptional()
  taskRemindersEnabled?: boolean;
} 