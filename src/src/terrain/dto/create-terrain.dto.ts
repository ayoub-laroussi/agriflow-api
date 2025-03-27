import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTerrainDto {
  @ApiProperty({ description: 'Nom du terrain' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Surface du terrain' })
  @IsNumber()
  @IsNotEmpty()
  surface: number;

  @ApiProperty({ description: 'Unité de mesure de la surface (m², ha, etc.)' })
  @IsString()
  @IsNotEmpty()
  uniteSurface: string;
}
