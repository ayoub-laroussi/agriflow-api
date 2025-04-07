/**
 * DTO pour la création d'un terrain
 * 
 * Ce DTO définit la structure des données attendues lors de la création
 * d'un nouveau terrain via l'API. Il inclut des validations pour s'assurer
 * que les données sont correctement formatées.
 * 
 * @module CreateLandDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator';

/**
 * Classe définissant les données requises pour créer un terrain
 * 
 * Contient toutes les propriétés nécessaires pour créer un nouveau terrain,
 * avec des validations appropriées pour chaque champ.
 */
export class CreateLandDto {
  @ApiProperty({ description: 'Nom du terrain' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  land_name: string;

  @ApiProperty({ description: 'Surface du terrain en mètres carrés' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  land_area: number;

  @ApiProperty({ description: 'Coordonnées du terrain', required: false })
  @IsNumber()
  @IsOptional()
  land_coordinate?: number;

  @ApiProperty({ description: 'ID de l\'utilisateur propriétaire' })
  @IsString()
  @IsNotEmpty()
  id_user: string;
}
