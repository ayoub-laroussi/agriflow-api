import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'Identifiant unique de l\'utilisateur' })
  id: number;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  email: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  name: string;

  @ApiProperty({ description: 'Nom d\'utilisateur' })
  username: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur' })
  password: string;

  @ApiProperty({ description: 'Date de création de l\'utilisateur' })
  userCreationDate: Date;
}
