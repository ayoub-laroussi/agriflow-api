import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';

@Entity('crops')
export class Crop {
  @ApiProperty({ description: 'Identifiant unique de la culture' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Commentaire sur la culture' })
  @Column({ name: 'commentary', type: 'text', nullable: true })
  commentary: string;

  @ApiProperty({ description: 'Famille de la plante' })
  @Column({ name: 'plant_family', length: 100 })
  plantFamily: string;

  @ApiProperty({ description: 'Variété de la plante' })
  @Column({ name: 'variety', length: 100 })
  variety: string;

  @ApiProperty({ description: 'Date de plantation' })
  @Column({ name: 'plant_date', type: 'date' })
  plantDate: Date;

  @ApiProperty({ description: 'Statut de la culture' })
  @Column({ name: 'status', length: 20 })
  status: string;

  @ApiProperty({ description: 'Espaces de culture associés' })
  @ManyToMany(() => CultivationSpace, cultivationSpace => cultivationSpace.crops)
  cultivationSpaces: CultivationSpace[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
