/**
 * DTO pour la création d'un statut de culture
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsHexColor, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class CreateCropStatusDto {
  @ApiProperty({
    description: 'Nom du statut',
    example: 'En cours',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Description du statut',
    example: 'Culture en cours de développement',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Couleur du statut au format hexadécimal',
    example: '#4CAF50',
    maxLength: 7,
  })
  @IsString()
  @IsHexColor()
  @MaxLength(7)
  color: string;

  @ApiProperty({
    description: 'Ordre d\'affichage du statut',
    example: 1,
    minimum: 0,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({
    description: 'Indique si le statut est prédéfini',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPredefined?: boolean;
} 