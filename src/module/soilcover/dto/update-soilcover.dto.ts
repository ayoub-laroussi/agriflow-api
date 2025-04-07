/**
 * DTO pour la mise à jour d'une couverture de sol
 * 
 * Ce DTO (Data Transfer Object) définit la structure des données attendues
 * lors de la mise à jour d'une couverture de sol existante via l'API.
 * Il hérite de CreateSoilCoverDto en rendant tous les champs optionnels.
 * 
 * @module UpdateSoilCoverDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateSoilCoverDto } from './create-soilcover.dto';

/**
 * Données de mise à jour d'une couverture de sol
 * 
 * Étend CreateSoilCoverDto en rendant tous les champs optionnels,
 * permettant ainsi de mettre à jour seulement les propriétés spécifiées.
 */
export class UpdateSoilCoverDto extends PartialType(CreateSoilCoverDto) {}
