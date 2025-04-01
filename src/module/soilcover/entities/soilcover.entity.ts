import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('soil_cover')
export class SoilCover {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de la couverture du sol' })
  id_soil_cover: string;

  @Column({ length: 50, type: 'varchar' })
  @ApiProperty({ description: 'Type de couverture du sol' })
  type_soil_cover: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date de mise en place de la couverture' })
  soilCoverDate: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Commentaire sur la couverture du sol', required: false })
  soilCoverCommentary?: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date de création de la couverture du sol' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date de modification de la couverture du sol' })
  updated_at: Date;
}
