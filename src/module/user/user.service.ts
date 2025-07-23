/**
 * Service de gestion des utilisateurs
 * 
 * Ce service gère la logique métier et l'accès aux données pour les utilisateurs.
 * Il fournit des méthodes pour créer, récupérer, mettre à jour et supprimer des utilisateurs,
 * ainsi que des méthodes spécifiques pour rechercher des utilisateurs par email ou nom d'utilisateur.
 * 
 * @module UserService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

/**
 * Service responsable de la gestion des utilisateurs
 * 
 * Fournit les méthodes pour manipuler les données des utilisateurs en base
 * et implémente la logique métier associée, comme le hachage des mots de passe.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  /**
   * Crée un nouvel utilisateur
   * 
   * @param {CreateUserDto} createUserDto - Données pour la création de l'utilisateur
   * @returns {Promise<User>} L'utilisateur créé
   * @throws {NotFoundException} Si le rôle spécifié n'existe pas
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // Créer l'utilisateur
    const user = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = hashedPassword;
    
    // Assigner le rôle par défaut si non spécifié
    const roleName = createUserDto.role || 'user';
    const role = await this.roleRepository.findOne({ where: { role_name: roleName } });
    
    if (!role) {
      throw new NotFoundException(`Rôle ${roleName} non trouvé`);
    }
    
    user.role = role.id_role;
    
    return this.userRepository.save(user);
  }

  /**
   * Récupère tous les utilisateurs
   * 
   * @returns {Promise<User[]>} Liste de tous les utilisateurs
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Récupère un utilisateur par son ID
   * 
   * @param {string} id - ID de l'utilisateur à récupérer
   * @returns {Promise<User>} L'utilisateur trouvé
   * @throws {NotFoundException} Si l'utilisateur n'existe pas
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id_user: id }
    });
    
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    
    return user;
  }

  /**
   * Met à jour un utilisateur
   * 
   * @param {string} id - ID de l'utilisateur à mettre à jour
   * @param {UpdateUserDto} updateUserDto - Données pour la mise à jour
   * @returns {Promise<User>} L'utilisateur mis à jour
   * @throws {NotFoundException} Si l'utilisateur n'existe pas
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }
    
    if (updateUserDto.username !== undefined) {
      user.username = updateUserDto.username;
    }
    
    if (updateUserDto.password !== undefined) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    if (updateUserDto.role !== undefined) {
      const role = await this.roleRepository.findOne({ where: { role_name: updateUserDto.role } });
      if (!role) {
        throw new NotFoundException(`Rôle ${updateUserDto.role} non trouvé`);
      }
      user.role = role.id_role;
    }
    
    return this.userRepository.save(user);
  }

  /**
   * Supprime un utilisateur
   * 
   * @param {string} id - ID de l'utilisateur à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si l'utilisateur n'existe pas
   */
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  /**
   * Récupère un utilisateur par son email
   * 
   * @param {string} email - Email de l'utilisateur à récupérer
   * @returns {Promise<User>} L'utilisateur trouvé
   * @throws {NotFoundException} Si l'utilisateur n'existe pas
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email }
    });
    
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'email ${email} non trouvé`);
    }
    
    return user;
  }

  /**
   * Récupère un utilisateur par son nom d'utilisateur
   * 
   * @param {string} username - Nom d'utilisateur de l'utilisateur à récupérer
   * @returns {Promise<User>} L'utilisateur trouvé
   * @throws {NotFoundException} Si l'utilisateur n'existe pas
   */
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username }
    });
    
    if (!user) {
      throw new NotFoundException(`Utilisateur avec le nom d'utilisateur ${username} non trouvé`);
    }
    
    return user;
  }
}
