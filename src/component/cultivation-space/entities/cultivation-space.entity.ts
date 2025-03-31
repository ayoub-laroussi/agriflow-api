import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Land } from '../../land/entities/land.entity';

@Entity('cultivation_spaces')
export class CultivationSpace {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de l\'espace de culture' })
  id_cultivation_space: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'Nom de l\'espace de culture' })
  cultivation_space_name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Type d\'espace de culture', required: false })
  cultivation_space_type?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Statut de l\'espace de culture', required: false })
  cultivation_spaces_status?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Surface de l\'espace de culture', required: false })
  cultivation_spaces_area?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Longueur de l\'espace de culture', required: false })
  cultivation_spaces_length?: number;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ description: 'Type de sol', required: false })
  cultivation_spaces_soil_type?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Largeur de l\'espace de culture', required: false })
  cultivation_spaces_width?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'pH du sol', required: false })
  cultivation_spaces_ph?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Commentaire sur l\'espace de culture', required: false })
  cultivation_spaces_commentary?: string;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ description: 'Fertilité du sol', required: false })
  cultivation_spaces_soil_fertility?: string;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ description: 'Drainage du sol', required: false })
  cultivation_spaces_soil_drainage?: string;

  @ManyToOne(() => Land)
  @JoinColumn({ name: 'id_land' })
  @ApiProperty({ description: 'Terrain associé' })
  land: Land;

  @Column()
  @ApiProperty({ description: 'ID du terrain' })
  id_land: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date de création de l\'espace de culture' })
  cultivation_space_creation_date: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date de modification de l\'espace de culture' })
  cultivation_space_modification_date: Date;
}
