/**
 * DTO pour la mise à jour des préférences de notification
 */
import { PartialType } from '@nestjs/swagger';
import { CreateNotificationPreferenceDto } from './create-notification-preference.dto';

export class UpdateNotificationPreferenceDto extends PartialType(CreateNotificationPreferenceDto) {} 