/**
 * Service de gestion des rôles
 * 
 * Ce service gère la logique métier et l'accès aux données pour les rôles.
 * Il fournit des méthodes pour créer, récupérer, mettre à jour et supprimer des rôles.
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
 * Service responsable de la gestion des rôles
 * 
 * Fournit les méthodes pour manipuler les données des rôles en base
 * et implémente la logique métier associée.
 */
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  /**
   * Crée un nouveau rôle
   * 
   * @param {CreateRoleDto} createRoleDto - Données pour la création du rôle
   * @returns {Promise<Role>} Le rôle créé
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    role.id_role = createRoleDto.id || this.getNextRoleId();
    role.role_name = createRoleDto.role;
    return this.roleRepository.save(role);
  }

  /**
   * Génère un nouvel ID de rôle
   * Cette méthode est utilisée si aucun ID n'est fourni lors de la création
   * 
   * @private
   * @returns {number} Nouvel ID de rôle
   */
  private getNextRoleId(): number {
    // Valeur par défaut si aucun rôle n'existe encore
    return Math.floor(Math.random() * 1000) + 1;
  }

  /**
   * Récupère tous les rôles
   * 
   * @returns {Promise<Role[]>} Liste de tous les rôles
   */
  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  /**
   * Récupère un rôle par son ID
   * 
   * @param {number} id - ID du rôle à récupérer
   * @returns {Promise<Role>} Le rôle trouvé
   * @throws {NotFoundException} Si le rôle n'existe pas
   */
  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id_role: id },
    });
    
    if (!role) {
      throw new NotFoundException(`Rôle avec l'ID ${id} non trouvé`);
    }
    
    return role;
  }

  /**
   * Met à jour un rôle
   * 
   * @param {number} id - ID du rôle à mettre à jour
   * @param {UpdateRoleDto} updateRoleDto - Données pour la mise à jour
   * @returns {Promise<Role>} Le rôle mis à jour
   * @throws {NotFoundException} Si le rôle n'existe pas
   */
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    
    if (updateRoleDto.role !== undefined) {
      role.role_name = updateRoleDto.role;
    }
    
    return this.roleRepository.save(role);
  }

  /**
   * Supprime un rôle
   * 
   * @param {number} id - ID du rôle à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si le rôle n'existe pas
   */
  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
  }

  /**
   * Récupère un rôle par son nom
   * 
   * @param {string} name - Nom du rôle à récupérer
   * @returns {Promise<Role>} Le rôle trouvé
   * @throws {NotFoundException} Si le rôle n'existe pas
   */
  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { role_name: name },
    });
    
    if (!role) {
      throw new NotFoundException(`Rôle avec le nom "${name}" non trouvé`);
    }
    
    return role;
  }
}
