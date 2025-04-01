import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Land } from '../../land/entities/land.entity';
import { Crop } from '../../crop/entities/crop.entity';

@Entity('cultivation_spaces')
export class CultivationSpace {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de l\'espace de culture' })
  id: string;

  @Column({ name: 'name', length: 100, type: 'varchar' })
  @ApiProperty({ description: 'Nom de l\'espace de culture' })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  @ApiProperty({ description: 'Description de l\'espace de culture' })
  description: string;

  @Column({ name: 'area', type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'Surface de l\'espace de culture en mètres carrés' })
  area: number;

  @ManyToOne(() => Land)
  @JoinColumn({ name: 'land_id' })
  @ApiProperty({ description: 'Terrain associé' })
  land: Land;

  @Column({ name: 'land_id', type: 'uuid' })
  @ApiProperty({ description: 'ID du terrain' })
  landId: string;

  @ManyToMany(() => Crop, crop => crop.cultivationSpaces)
  @JoinTable({
    name: 'is_cultivated',
    joinColumn: {
      name: 'cultivation_space_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'crop_id',
      referencedColumnName: 'id',
    },
  })
  @ApiProperty({ description: 'Cultures associées' })
  crops: Crop[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @ApiProperty({ description: 'Date de création de l\'espace de culture' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @ApiProperty({ description: 'Date de modification de l\'espace de culture' })
  updatedAt: Date;
}
