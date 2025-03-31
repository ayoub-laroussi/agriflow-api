import { ApiProperty } from '@nestjs/swagger';

export class EspaceCulture {
  @ApiProperty({ description: 'Identifiant unique de l\'espace de culture' })
  id: number;

  @ApiProperty({ description: 'Nom de l\'espace de culture' })
  nom: string;

  @ApiProperty({ description: 'Type d\'espace de culture' })
  type: string;
}
