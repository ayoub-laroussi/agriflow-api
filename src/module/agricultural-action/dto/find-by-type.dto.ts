/**
 * DTO pour la recherche d'actions agricoles par type
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la recherche d'actions agricoles par type spécifique.
 * 
 * @module FindByTypeDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { AgriculturalActionType } from '../entities/agricultural-action.entity';

/**
 * Données pour la recherche par type
 * 
 * Définit les champs requis pour la recherche d'actions agricoles
 * par type spécifique.
 */
export class FindByTypeDto {
  @ApiProperty({ 
    description: 'Type d\'action agricole',
    enum: AgriculturalActionType,
    example: AgriculturalActionType.PLANTATION
  })
  @IsEnum(AgriculturalActionType)
  @IsNotEmpty()
  type: AgriculturalActionType;
} 