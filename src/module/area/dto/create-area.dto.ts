/**
 * DTO pour la création d'une zone
 * 
 * Ce DTO définit la structure des données attendues lors de la création d'une zone.
 * Il inclut les validations nécessaires pour assurer l'intégrité des données.
 * 
 * @module CreateAreaDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, MaxLength, MinLength } from 'class-validator';

/**
 * DTO pour la création d'une zone
 */
export class CreateAreaDto {
  @ApiProperty({
    description: 'Nom de la zone',
    example: 'Zone Nord',
    maxLength: 50,
  })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @MaxLength(50, { message: 'Le nom ne peut pas dépasser 50 caractères' })
  area_name: string;

  @ApiProperty({
    description: 'Description de la zone',
    example: 'Zone de culture principale située au nord du terrain',
    required: false,
  })
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  @IsOptional()
  area_description?: string;

  @ApiProperty({
    description: 'Latitude de la zone',
    example: 48.8566,
    required: false,
  })
  @IsNumber({}, { message: 'La latitude doit être un nombre' })
  @IsOptional()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude de la zone',
    example: 2.3522,
    required: false,
  })
  @IsNumber({}, { message: 'La longitude doit être un nombre' })
  @IsOptional()
  longitude?: number;
}
