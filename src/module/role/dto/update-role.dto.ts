/**
 * DTO de mise à jour de rôle
 * 
 * Ce DTO définit la structure des données attendues lors de la mise à jour d'un rôle.
 * Il étend le DTO de création en rendant tous les champs optionnels.
 * 
 * @module UpdateRoleDto
 */
import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

/**
 * DTO de mise à jour de rôle
 * 
 * Étend le DTO de création en rendant tous les champs optionnels,
 * permettant ainsi des mises à jour partielles des données du rôle.
 */
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
