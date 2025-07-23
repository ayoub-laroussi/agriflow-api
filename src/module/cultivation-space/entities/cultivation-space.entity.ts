/**
 * Entité représentant un espace de culture
 * 
 * Cette entité définit la structure de données pour les espaces de culture,
 * qui sont des zones dédiées à la culture sur un terrain. Un espace de culture
 * peut contenir plusieurs planches de culture et être associé à différentes cultures.
 * 
 * @module CultivationSpace
 */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Land } from '../../land/entities/land.entity';
import { Crop } from '../../crop/entities/crop.entity';
import { CultivationBed } from '../../cultivation-bed/entities/cultivation-bed.entity';

/**
 * Classe représentant un espace de culture dans le système
 * 
 * Un espace de culture est une zone dédiée à la culture sur un terrain.
 * Il peut être de différents types (rizière, champ, verger, potager) et
 * peut contenir plusieurs planches de culture. Il est toujours associé
 * à un terrain et peut être directement lié à des cultures.
 */
@Entity('cultivation_spaces')
export class CultivationSpace {
  @PrimaryColumn('uuid')
  @ApiProperty({ 
    description: 'Identifiant unique de l\'espace de culture',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid'
  })
  id: string;

  @Column({ name: 'name', length: 100, type: 'varchar' })
  @ApiProperty({ 
    description: 'Nom de l\'espace de culture',
    example: 'Potager principal',
    maxLength: 50
  })
  cultivation_space_name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  @ApiProperty({ 
    description: 'Commentaires sur l\'espace de culture',
    example: 'Espace dédié aux cultures maraîchères situé au sud de la propriété',
    required: false
  })
  cultivation_spaces_commentary: string;

  @Column({ name: 'area', type: 'numeric', precision: 10, scale: 2 })
  @ApiProperty({ 
    description: 'Surface de l\'espace de culture en mètres carrés',
    example: 120,
    minimum: 0
  })
  cultivation_spaces_area: number;

  @Column({ name: 'type', type: 'varchar', length: 50, nullable: true })
  @ApiProperty({ 
    description: 'Type d\'espace de culture (rizière, champ, verger, potager)',
    example: 'potager',
    enum: ['rizière', 'champ', 'verger', 'potager'],
    required: false
  })
  cultivation_space_type: string;

  @Column({ name: 'cultivation_spaces_length', type: 'integer', nullable: true })
  @ApiProperty({ 
    description: 'Longueur de l\'espace de culture en mètres',
    example: 20,
    minimum: 0
  })
  cultivation_spaces_length: number;

  @Column({ name: 'cultivation_spaces_width', type: 'integer', nullable: true })
  @ApiProperty({ 
    description: 'Largeur de l\'espace de culture en mètres',
    example: 6,
    minimum: 0
  })
  cultivation_spaces_width: number;

  @Column({ name: 'cultivation_spaces_soil_type', length: 50, type: 'varchar', nullable: true })
  @ApiProperty({ 
    description: 'Type de sol de l\'espace de culture',
    example: 'argileux',
    required: false
  })
  cultivation_spaces_soil_type: string;

  @Column({ name: 'cultivation_spaces_ph', type: 'integer', nullable: true })
  @ApiProperty({ 
    description: 'pH du sol',
    example: 7,
    minimum: 0,
    maximum: 14
  })
  cultivation_spaces_ph: number;

  @Column({ name: 'cultivation_spaces_soil_fertility', length: 50, type: 'varchar', nullable: true })
  @ApiProperty({ 
    description: 'Fertilité du sol',
    example: 'bonne',
    required: false
  })
  cultivation_spaces_soil_fertility: string;

  @Column({ name: 'cultivation_spaces_soil_drainage', length: 50, type: 'varchar', nullable: true })
  @ApiProperty({ 
    description: 'Drainage du sol',
    example: 'bon',
    required: false
  })
  cultivation_spaces_soil_drainage: string;

  @Column({ name: 'cultivation_spaces_status', type: 'text', nullable: true })
  @ApiProperty({ 
    description: 'Statut de l\'espace de culture',
    example: 'actif',
    required: false
  })
  cultivation_spaces_status: string;

  @ManyToOne(() => Land)
  @JoinColumn({ name: 'land_id' })
  @ApiProperty({ 
    description: 'Terrain associé à cet espace de culture',
    type: () => Land
  })
  land: Land;

  @Column({ name: 'land_id', type: 'uuid' })
  @ApiProperty({ 
    description: 'Identifiant UUID du terrain associé',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid'
  })
  id_land: string;

  @OneToMany(() => CultivationBed, cultivationBed => cultivationBed.cultivationSpace, { lazy: true })
  @ApiProperty({ 
    description: 'Planches de culture associées à cet espace',
    type: () => [CultivationBed],
    isArray: true
  })
  cultivationBeds: Promise<CultivationBed[]>;

  @ManyToMany(() => Crop, crop => crop.cultivationSpaces, { lazy: true })
  @JoinTable({
    name: 'is_cultivated',
    joinColumn: {
      name: 'cultivation_space_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_crop',
      referencedColumnName: 'id_crop',
    },
  })
  @ApiProperty({ 
    description: 'Cultures associées directement à cet espace',
    type: () => [Crop],
    isArray: true
  })
  crops: Promise<Crop[]>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @ApiProperty({ 
    description: 'Date de création de l\'espace de culture',
    example: '2023-04-01T10:00:00Z',
    format: 'date-time'
  })
  cultivation_space_creation_date: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @ApiProperty({ 
    description: 'Date de dernière modification de l\'espace de culture',
    example: '2023-04-01T15:30:00Z',
    format: 'date-time'
  })
  cultivation_space_modification_date: Date;
}
