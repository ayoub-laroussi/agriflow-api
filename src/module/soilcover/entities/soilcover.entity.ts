/**
 * Entité représentant une couverture de sol dans le système
 * 
 * Cette entité définit la structure de données d'une couverture de sol dans l'application,
 * incluant son type, sa date de mise en place, et des commentaires associés.
 * Elle est mappée à la table 'soil_cover' dans la base de données.
 * 
 * @module SoilCover
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entité Couverture de Sol
 * 
 * Représente une couverture de sol avec ses propriétés et métadonnées.
 * Utilisée pour suivre les différentes couvertures de sol appliquées dans les espaces de culture.
 */
@Entity('soil_cover')
export class SoilCover {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de la couverture du sol' })
  id_soil_cover: string;

  @Column({ length: 50, type: 'varchar' })
  @ApiProperty({ description: 'Type de couverture du sol' })
  type_soil_cover: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date de mise en place de la couverture' })
  soilCoverDate: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Commentaire sur la couverture du sol', required: false })
  soilCoverCommentary?: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date de création de la couverture du sol' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date de modification de la couverture du sol' })
  updated_at: Date;
}
