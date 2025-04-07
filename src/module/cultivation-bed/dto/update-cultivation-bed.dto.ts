/**
 * DTO pour la mise à jour d'une planche de culture
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la mise à jour d'une planche de culture existante via l'API.
 * Il hérite de CreateCultivationBedDto en rendant tous les champs optionnels.
 * 
 * @module UpdateCultivationBedDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateCultivationBedDto } from './create-cultivation-bed.dto';

/**
 * Données de mise à jour d'une planche de culture
 * 
 * Étend CreateCultivationBedDto en rendant tous les champs optionnels,
 * permettant ainsi de mettre à jour seulement les propriétés spécifiées.
 */
export class UpdateCultivationBedDto extends PartialType(CreateCultivationBedDto) {}
