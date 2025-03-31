import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('crop')
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de la culture' })
  id_crop: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Commentaire sur la culture', required: false })
  crop_commentary?: string;

  @Column({ length: 50 })
  @ApiProperty({ description: 'Nom de la culture' })
  crop_name: string;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ description: 'Famille de la plante', required: false })
  crop_plant_family?: string;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ description: 'Variété de la culture', required: false })
  crop_variety?: string;

  @Column()
  @ApiProperty({ description: 'Date de plantation' })
  crop_planting_date: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Date de récolte', required: false })
  crop_harvest_date?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Statut de la culture', required: false })
  crop_status?: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date de création de la culture' })
  crop_creation_date: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date de modification de la culture' })
  crop_modification_date: Date;
}
