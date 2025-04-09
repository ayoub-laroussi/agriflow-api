/**
 * Entité représentant une zone dans le système
 * 
 * Cette entité définit la structure de données d'une zone dans l'application,
 * incluant son nom, sa description et ses coordonnées géographiques.
 * Elle est mappée à la table 'areas' dans la base de données.
 * 
 * @module Area
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entité Zone
 * 
 * Représente une zone géographique dans le système avec ses propriétés.
 */
@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de la zone' })
  id_area: string;

  @Column({ length: 50, type: 'varchar' })
  @ApiProperty({ description: 'Nom de la zone' })
  area_name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Description de la zone', required: false })
  area_description?: string;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ description: 'Latitude de la zone', required: false })
  latitude?: number;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ description: 'Longitude de la zone', required: false })
  longitude?: number;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de création de la zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de dernière mise à jour de la zone' })
  updated_at: Date;
} 