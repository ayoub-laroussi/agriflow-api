/**
 * Service de gestion des utilisateurs
 * 
 * Ce service gère la logique métier et l'accès aux données pour les utilisateurs.
 * Il offre des fonctionnalités de création, récupération, mise à jour et suppression
 * d'utilisateurs, ainsi que des recherches spécifiques par email et nom d'utilisateur.
 * 
 * @module UserService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

/**
 * Service responsable de la gestion des utilisateurs
 * 
 * Fournit les méthodes pour manipuler les données utilisateurs en base
 * et implémente la logique métier associée.
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
   * Crée un nouvel utilisateur avec le rôle spécifié
   * 
   * @param {CreateUserDto} createUserDto - Données pour la création de l'utilisateur
   * @returns {Promise<User>} L'utilisateur créé
   * @throws {NotFoundException} Si le rôle spécifié n'existe pas
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const { role: roleName, ...userData } = createUserDto;
    
    // Récupérer le rôle depuis la base de données
    const role = await this.roleRepository.findOne({ where: { role: roleName } });
    if (!role) {
      throw new NotFoundException(`Rôle ${roleName} non trouvé`);
    }
    
    // Assigner les données de l'utilisateur et le rôle
    Object.assign(user, userData);
    user.role = role;
    
    return await this.userRepository.save(user);
  }

  /**
   * Récupère tous les utilisateurs avec leurs relations (rôle, terrains)
   * 
   * @returns {Promise<User[]>} Liste de tous les utilisateurs
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role', 'lands'],
    });
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
      where: { id_user: id },
      relations: ['role', 'lands'],
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
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  /**
   * Supprime un utilisateur
   * 
   * @param {string} id - ID de l'utilisateur à supprimer
   * @returns {Promise<void>}
   */
  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ id_user: id });
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
      where: { email },
      relations: ['role', 'lands'],
    });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'email ${email} non trouvé`);
    }
    return user;
  }

  /**
   * Récupère un utilisateur par son nom d'utilisateur
   * 
   * @param {string} username - Nom d'utilisateur à récupérer
   * @returns {Promise<User>} L'utilisateur trouvé
   * @throws {NotFoundException} Si l'utilisateur n'existe pas
   */
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role', 'lands'],
    });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec le nom d'utilisateur ${username} non trouvé`);
    }
    return user;
  }
}
