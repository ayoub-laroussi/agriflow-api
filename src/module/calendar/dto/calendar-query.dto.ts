/**
 * DTO pour les requêtes de calendrier
 * 
 * Ce DTO définit la structure des données attendues pour les requêtes
 * de recherche dans le calendrier agricole.
 * 
 * @module CalendarQueryDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsBoolean, IsArray, Transform } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO pour les requêtes de calendrier
 */
export class CalendarQueryDto {
  @ApiProperty({
    description: 'Date de début de la période',
    example: '2024-04-01',
    required: true
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Date de fin de la période',
    example: '2024-04-30',
    required: true
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    description: 'ID de l\'espace de culture',
    required: false
  })
  @IsString()
  @IsOptional()
  cultivationSpaceId?: string;

  @ApiProperty({
    description: 'ID du terrain',
    required: false
  })
  @IsString()
  @IsOptional()
  landId?: string;

  @ApiProperty({
    description: 'ID de la culture',
    required: false
  })
  @IsString()
  @IsOptional()
  cropId?: string;

  @ApiProperty({
    description: 'Inclure les observations',
    required: false,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  includeObservations?: boolean = true;

  @ApiProperty({
    description: 'Inclure les actions agricoles',
    required: false,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  includeAgriculturalActions?: boolean = true;

  @ApiProperty({
    description: 'Types d\'actions à inclure',
    required: false,
    isArray: true,
    example: ['plantation', 'arrosage']
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.split(',') : value)
  actionTypes?: string[];
} 