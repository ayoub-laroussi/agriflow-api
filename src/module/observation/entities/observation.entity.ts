/**
 * Entité représentant une observation dans le système
 * 
 * Cette entité définit la structure de données d'une observation dans l'application,
 * incluant les données météorologiques et les remarques sur un espace de culture.
 * Elle est mappée à la table 'observations' dans la base de données.
 * 
 * @module Observation
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';
import { Land } from '../../land/entities/land.entity';

/**
 * Entité Observation
 * 
 * Représente une observation avec ses propriétés et relations.
 * Une observation est associée à un espace de culture et peut contenir
 * des données météorologiques et des remarques générales.
 */
@Entity('observations')
export class Observation {
  @ApiProperty({ description: 'Identifiant unique de l\'observation' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Date de l\'observation' })
  @Column({ name: 'observation_date', type: 'timestamp' })
  observationDate: Date;

  @ApiProperty({ description: 'Description ou remarques générales' })
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  // Données météorologiques
  @ApiProperty({ 
    description: 'Température en degrés Celsius', 
    example: 22.5,
    required: false
  })
  @Column({ name: 'temperature', type: 'decimal', precision: 4, scale: 1, nullable: true })
  temperature: number;

  @ApiProperty({ 
    description: 'Humidité de l\'air en pourcentage', 
    example: 65,
    minimum: 0,
    maximum: 100,
    required: false
  })
  @Column({ name: 'humidity', type: 'decimal', precision: 5, scale: 2, nullable: true })
  humidity: number;

  @ApiProperty({ 
    description: 'Précipitations en millimètres', 
    example: 2.5,
    minimum: 0,
    required: false
  })
  @Column({ name: 'precipitation', type: 'decimal', precision: 5, scale: 2, nullable: true })
  precipitation: number;

  @ApiProperty({ 
    description: 'Vitesse du vent en km/h', 
    example: 10.2,
    minimum: 0,
    required: false
  })
  @Column({ name: 'wind_speed', type: 'decimal', precision: 5, scale: 2, nullable: true })
  windSpeed: number;

  @ApiProperty({ 
    description: 'Direction du vent (N, NE, E, SE, S, SO, O, NO)', 
    example: 'NO',
    required: false
  })
  @Column({ name: 'wind_direction', length: 2, type: 'varchar', nullable: true })
  windDirection: string;

  @ApiProperty({ 
    description: 'Pression atmosphérique en hPa', 
    example: 1013.25,
    required: false
  })
  @Column({ name: 'pressure', type: 'decimal', precision: 6, scale: 2, nullable: true })
  pressure: number;

  @ApiProperty({ 
    description: 'Conditions météo générales', 
    example: 'Ensoleillé',
    required: false
  })
  @Column({ name: 'weather_condition', length: 50, type: 'varchar', nullable: true })
  weatherCondition: string;

  // Relations
  @ApiProperty({ description: 'Espace de culture concerné par l\'observation' })
  @ManyToOne(() => CultivationSpace, { nullable: true })
  @JoinColumn({ name: 'cultivation_space_id' })
  cultivationSpace: CultivationSpace;

  @Column({ name: 'cultivation_space_id', type: 'uuid', nullable: true })
  cultivationSpaceId: string;

  @ApiProperty({ description: 'Terrain concerné par l\'observation' })
  @ManyToOne(() => Land, { nullable: true })
  @JoinColumn({ name: 'land_id' })
  land: Land;

  @Column({ name: 'land_id', type: 'uuid', nullable: true })
  landId: string;

  @ApiProperty({ description: 'Une observation doit être liée soit à un espace de culture, soit à un terrain' })
  @Column({ name: 'is_land_observation', type: 'boolean', default: false })
  isLandObservation: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
