/**
 * Service de gestion des rôles
 * 
 * Ce service gère la logique métier et l'accès aux données pour les rôles.
 * Il fournit des méthodes pour créer, lire, mettre à jour et supprimer des rôles,
 * ainsi que des méthodes spécifiques pour rechercher des rôles par nom.
 * 
 * @module RoleService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

/**
 * Service de gestion des rôles
 * 
 * Implémente la logique métier pour la manipulation des données des rôles
 * et gère les interactions avec la base de données via TypeORM.
 */
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  /**
   * Crée un nouveau rôle
   * @param {CreateRoleDto} createRoleDto - Données pour la création du rôle
   * @returns {Promise<Role>} Rôle créé
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    Object.assign(role, createRoleDto);
    return await this.roleRepository.save(role);
  }

  /**
   * Récupère tous les rôles avec leurs utilisateurs associés
   * @returns {Promise<Role[]>} Liste de tous les rôles
   */
  findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['users'],
    });
  }

  /**
   * Récupère un rôle par son ID
   * @param {number} id - ID du rôle à récupérer
   * @returns {Promise<Role>} Rôle trouvé
   * @throws {NotFoundException} Si le rôle n'est pas trouvé
   */
  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!role) {
      throw new NotFoundException(`Rôle avec l'ID ${id} non trouvé`);
    }
    return role;
  }

  /**
   * Met à jour un rôle existant
   * @param {number} id - ID du rôle à mettre à jour
   * @param {UpdateRoleDto} updateRoleDto - Données pour la mise à jour
   * @returns {Promise<Role>} Rôle mis à jour
   * @throws {NotFoundException} Si le rôle n'est pas trouvé
   */
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  /**
   * Supprime un rôle
   * @param {number} id - ID du rôle à supprimer
   * @returns {Promise<void>}
   */
  async remove(id: number): Promise<void> {
    await this.roleRepository.delete({ id });
  }

  /**
   * Recherche un rôle par son nom
   * @param {string} name - Nom du rôle à rechercher
   * @returns {Promise<Role>} Rôle trouvé
   * @throws {NotFoundException} Si le rôle n'est pas trouvé
   */
  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { role: name },
      relations: ['users'],
    });
    if (!role) {
      throw new NotFoundException(`Rôle avec le nom ${name} non trouvé`);
    }
    return role;
  }
}
