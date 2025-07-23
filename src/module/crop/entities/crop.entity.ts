/**
 * Entité représentant une culture
 * 
 * Cette entité définit la structure de données pour les cultures,
 * qui sont les plantes cultivées dans les espaces de culture.
 * 
 * @module Crop
 */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';

/**
 * Classe représentant une culture dans le système
 * 
 * Une culture est une plante cultivée dans un ou plusieurs espaces de culture.
 * Elle possède des caractéristiques comme le nom, la variété, le temps de croissance, etc.
 */
@Entity('crops')
export class Crop {
  @PrimaryColumn('uuid')
  @ApiProperty({ 
    description: 'Identifiant unique de la culture',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid'
  })
  id_crop: string;

  @Column({ name: 'name', length: 100, type: 'varchar' })
  @ApiProperty({ 
    description: 'Nom de la culture',
    example: 'Tomate',
    maxLength: 100
  })
  crop_name: string;

  @Column({ name: 'variety', length: 100, type: 'varchar', nullable: true })
  @ApiProperty({ 
    description: 'Variété de la culture',
    example: 'Roma',
    maxLength: 100,
    required: false
  })
  crop_variety: string;

  @Column({ name: 'family', length: 100, type: 'varchar', nullable: true })
  @ApiProperty({ 
    description: 'Famille botanique de la culture',
    example: 'Solanacées',
    maxLength: 100,
    required: false
  })
  crop_family: string;

  @Column({ name: 'growth_time', type: 'int', nullable: true })
  @ApiProperty({ 
    description: 'Temps de croissance en jours',
    example: 90,
    required: false
  })
  crop_growth_time: number;

  @Column({ name: 'planting_depth', type: 'float', nullable: true })
  @ApiProperty({ 
    description: 'Profondeur de plantation en centimètres',
    example: 2.5,
    required: false
  })
  crop_planting_depth: number;

  @Column({ name: 'spacing', type: 'float', nullable: true })
  @ApiProperty({ 
    description: 'Espacement entre les plants en centimètres',
    example: 40,
    required: false
  })
  crop_spacing: number;

  @Column({ name: 'row_spacing', type: 'float', nullable: true })
  @ApiProperty({ 
    description: 'Espacement entre les rangées en centimètres',
    example: 60,
    required: false
  })
  crop_row_spacing: number;

  @Column({ name: 'optimal_temperature', type: 'float', nullable: true })
  @ApiProperty({ 
    description: 'Température optimale de croissance en degrés Celsius',
    example: 22.5,
    required: false
  })
  crop_optimal_temperature: number;

  @Column({ name: 'optimal_ph', type: 'float', nullable: true })
  @ApiProperty({ 
    description: 'pH optimal du sol',
    example: 6.5,
    required: false
  })
  crop_optimal_ph: number;

  @Column({ name: 'water_needs', length: 50, type: 'varchar', nullable: true })
  @ApiProperty({ 
    description: 'Besoins en eau (faible, moyen, élevé)',
    example: 'moyen',
    maxLength: 50,
    required: false
  })
  crop_water_needs: string;

  @Column({ name: 'sun_exposure', length: 50, type: 'varchar', nullable: true })
  @ApiProperty({ 
    description: 'Exposition au soleil requise (ombre, mi-ombre, plein soleil)',
    example: 'plein soleil',
    maxLength: 50,
    required: false
  })
  crop_sun_exposure: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  @ApiProperty({ 
    description: 'Description de la culture',
    example: 'La tomate Roma est une variété déterminée, idéale pour les sauces.',
    required: false
  })
  crop_description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @ApiProperty({ 
    description: 'Date de création de l\'enregistrement',
    example: '2023-01-01T12:00:00Z'
  })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @ApiProperty({ 
    description: 'Date de dernière mise à jour de l\'enregistrement',
    example: '2023-01-01T12:00:00Z'
  })
  updated_at: Date;

  @ManyToMany(() => CultivationSpace, cultivationSpace => cultivationSpace.crops, { lazy: true })
  @JoinTable({
    name: 'is_cultivated',
    joinColumn: {
      name: 'id_crop',
      referencedColumnName: 'id_crop',
    },
    inverseJoinColumn: {
      name: 'cultivation_space_id',
      referencedColumnName: 'id',
    },
  })
  @ApiProperty({ 
    description: 'Espaces de culture où cette culture est plantée',
    type: () => [CultivationSpace],
    isArray: true
  })
  cultivationSpaces: Promise<CultivationSpace[]>;
}
