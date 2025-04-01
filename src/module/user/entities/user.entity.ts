import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entities/role.entity';
import { Land } from '../../land/entities/land.entity';

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

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role' })
  @ApiProperty({ description: 'Rôle de l\'utilisateur' })
  role: Role;

  @OneToMany(() => Land, land => land.user)
  @ApiProperty({ description: 'Terrains de l\'utilisateur' })
  lands: Land[];

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Date de création de l\'utilisateur' })
  users_creation_date: Date;
}
