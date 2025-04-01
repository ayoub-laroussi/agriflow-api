import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

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
