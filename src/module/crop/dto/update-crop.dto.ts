/**
 * DTO pour la mise à jour d'une culture
 * 
 * Ce DTO définit la structure des données attendues lors de la mise à jour
 * d'une culture existante via l'API. Il étend le DTO de création en rendant
 * tous les champs optionnels, permettant ainsi des mises à jour partielles.
 * 
 * @module UpdateCropDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateCropDto } from './create-crop.dto';

/**
 * Classe définissant les données pour la mise à jour d'une culture
 * 
 * Étend le DTO de création en rendant tous les champs optionnels,
 * permettant ainsi de mettre à jour uniquement les propriétés spécifiées.
 */
export class UpdateCropDto extends PartialType(CreateCropDto) {}
