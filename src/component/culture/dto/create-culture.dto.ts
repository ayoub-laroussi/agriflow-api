import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateCultureDto {
  @ApiProperty({ description: 'Nom de la culture' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'Variété de la culture' })
  @IsString()
  variete: string;

  @ApiProperty({ description: 'Date de plantation de la culture' })
  @IsDate()
  datePlantation: Date;

  @ApiProperty({ description: 'Statut de la culture', required: false })
  @IsString()
  @IsOptional()
  statut?: string;
}
