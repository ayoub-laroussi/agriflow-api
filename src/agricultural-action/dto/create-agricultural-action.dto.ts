/**
 * DTO pour la création d'une action agricole
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la création d'une nouvelle action agricole via l'API.
 * Il inclut les validations nécessaires pour garantir l'intégrité des données.
 * 
 * @module CreateAgriculturalActionDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { AgriculturalActionType } from '../entities/agricultural-action.entity';

/**
 * Données de création d'une action agricole
 * 
 * Définit les champs requis et les règles de validation
 * pour la création d'une nouvelle action agricole.
 */
export class CreateAgriculturalActionDto {
  @ApiProperty({ 
    description: 'Type d\'action agricole',
    enum: AgriculturalActionType,
    example: AgriculturalActionType.PLANTATION
  })
  @IsEnum(AgriculturalActionType)
  @IsNotEmpty()
  type: AgriculturalActionType;

  @ApiProperty({ description: 'Date de l\'action' })
  @IsDate()
  @IsNotEmpty()
  actionDate: Date;

  @ApiProperty({ description: 'Commentaire sur l\'action', required: false })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({ description: 'ID de l\'espace de culture concerné', required: false })
  @IsUUID()
  @IsOptional()
  cultivationSpaceId?: string;

  @ApiProperty({ description: 'ID de la planche de culture concernée', required: false })
  @IsUUID()
  @IsOptional()
  cultivationBedId?: string;

  @ApiProperty({ description: 'ID de la culture concernée', required: false })
  @IsUUID()
  @IsOptional()
  cropId?: string;
} 