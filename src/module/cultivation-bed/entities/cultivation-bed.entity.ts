import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';
import { Crop } from '../../crop/entities/crop.entity';

@Entity('cultivation_beds')
export class CultivationBed {
  @ApiProperty({ description: 'Identifiant unique de la planche de culture' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nom de la planche de culture' })
  @Column({ name: 'name', length: 100, type: 'varchar' })
  name: string;

  @ApiProperty({ description: 'Description de la planche de culture', required: false })
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Longueur de la planche de culture en mètres', required: false })
  @Column({ name: 'length', type: 'decimal', precision: 10, scale: 2, nullable: true })
  length: number;

  @ApiProperty({ description: 'Largeur de la planche de culture en mètres', required: false })
  @Column({ name: 'width', type: 'decimal', precision: 10, scale: 2, nullable: true })
  width: number;

  @ApiProperty({ description: 'Surface de la planche de culture en mètres carrés', required: false })
  @Column({ name: 'area', type: 'decimal', precision: 10, scale: 2, nullable: true })
  area: number;

  @ApiProperty({ description: 'Type de sol de la planche de culture', required: false })
  @Column({ name: 'soil_type', length: 50, type: 'varchar', nullable: true })
  soilType: string;

  @ApiProperty({ description: 'Niveau de pH du sol', required: false })
  @Column({ name: 'ph_level', type: 'decimal', precision: 3, scale: 1, nullable: true })
  phLevel: number;

  @ApiProperty({ description: 'Niveau de fertilité du sol', required: false })
  @Column({ name: 'fertility_level', length: 50, type: 'varchar', nullable: true })
  fertilityLevel: string;

  @ApiProperty({ description: 'Niveau de drainage du sol', required: false })
  @Column({ name: 'drainage_level', length: 50, type: 'varchar', nullable: true })
  drainageLevel: string;

  @ApiProperty({ description: 'Orientation de la planche de culture', required: false })
  @Column({ name: 'orientation', length: 50, type: 'varchar', nullable: true })
  orientation: string;

  @ApiProperty({ description: 'Commentaire sur la planche de culture', required: false })
  @Column({ name: 'commentary', type: 'text', nullable: true })
  commentary: string;

  @ApiProperty({ description: 'Espace de culture parent' })
  @ManyToOne(() => CultivationSpace, cultivationSpace => cultivationSpace.cultivationBeds, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cultivation_space_id' })
  cultivationSpace: CultivationSpace;

  @ApiProperty({ description: 'ID de l\'espace de culture parent' })
  @Column({ name: 'cultivation_space_id', type: 'uuid' })
  cultivationSpaceId: string;

  @ApiProperty({ description: 'Cultures associées à la planche de culture' })
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

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de dernière modification' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
