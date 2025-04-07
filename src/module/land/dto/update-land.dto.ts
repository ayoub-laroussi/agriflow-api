/**
 * DTO pour la mise à jour d'un terrain
 * 
 * Ce DTO définit la structure des données attendues lors de la mise à jour
 * d'un terrain existant via l'API. Il étend le DTO de création en rendant
 * tous les champs optionnels, permettant ainsi des mises à jour partielles.
 * 
 * @module UpdateLandDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateLandDto } from './create-land.dto';

/**
 * Classe définissant les données pour la mise à jour d'un terrain
 * 
 * Étend le DTO de création en rendant tous les champs optionnels,
 * permettant ainsi de mettre à jour uniquement les propriétés spécifiées.
 */
export class UpdateLandDto extends PartialType(CreateLandDto) {}
