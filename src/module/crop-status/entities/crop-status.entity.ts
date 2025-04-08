/**
 * Entité représentant un statut de culture dans le système
 * 
 * Cette entité définit la structure de données d'un statut de culture dans l'application,
 * incluant ses propriétés (nom, description, couleur, etc.) et sa relation avec les cultures.
 * Elle est mappée à la table 'crop_statuses' dans la base de données.
 * 
 * @module CropStatus
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Crop } from '../../crop/entities/crop.entity';

/**
 * Entité Statut de Culture
 * 
 * Représente un statut de culture avec ses propriétés et relations.
 * Un statut peut être associé à plusieurs cultures.
 */
@Entity('crop_statuses')
export class CropStatus {
  @ApiProperty({ description: 'Identifiant unique du statut' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nom du statut' })
  @Column({ name: 'name', length: 50, type: 'varchar', unique: true })
  name: string;

  @ApiProperty({ description: 'Description du statut' })
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Couleur associée au statut (format hexadécimal)' })
  @Column({ name: 'color', length: 7, type: 'varchar', nullable: true })
  color: string;

  @ApiProperty({ description: 'Ordre d\'affichage du statut' })
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @ApiProperty({ description: 'Indique si le statut est prédéfini' })
  @Column({ name: 'is_predefined', type: 'boolean', default: false })
  isPredefined: boolean;

  @ApiProperty({ description: 'Cultures associées à ce statut' })
  @OneToMany(() => Crop, crop => crop.status)
  crops: Crop[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
} 