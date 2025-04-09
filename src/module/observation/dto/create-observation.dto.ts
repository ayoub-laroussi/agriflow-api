/**
 * DTO pour la création d'une observation
 */
import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDateString, 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsUUID, 
  Min, 
  Max, 
  MaxLength, 
  IsBoolean,
  ValidateIf
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateObservationDto {
  @ApiProperty({
    description: 'Date de l\'observation',
    example: '2024-04-08T10:00:00Z'
  })
  @IsDateString()
  observationDate: string;

  @ApiProperty({
    description: 'Description ou remarques générales',
    example: 'Plusieurs insectes pollinisateurs observés sur les plants de tomates',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  // Données météorologiques
  @ApiProperty({
    description: 'Température en degrés Celsius',
    example: 22.5,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  temperature?: number;

  @ApiProperty({
    description: 'Humidité de l\'air en pourcentage',
    example: 65,
    minimum: 0,
    maximum: 100,
    required: false
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  humidity?: number;

  @ApiProperty({
    description: 'Précipitations en millimètres',
    example: 2.5,
    minimum: 0,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  precipitation?: number;

  @ApiProperty({
    description: 'Vitesse du vent en km/h',
    example: 10.2,
    minimum: 0,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  windSpeed?: number;

  @ApiProperty({
    description: 'Direction du vent (N, NE, E, SE, S, SO, O, NO)',
    example: 'NO',
    required: false
  })
  @IsString()
  @MaxLength(2)
  @IsOptional()
  windDirection?: string;

  @ApiProperty({
    description: 'Pression atmosphérique en hPa',
    example: 1013.25,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  pressure?: number;

  @ApiProperty({
    description: 'Conditions météo générales',
    example: 'Ensoleillé',
    required: false
  })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  weatherCondition?: string;

  // Relations
  @ApiProperty({
    description: 'ID de l\'espace de culture concerné (requis si isLandObservation=false)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  @ValidateIf(o => o.isLandObservation === false && !o.landId)
  cultivationSpaceId?: string;

  @ApiProperty({
    description: 'ID du terrain concerné (requis si isLandObservation=true)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  @ValidateIf(o => o.isLandObservation === true && !o.cultivationSpaceId)
  landId?: string;

  @ApiProperty({
    description: 'Indique si l\'observation concerne un terrain plutôt qu\'un espace de culture',
    example: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isLandObservation?: boolean;
}
