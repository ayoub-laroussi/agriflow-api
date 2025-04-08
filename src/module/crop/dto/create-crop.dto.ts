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
import { IsString, IsDate, IsNotEmpty, IsOptional, MaxLength, IsUUID, IsArray } from 'class-validator';

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
