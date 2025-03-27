import { ApiProperty } from '@nestjs/swagger';

export class Terrain {
  @ApiProperty({ description: 'Identifiant unique du terrain' })
  id: number;

  @ApiProperty({ description: 'Nom du terrain' })
  nom: string;

  @ApiProperty({ description: 'Surface du terrain' })
  surface: number;

  @ApiProperty({ description: 'Unité de mesure de la surface' })
  uniteSurface: string;
}
