import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, MaxLength, Min, Max, IsUUID } from 'class-validator';

export class CreateCultivationBedDto {
  @ApiProperty({ description: 'Nom de la planche de culture' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Description de la planche de culture', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Longueur de la planche de culture en mètres', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  length?: number;

  @ApiProperty({ description: 'Largeur de la planche de culture en mètres', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  width?: number;

  @ApiProperty({ description: 'Surface de la planche de culture en mètres carrés', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  area?: number;

  @ApiProperty({ description: 'Type de sol de la planche de culture', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  soil_type?: string;

  @ApiProperty({ description: 'Niveau de pH du sol', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(14)
  ph_level?: number;

  @ApiProperty({ description: 'Niveau de fertilité du sol', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  fertility_level?: string;

  @ApiProperty({ description: 'Niveau de drainage du sol', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  drainage_level?: string;

  @ApiProperty({ description: 'Orientation de la planche de culture', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  orientation?: string;

  @ApiProperty({ description: 'Commentaire sur la planche de culture', required: false })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({ description: 'ID de l\'espace de culture parent' })
  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  cultivation_space_id: string;
}
