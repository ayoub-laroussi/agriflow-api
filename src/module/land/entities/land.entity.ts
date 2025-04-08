/**
 * Entité représentant un terrain
 * 
 * Cette entité définit la structure de données pour les terrains dans l'application.
 * Un terrain est une zone géographique qui peut contenir plusieurs espaces de culture
 * et est toujours associé à un utilisateur propriétaire.
 * 
 * @module Land
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { CultivationSpace } from '../../cultivation-space/entities/cultivation-space.entity';

/**
 * Classe représentant un terrain dans le système
 * 
 * Un terrain est une zone géographique qui peut contenir plusieurs espaces de culture.
 * Il est toujours associé à un utilisateur propriétaire et possède des informations
 * sur sa surface et sa localisation.
 */
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

  @ManyToOne(() => User, user => user.lands, { lazy: true })
  @JoinColumn({ name: 'id_user' })
  @ApiProperty({ 
    description: 'Utilisateur propriétaire du terrain',
    type: () => User
  })
  user: Promise<User>;

  @Column({ type: 'uuid' })
  @ApiProperty({ description: 'ID de l\'utilisateur propriétaire' })
  id_user: string;

  @OneToMany(() => CultivationSpace, cultivationSpace => cultivationSpace.land, { lazy: true })
  @ApiProperty({ 
    description: 'Espaces de culture du terrain',
    type: () => [CultivationSpace],
    isArray: true
  })
  cultivationSpaces: Promise<CultivationSpace[]>;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de création du terrain' })
  land_creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de modification du terrain' })
  land_modification_date: Date;
}
