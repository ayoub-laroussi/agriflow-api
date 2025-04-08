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
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CropStatus } from '../../crop-status/entities/crop-status.entity';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../../cultivation-bed/entities/cultivation-bed.entity';

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

  @ApiProperty({ description: 'Statut de la culture' })
  @ManyToOne(() => CropStatus, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: CropStatus;

  @Column({ name: 'status_id', type: 'uuid' })
  statusId: string;

  @ApiProperty({ description: 'Espaces de culture associés' })
  @ManyToMany(() => CultivationSpace, (cultivationSpace) => cultivationSpace.crops, {
    onDelete: 'CASCADE',
    cascade: true,
    lazy: true
  })
  @JoinTable({
    name: 'is_cultivated',
    joinColumn: {
      name: 'crop_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cultivation_space_id',
      referencedColumnName: 'id',
    },
  })
  cultivationSpaces: Promise<CultivationSpace[]>;

  @ApiProperty({ description: 'Planches de culture associées' })
  @ManyToMany(() => CultivationBed, (cultivationBed) => cultivationBed.crops, {
    onDelete: 'CASCADE',
    cascade: true,
    lazy: true
  })
  @JoinTable({
    name: 'cultivation_bed_crops',
    joinColumn: {
      name: 'crop_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cultivation_bed_id',
      referencedColumnName: 'id',
    },
  })
  cultivationBeds: Promise<CultivationBed[]>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
