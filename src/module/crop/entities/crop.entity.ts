/**
 * Entité représentant une culture dans le système
 * 
 * Cette entité définit la structure de données d'une culture dans l'application,
 * incluant ses propriétés (nom, famille, variété, etc.) et ses relations avec
 * les espaces de culture et les planches de culture.
 * Elle est mappée à la table 'crops' dans la base de données.
 * 
 * @module Crop
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../../cultivation-bed/entities/cultivation-bed.entity';

/**
 * Énumération des statuts possibles pour une culture
 */
export enum CropStatus {
  INUTILISABLE = 'inutilisable',
  EN_JACHERE = 'en jachère',
  EN_PREPARATION = 'en préparation',
  EN_CULTURE = 'en culture',
  RECOLTE = 'récolte',
  ABANDONNE = 'abandonné',
  DETRUIT = 'détruit'
}

/**
 * Entité Culture
 * 
 * Représente une culture avec ses propriétés et relations.
 * Une culture peut être associée à plusieurs espaces de culture et planches de culture.
 */
@Entity('crops')
export class Crop {
  @ApiProperty({ description: 'Identifiant unique de la culture' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nom de la culture' })
  @Column({ name: 'name', length: 100, type: 'varchar' })
  name: string;

  @ApiProperty({ description: 'Commentaire sur la culture' })
  @Column({ name: 'commentary', type: 'text', nullable: true })
  commentary: string;

  @ApiProperty({ description: 'Famille de la plante' })
  @Column({ name: 'plant_family', length: 100, type: 'varchar' })
  plantFamily: string;

  @ApiProperty({ description: 'Variété de la plante' })
  @Column({ name: 'variety', length: 100, type: 'varchar' })
  variety: string;

  @ApiProperty({ description: 'Date de plantation' })
  @Column({ name: 'plant_date', type: 'date' })
  plantDate: Date;

  @ApiProperty({ 
    description: 'Statut de la culture',
    enum: CropStatus,
    example: CropStatus.EN_CULTURE
  })
  @Column({ 
    name: 'status', 
    length: 20, 
    type: 'varchar',
    enum: CropStatus,
    default: CropStatus.EN_PREPARATION
  })
  status: CropStatus;

  @ApiProperty({ description: 'Espaces de culture associés' })
  @ManyToMany(() => CultivationSpace, cultivationSpace => cultivationSpace.crops)
  cultivationSpaces: CultivationSpace[];

  @ApiProperty({ description: 'Planches de culture associées' })
  @ManyToMany(() => CultivationBed, cultivationBed => cultivationBed.crops)
  cultivationBeds: CultivationBed[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
