import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';
import { Crop } from '../../crop/entities/crop.entity';

@Entity('cultivation_beds')
export class CultivationBed {
  @ApiProperty({ 
    description: 'Identifiant unique de la planche de culture',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid' 
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ 
    description: 'Nom de la planche de culture',
    example: 'Planche de tomates',
    maxLength: 100
  })
  @Column({ name: 'name', length: 100, type: 'varchar' })
  name: string;

  @ApiProperty({ 
    description: 'Description détaillée de la planche de culture',
    example: 'Planche de culture destinée aux tomates, située à l\'est du potager',
    required: false
  })
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @ApiProperty({ 
    description: 'Longueur de la planche de culture en mètres',
    example: 5.5,
    minimum: 0,
    required: false
  })
  @Column({ name: 'length', type: 'decimal', precision: 10, scale: 2, nullable: true })
  length: number;

  @ApiProperty({ 
    description: 'Largeur de la planche de culture en mètres',
    example: 1.2,
    minimum: 0,
    required: false
  })
  @Column({ name: 'width', type: 'decimal', precision: 10, scale: 2, nullable: true })
  width: number;

  @ApiProperty({ 
    description: 'Surface de la planche de culture en mètres carrés',
    example: 6.6,
    minimum: 0,
    required: false
  })
  @Column({ name: 'area', type: 'decimal', precision: 10, scale: 2, nullable: true })
  area: number;

  @ApiProperty({ 
    description: 'Type de sol de la planche de culture',
    example: 'Argileux',
    maxLength: 50,
    required: false
  })
  @Column({ name: 'soil_type', length: 50, type: 'varchar', nullable: true })
  soilType: string;

  @ApiProperty({ 
    description: 'Niveau de pH du sol (échelle de 0 à 14)',
    example: 6.5,
    minimum: 0,
    maximum: 14,
    required: false
  })
  @Column({ name: 'ph_level', type: 'decimal', precision: 3, scale: 1, nullable: true })
  phLevel: number;

  @ApiProperty({ 
    description: 'Niveau de fertilité du sol (faible, moyen, élevé, etc.)',
    example: 'Moyen',
    maxLength: 50,
    required: false
  })
  @Column({ name: 'fertility_level', length: 50, type: 'varchar', nullable: true })
  fertilityLevel: string;

  @ApiProperty({ 
    description: 'Niveau de drainage du sol (faible, moyen, bon, etc.)',
    example: 'Bon',
    maxLength: 50,
    required: false
  })
  @Column({ name: 'drainage_level', length: 50, type: 'varchar', nullable: true })
  drainageLevel: string;

  @ApiProperty({ 
    description: 'Orientation de la planche de culture (nord-sud, est-ouest, etc.)',
    example: 'Nord-Sud',
    maxLength: 50,
    required: false
  })
  @Column({ name: 'orientation', length: 50, type: 'varchar', nullable: true })
  orientation: string;

  @ApiProperty({ 
    description: 'Commentaire ou notes additionnelles sur la planche de culture',
    example: 'Planche surélevée de 30cm, bordée de pierres',
    required: false
  })
  @Column({ name: 'commentary', type: 'text', nullable: true })
  commentary: string;

  @ApiProperty({ 
    description: 'Espace de culture parent auquel appartient cette planche',
    type: () => CultivationSpace,
  })
  @ManyToOne(() => CultivationSpace, cultivationSpace => cultivationSpace.cultivationBeds, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cultivation_space_id' })
  cultivationSpace: CultivationSpace;

  @ApiProperty({ 
    description: 'Identifiant UUID de l\'espace de culture parent',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid'
  })
  @Column({ name: 'cultivation_space_id', type: 'uuid' })
  cultivationSpaceId: string;

  @ApiProperty({ 
    description: 'Cultures associées à la planche de culture',
    type: () => [Crop],
    isArray: true,
  })
  @ManyToMany(() => Crop)
  @JoinTable({
    name: 'cultivation_bed_crops',
    joinColumn: {
      name: 'cultivation_bed_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'crop_id',
      referencedColumnName: 'id',
    },
  })
  crops: Crop[];

  @ApiProperty({ 
    description: 'Date de création de l\'enregistrement',
    example: '2023-04-01T10:00:00Z',
    format: 'date-time'
  })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Date de dernière modification de l\'enregistrement',
    example: '2023-04-01T15:30:00Z',
    format: 'date-time'
  })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
