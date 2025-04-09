/**
 * DTO pour la création d'une notification
 */
import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsUUID, 
  IsEnum, 
  IsBoolean, 
  IsOptional, 
  IsDateString,
  IsNotEmpty,
  MaxLength,
  ValidateIf
} from 'class-validator';
import { NotificationType, NotificationPriority } from '../entities/notification.entity';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Type de notification',
    enum: NotificationType,
    example: NotificationType.ACTION_REMINDER
  })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    description: 'Titre de la notification',
    example: 'Rappel d\'arrosage'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Contenu de la notification',
    example: 'N\'oubliez pas d\'arroser vos tomates aujourd\'hui'
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Niveau de priorité',
    enum: NotificationPriority,
    example: NotificationPriority.MEDIUM,
    required: false
  })
  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: NotificationPriority;

  @ApiProperty({
    description: 'Date planifiée d\'envoi de la notification',
    example: '2024-04-10T08:00:00Z'
  })
  @IsDateString()
  scheduledDate: string;

  @ApiProperty({
    description: 'ID de l\'utilisateur destinataire',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Identifiant de l\'entité associée (action, culture, etc.)',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    required: false
  })
  @IsUUID()
  @IsOptional()
  relatedEntityId?: string;

  @ApiProperty({
    description: 'Type de l\'entité associée (action, culture, etc.)',
    example: 'agricultural_action',
    required: false
  })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  @ValidateIf(o => !!o.relatedEntityId)
  relatedEntityType?: string;

  @ApiProperty({
    description: 'Indique si la notification est récurrente',
    example: false,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @ApiProperty({
    description: 'Expression cron pour les notifications récurrentes',
    example: '0 8 * * *',
    required: false
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ValidateIf(o => o.isRecurring === true)
  recurrencePattern?: string;
}
