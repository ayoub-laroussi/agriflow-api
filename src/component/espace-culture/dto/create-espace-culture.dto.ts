import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEspaceCultureDto {
  @ApiProperty({ description: 'Nom de l\'espace de culture' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'Type d\'espace de culture' })
  @IsString()
  type: string;
}
