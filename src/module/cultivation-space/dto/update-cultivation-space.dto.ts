/**
 * DTO pour la mise à jour d'un espace de culture
 * 
 * Ce DTO définit la structure des données attendues lors de la mise à jour
 * d'un espace de culture existant via l'API. Il étend le DTO de création
 * en rendant tous les champs optionnels, permettant ainsi des mises à jour
 * partielles.
 * 
 * @module UpdateCultivationSpaceDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateCultivationSpaceDto } from './create-cultivation-space.dto';

/**
 * Classe définissant les données pour la mise à jour d'un espace de culture
 * 
 * Étend le DTO de création en rendant tous les champs optionnels,
 * permettant ainsi de mettre à jour uniquement les propriétés spécifiées.
 */
export class UpdateCultivationSpaceDto extends PartialType(CreateCultivationSpaceDto) {}
