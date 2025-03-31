import { ApiProperty } from '@nestjs/swagger';

export class Role {
  @ApiProperty({ description: 'Identifiant unique du rôle' })
  id: number;

  @ApiProperty({ description: 'Nom du rôle' })
  role: string;
}
