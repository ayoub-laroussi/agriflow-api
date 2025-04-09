/**
 * DTO pour la connexion d'un utilisateur
 * 
 * Ce DTO définit la structure des données attendues lors de la connexion d'un utilisateur.
 * Il inclut les validations nécessaires pour assurer l'intégrité des données.
 * 
 * @module LoginDto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO de connexion
 * 
 * Contient les champs nécessaires pour la connexion d'un utilisateur (email et mot de passe)
 * avec leurs validations associées.
 */
export class LoginDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'utilisateur@exemple.com',
  })
  @IsNotEmpty({ message: 'L\'email ne peut pas être vide' })
  @IsEmail({}, { message: 'Format d\'email invalide' })
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'motDePasse123',
  })
  @IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;
} 