import { ApiProperty } from '@nestjs/swagger';

export class Land {
  @ApiProperty({ description: 'Identifiant unique du terrain' })
  id: number;

  @ApiProperty({ description: 'Nom du terrain' })
  landName: string;

  @ApiProperty({ description: 'Surface du terrain' })
  landArea: number;

  @ApiProperty({ description: 'Date de création du terrain' })
  landCreationDate: Date;

  @ApiProperty({ description: 'Date de modification du terrain' })
  landModificationDate: Date;

  @ApiProperty({ description: 'Coordonnées du terrain' })
  landCoordinate: string;
}
