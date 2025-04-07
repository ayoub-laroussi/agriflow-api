/**
 * DTO pour la création d'une culture
 * 
 * Ce DTO définit la structure des données attendues lors de la création
 * d'une nouvelle culture via l'API. Il inclut des validations pour s'assurer
 * que les données sont correctement formatées.
 * 
 * @module CreateCropDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

/**
 * Classe définissant les données requises pour créer une culture
 * 
 * Contient toutes les propriétés nécessaires pour créer une nouvelle culture,
 * avec des validations appropriées pour chaque champ.
 */
export class CreateCropDto {
  @ApiProperty({ description: 'Commentaire sur la culture', required: false })
  @IsString()
  @IsOptional()
  crop_commentary?: string;

  @ApiProperty({ description: 'Nom de la culture' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  crop_name: string;

  @ApiProperty({ description: 'Famille de la plante', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  crop_plant_family?: string;

  @ApiProperty({ description: 'Variété de la culture', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  crop_variety?: string;

  @ApiProperty({ description: 'Date de plantation' })
  @IsDate()
  @IsNotEmpty()
  crop_planting_date: Date;

  @ApiProperty({ description: 'Date de récolte', required: false })
  @IsDate()
  @IsOptional()
  crop_harvest_date?: Date;

  @ApiProperty({ description: 'Statut de la culture', required: false })
  @IsString()
  @IsOptional()
  crop_status?: string;
}
