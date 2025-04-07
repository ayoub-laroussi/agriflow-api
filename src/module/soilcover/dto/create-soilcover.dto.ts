/**
 * DTO pour la création d'une couverture de sol
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la création d'une nouvelle couverture de sol via l'API.
 * Il inclut les validations nécessaires pour garantir l'intégrité des données.
 * 
 * @module CreateSoilCoverDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

/**
 * Données de création d'une couverture de sol
 * 
 * Définit les champs requis et optionnels avec leurs règles de validation
 * pour la création d'une nouvelle couverture de sol.
 */
export class CreateSoilCoverDto {
  @ApiProperty({ description: 'Type de couverture du sol' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  type_soil_cover: string;

  @ApiProperty({ description: 'Date de mise en place de la couverture' })
  @IsDate()
  @IsNotEmpty()
  soilCoverDate: Date;

  @ApiProperty({ description: 'Commentaire sur la couverture du sol', required: false })
  @IsString()
  @IsOptional()
  soilCoverCommentary?: string;
}
