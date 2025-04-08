/**
 * DTO pour la mise à jour d'un statut de culture
 */
import { PartialType } from '@nestjs/swagger';
import { CreateCropStatusDto } from './create-crop-status.dto';

export class UpdateCropStatusDto extends PartialType(CreateCropStatusDto) {} 