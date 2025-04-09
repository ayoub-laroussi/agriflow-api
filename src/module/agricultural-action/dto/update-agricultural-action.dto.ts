/**
 * DTO pour la mise à jour d'une action agricole
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la mise à jour d'une action agricole existante via l'API.
 * Il hérite de CreateAgriculturalActionDto en rendant tous les champs optionnels.
 * 
 * @module UpdateAgriculturalActionDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateAgriculturalActionDto } from './create-agricultural-action.dto';

/**
 * Données de mise à jour d'une action agricole
 * 
 * Étend CreateAgriculturalActionDto en rendant tous les champs optionnels,
 * permettant ainsi de mettre à jour seulement les propriétés spécifiées.
 */
export class UpdateAgriculturalActionDto extends PartialType(CreateAgriculturalActionDto) {} 