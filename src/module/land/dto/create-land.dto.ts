import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator';

export class CreateLandDto {
  @ApiProperty({ description: 'Nom du terrain' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  land_name: string;

  @ApiProperty({ description: 'Surface du terrain en mètres carrés' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  land_area: number;

  @ApiProperty({ description: 'Coordonnées du terrain', required: false })
  @IsNumber()
  @IsOptional()
  land_coordinate?: number;

  @ApiProperty({ description: 'ID de l\'utilisateur propriétaire' })
  @IsString()
  @IsNotEmpty()
  id_user: string;
}
