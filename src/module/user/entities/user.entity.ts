/**
 * Entité représentant un utilisateur dans le système
 * 
 * Cette entité définit la structure de données d'un utilisateur dans l'application,
 * incluant ses informations personnelles, son rôle et ses relations avec d'autres entités.
 * Elle est mappée à la table 'users' dans la base de données.
 * 
 * @module User
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entities/role.entity';
import { Land } from '../../land/entities/land.entity';

/**
 * Entité Utilisateur
 * 
 * Représente un utilisateur du système avec ses propriétés
 * et relations avec d'autres entités comme les rôles et terrains.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identifiant unique de l\'utilisateur' })
  id_user: string;

  @Column({ length: 50, unique: true, type: 'varchar' })
  @ApiProperty({ description: 'Email de l\'utilisateur' })
  email: string;

  @Column({ length: 50, type: 'varchar' })
  @ApiProperty({ description: 'Nom d\'utilisateur' })
  username: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'Mot de passe de l\'utilisateur' })
  password: string;

  @ManyToOne(() => Role, { lazy: true })
  @JoinColumn({ name: 'role' })
  @ApiProperty({ 
    description: 'Rôle de l\'utilisateur',
    type: () => Role 
  })
  role: Promise<Role>;

  @OneToMany(() => Land, land => land.user, { lazy: true })
  @ApiProperty({ 
    description: 'Terrains de l\'utilisateur',
    type: () => [Land],
    isArray: true
  })
  lands: Promise<Land[]>;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de création de l\'utilisateur' })
  users_creation_date: Date;
}
