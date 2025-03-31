import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLandDto {
  @ApiProperty({ description: 'Nom du terrain' })
  @IsString()
  @IsNotEmpty()
  landName: string;

  @ApiProperty({ description: 'Surface du terrain' })
  @IsNumber()
  @IsNotEmpty()
  landArea: number;

  @ApiProperty({ description: 'Coordonnées du terrain', required: false })
  @IsString()
  @IsOptional()
  landCoordinate?: string;
}
