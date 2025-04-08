/**
 * Entité de rôle
 * 
 * Cette entité représente un rôle dans l'application.
 * Un rôle est associé à plusieurs utilisateurs et définit leurs permissions.
 * 
 * @module Role
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

/**
 * Entité de rôle
 * 
 * Représente un rôle dans l'application avec ses propriétés et relations.
 * Un rôle peut être associé à plusieurs utilisateurs.
 */
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identifiant unique du rôle' })
  id: number;

  @Column({ length: 50, unique: true, type: 'varchar' })
  @ApiProperty({ description: 'Nom du rôle' })
  role: string;

  @OneToMany(() => User, user => user.role, { lazy: true })
  @ApiProperty({
    description: 'Utilisateurs ayant ce rôle',
    type: () => [User],
    isArray: true
  })
  users: Promise<User[]>;
}
