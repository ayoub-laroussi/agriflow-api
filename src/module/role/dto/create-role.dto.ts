/**
 * DTO de création de rôle
 * 
 * Ce DTO définit la structure des données attendues lors de la création d'un rôle.
 * Il inclut la validation des champs requis pour la création d'un rôle.
 * 
 * @module CreateRoleDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

/**
 * DTO de création de rôle
 * 
 * Définit la structure des données nécessaires pour créer un nouveau rôle.
 * Le nom du rôle est obligatoire et doit être une chaîne de caractères non vide.
 */
export class CreateRoleDto {
  @ApiProperty({ description: 'ID du rôle', required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ description: 'Nom du rôle' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
