import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, MaxLength, Min, Max, IsUUID } from 'class-validator';

export class CreateCultivationBedDto {
  @ApiProperty({ 
    description: 'Nom de la planche de culture', 
    example: 'Planche de tomates',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ 
    description: 'Description détaillée de la planche de culture', 
    required: false,
    example: 'Planche de culture destinée aux tomates, située à l\'est du potager'
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'Longueur de la planche de culture en mètres', 
    required: false,
    example: 5.5,
    minimum: 0
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  length?: number;

  @ApiProperty({ 
    description: 'Largeur de la planche de culture en mètres', 
    required: false,
    example: 1.2,
    minimum: 0
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  width?: number;

  @ApiProperty({ 
    description: 'Surface de la planche de culture en mètres carrés (calculée automatiquement si longueur et largeur sont fournies)', 
    required: false,
    example: 6.6,
    minimum: 0
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  area?: number;

  @ApiProperty({ 
    description: 'Type de sol de la planche de culture', 
    required: false,
    example: 'Argileux',
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  soil_type?: string;

  @ApiProperty({ 
    description: 'Niveau de pH du sol (échelle de 0 à 14)', 
    required: false,
    example: 6.5,
    minimum: 0,
    maximum: 14
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(14)
  ph_level?: number;

  @ApiProperty({ 
    description: 'Niveau de fertilité du sol (faible, moyen, élevé, etc.)', 
    required: false,
    example: 'Moyen',
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  fertility_level?: string;

  @ApiProperty({ 
    description: 'Niveau de drainage du sol (faible, moyen, bon, etc.)', 
    required: false,
    example: 'Bon',
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  drainage_level?: string;

  @ApiProperty({ 
    description: 'Orientation de la planche de culture (nord-sud, est-ouest, etc.)', 
    required: false,
    example: 'Nord-Sud',
    maxLength: 50
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  orientation?: string;

  @ApiProperty({ 
    description: 'Commentaire ou notes additionnelles sur la planche de culture', 
    required: false,
    example: 'Planche surélevée de 30cm, bordée de pierres'
  })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({ 
    description: 'Identifiant UUID de l\'espace de culture parent auquel appartient cette planche', 
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  cultivation_space_id: string;
}
