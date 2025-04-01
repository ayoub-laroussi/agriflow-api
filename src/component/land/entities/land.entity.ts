import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';

@Entity('land')
export class Land {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique du terrain' })
  id_land: string;

  @Column({ length: 50, type: 'varchar' })
  @ApiProperty({ description: 'Nom du terrain' })
  land_name: string;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'Surface du terrain en mètres carrés' })
  land_area: number;

  @Column({ nullable: true, type: 'float' })
  @ApiProperty({ description: 'Coordonnées du terrain', required: false })
  land_coordinate?: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  @ApiProperty({ description: 'Utilisateur propriétaire du terrain' })
  user: User;

  @Column({ type: 'uuid' })
  @ApiProperty({ description: 'ID de l\'utilisateur propriétaire' })
  id_user: string;

  @OneToMany(() => CultivationSpace, cultivationSpace => cultivationSpace.land)
  @ApiProperty({ description: 'Espaces de culture du terrain' })
  cultivationSpaces: CultivationSpace[];

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de création du terrain' })
  land_creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de modification du terrain' })
  land_modification_date: Date;
}
