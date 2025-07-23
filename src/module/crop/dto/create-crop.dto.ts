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
import { IsString, IsDate, IsNotEmpty, IsOptional, MaxLength, IsUUID, IsArray, IsNumber } from 'class-validator';

/**
 * Classe définissant les données requises pour créer une culture
 * 
 * Contient toutes les propriétés nécessaires pour créer une nouvelle culture,
 * avec des validations appropriées pour chaque champ.
 */
export class CreateCropDto {
  @ApiProperty({ description: 'Nom de la culture' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Commentaire sur la culture', required: false })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({ description: 'Famille de la plante' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  plantFamily: string;

  @ApiProperty({ description: 'Variété de la plante' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  variety: string;

  @ApiProperty({ description: 'Date de plantation' })
  @IsDate()
  @IsNotEmpty()
  plantDate: Date;

  @ApiProperty({ description: 'Temps de croissance en jours', required: false })
  @IsNumber()
  @IsOptional()
  growthTime?: number;

  @ApiProperty({ description: 'Profondeur de plantation en centimètres', required: false })
  @IsNumber()
  @IsOptional()
  plantingDepth?: number;

  @ApiProperty({ description: 'Espacement entre les plants en centimètres', required: false })
  @IsNumber()
  @IsOptional()
  spacing?: number;

  @ApiProperty({ description: 'Espacement entre les rangées en centimètres', required: false })
  @IsNumber()
  @IsOptional()
  rowSpacing?: number;

  @ApiProperty({ description: 'Température optimale de croissance en degrés Celsius', required: false })
  @IsNumber()
  @IsOptional()
  optimalTemperature?: number;

  @ApiProperty({ description: 'pH optimal du sol', required: false })
  @IsNumber()
  @IsOptional()
  optimalPh?: number;

  @ApiProperty({ description: 'Besoins en eau (faible, moyen, élevé)', required: false })
  @IsString()
  @IsOptional()
  waterNeeds?: string;

  @ApiProperty({ description: 'Exposition au soleil requise (ombre, mi-ombre, plein soleil)', required: false })
  @IsString()
  @IsOptional()
  sunExposure?: string;

  @ApiProperty({ 
    description: 'Identifiant du statut de la culture',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4')
  @IsNotEmpty()
  statusId: string;

  @ApiProperty({ 
    description: 'Identifiants des espaces de culture associés',
    type: [String],
    required: false
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  cultivationSpaceIds?: string[];

  @ApiProperty({ 
    description: 'Identifiants des planches de culture associées',
    type: [String],
    required: false
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  cultivationBedIds?: string[];
}
