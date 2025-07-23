/**
 * Entité représentant une couverture de sol dans le système
 * 
 * Cette entité définit la structure de données d'une couverture de sol dans l'application,
 * incluant son type et ses relations avec les espaces de culture.
 * Elle est mappée à la table 'soil_cover' dans la base de données.
 * 
 * @module SoilCover
 */
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entité Couverture de Sol
 * 
 * Représente une couverture de sol avec ses propriétés.
 * Utilisée pour suivre les différentes couvertures de sol appliquées dans les espaces de culture.
 */
@Entity('soil_cover')
export class SoilCover {
  @PrimaryColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de la couverture du sol' })
  id_soil_cover: string;

  @Column({ length: 50, type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Type de couverture du sol' })
  type_soil_cover: string;
}
