import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identifiant unique du rôle' })
  id: number;

  @Column({ length: 50, unique: true })
  @ApiProperty({ description: 'Nom du rôle' })
  role: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
