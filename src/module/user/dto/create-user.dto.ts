/**
 * DTO pour la création d'un utilisateur
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la création d'un nouvel utilisateur via l'API.
 * Il inclut les validations nécessaires pour garantir l'intégrité des données.
 * 
 * @module CreateUserDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

/**
 * Données de création d'un utilisateur
 * 
 * Définit les champs requis et les règles de validation
 * pour la création d'un nouvel utilisateur.
 */
export class CreateUserDto {
  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @ApiProperty({ description: 'Nom d\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Nom du rôle' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
