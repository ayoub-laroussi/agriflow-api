/**
 * DTO pour la recherche d'actions agricoles par plage de dates
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la recherche d'actions agricoles dans une plage de dates spécifique.
 * 
 * @module FindByDateRangeDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Données pour la recherche par plage de dates
 * 
 * Définit les champs requis pour la recherche d'actions agricoles
 * dans une période donnée.
 */
export class FindByDateRangeDto {
  @ApiProperty({ 
    description: 'Date de début de la période',
    example: '2023-01-01T00:00:00.000Z'
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ 
    description: 'Date de fin de la période',
    example: '2023-12-31T23:59:59.999Z'
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;
} 