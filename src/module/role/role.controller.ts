/**
 * Contrôleur de gestion des rôles
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des rôles,
 * permettant les opérations CRUD (Create, Read, Update, Delete) sur les rôles.
 * 
 * @module RoleController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

/**
 * Contrôleur de gestion des rôles
 * 
 * Expose les endpoints RESTful pour manipuler les données des rôles.
 * Le préfixe de route est "/role".
 */
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * Crée un nouveau rôle
   * @param {CreateRoleDto} createRoleDto - Données pour la création du rôle
   * @returns {Promise<Role>} Rôle créé
   */
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  /**
   * Récupère tous les rôles
   * @returns {Promise<Role[]>} Liste de tous les rôles
   */
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  /**
   * Récupère un rôle par son ID
   * @param {string} id - ID du rôle à récupérer
   * @returns {Promise<Role>} Rôle trouvé
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  /**
   * Met à jour un rôle
   * @param {string} id - ID du rôle à mettre à jour
   * @param {UpdateRoleDto} updateRoleDto - Données pour la mise à jour
   * @returns {Promise<Role>} Rôle mis à jour
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  /**
   * Supprime un rôle
   * @param {string} id - ID du rôle à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
