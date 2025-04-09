/**
 * Entité représentant une action agricole dans le système
 * 
 * Cette entité définit la structure de données d'une action agricole dans l'application,
 * incluant son type, sa date, son commentaire et ses relations avec les espaces de culture,
 * les planches de culture et les cultures.
 * Elle est mappée à la table 'agricultural_actions' dans la base de données.
 * 
 * @module AgriculturalAction
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../module/cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../../module/cultivation-bed/entities/cultivation-bed.entity';
import { Crop } from '../../module/crop/entities/crop.entity';

/**
 * Énumération des types d'actions agricoles possibles
 */
export enum AgriculturalActionType {
  PREPARATION_SOL = 'préparation du sol',
  PLANTATION = 'plantation',
  SEMIS = 'semis',
  ARROSAGE = 'arrosage',
  FERTILISATION = 'fertilisation',
  TRAITEMENT = 'traitement',
  RECOLTE = 'récolte',
  TAILLE = 'taille',
  AUTRE = 'autre'
}

/**
 * Entité Action Agricole
 * 
 * Représente une action agricole avec ses propriétés et relations.
 * Une action peut être associée à un espace de culture, une planche de culture et/ou une culture.
 */
@Entity('agricultural_actions')
export class AgriculturalAction {
  @ApiProperty({ description: 'Identifiant unique de l\'action agricole' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ 
    description: 'Type d\'action agricole',
    enum: AgriculturalActionType,
    example: AgriculturalActionType.PLANTATION
  })
  @Column({ 
    name: 'type', 
    length: 50, 
    type: 'varchar',
    enum: AgriculturalActionType
  })
  type: AgriculturalActionType;

  @ApiProperty({ description: 'Date de l\'action' })
  @Column({ name: 'action_date', type: 'timestamp' })
  actionDate: Date;

  @ApiProperty({ description: 'Commentaire sur l\'action' })
  @Column({ name: 'commentary', type: 'text', nullable: true })
  commentary: string;

  @ApiProperty({ description: 'Espace de culture concerné' })
  @ManyToOne(() => CultivationSpace, { nullable: true })
  @JoinColumn({ name: 'cultivation_space_id' })
  cultivationSpace: CultivationSpace;

  @ApiProperty({ description: 'Planche de culture concernée' })
  @ManyToOne(() => CultivationBed, { nullable: true })
  @JoinColumn({ name: 'cultivation_bed_id' })
  cultivationBed: CultivationBed;

  @ApiProperty({ description: 'Culture concernée' })
  @ManyToOne(() => Crop, { nullable: true })
  @JoinColumn({ name: 'crop_id' })
  crop: Crop;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
} 