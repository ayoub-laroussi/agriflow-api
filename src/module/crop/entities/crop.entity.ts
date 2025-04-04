import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../../cultivation-bed/entities/cultivation-bed.entity';

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
  @Column({ name: 'status', length: 20, type: 'varchar' })
  status: string;

  @ApiProperty({ description: 'Espaces de culture associés' })
  @ManyToMany(() => CultivationSpace, cultivationSpace => cultivationSpace.crops)
  cultivationSpaces: CultivationSpace[];

  @ApiProperty({ description: 'Planches de culture associées' })
  @ManyToMany(() => CultivationBed, cultivationBed => cultivationBed.crops)
  cultivationBeds: CultivationBed[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
