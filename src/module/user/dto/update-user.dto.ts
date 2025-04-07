/**
 * DTO pour la mise à jour d'un utilisateur
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la mise à jour d'un utilisateur existant via l'API.
 * Il hérite de CreateUserDto en rendant tous les champs optionnels.
 * 
 * @module UpdateUserDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * Données de mise à jour d'un utilisateur
 * 
 * Étend CreateUserDto en rendant tous les champs optionnels,
 * permettant ainsi de mettre à jour seulement les propriétés spécifiées.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
