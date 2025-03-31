import { ApiProperty } from '@nestjs/swagger';

export class Culture {
  @ApiProperty({ description: 'Identifiant unique de la culture' })
  id: number;

  @ApiProperty({ description: 'Nom de la culture' })
  nom: string;

  @ApiProperty({ description: 'Variété de la culture' })
  variete: string;

  @ApiProperty({ description: 'Date de plantation de la culture' })
  datePlantation: Date;

  @ApiProperty({ description: 'Statut de la culture' })
  statut: string;
}
