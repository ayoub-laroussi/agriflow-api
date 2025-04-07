/**
 * DTO pour la création d'un espace de culture
 * 
 * Ce DTO définit la structure des données attendues lors de la création
 * d'un nouvel espace de culture via l'API. Il inclut des validations
 * pour s'assurer que les données sont correctement formatées.
 * 
 * @module CreateCultivationSpaceDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, MaxLength, Min, Max } from 'class-validator';

/**
 * Classe définissant les données requises pour créer un espace de culture
 * 
 * Contient toutes les propriétés nécessaires pour créer un nouvel espace
 * de culture, avec des validations appropriées pour chaque champ.
 */
export class CreateCultivationSpaceDto {
  @ApiProperty({ description: 'Nom de l\'espace de culture' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  cultivation_space_name: string;

  @ApiProperty({ description: 'Type d\'espace de culture', required: false })
  @IsString()
  @IsOptional()
  cultivation_space_type?: string;

  @ApiProperty({ description: 'Statut de l\'espace de culture', required: false })
  @IsString()
  @IsOptional()
  cultivation_spaces_status?: string;

  @ApiProperty({ description: 'Surface de l\'espace de culture', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  cultivation_spaces_area?: number;

  @ApiProperty({ description: 'Longueur de l\'espace de culture', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  cultivation_spaces_length?: number;

  @ApiProperty({ description: 'Type de sol', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  cultivation_spaces_soil_type?: string;

  @ApiProperty({ description: 'Largeur de l\'espace de culture', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  cultivation_spaces_width?: number;

  @ApiProperty({ description: 'pH du sol', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(14)
  cultivation_spaces_ph?: number;

  @ApiProperty({ description: 'Commentaire sur l\'espace de culture', required: false })
  @IsString()
  @IsOptional()
  cultivation_spaces_commentary?: string;

  @ApiProperty({ description: 'Fertilité du sol', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  cultivation_spaces_soil_fertility?: string;

  @ApiProperty({ description: 'Drainage du sol', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  cultivation_spaces_soil_drainage?: string;

  @ApiProperty({ description: 'ID du terrain' })
  @IsString()
  @IsNotEmpty()
  id_land: string;
}
