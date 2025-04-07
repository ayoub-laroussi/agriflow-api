/**
 * Contrôleur de gestion des utilisateurs
 * 
 * Ce contrôleur expose les endpoints REST pour la gestion des utilisateurs,
 * permettant les opérations CRUD (Create, Read, Update, Delete) ainsi que
 * des recherches spécifiques par email et nom d'utilisateur.
 * 
 * @module UserController
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 * Contrôleur de gestion des utilisateurs
 * 
 * Expose les endpoints RESTful pour manipuler les données utilisateurs.
 * Le préfixe de route est "/users".
 */
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Crée un nouvel utilisateur
   * @param {CreateUserDto} createUserDto - Données pour la création de l'utilisateur
   * @returns {Promise<User>} Utilisateur créé
   */
  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès', type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * Récupère tous les utilisateurs
   * @returns {Promise<User[]>} Liste de tous les utilisateurs
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs', type: [User] })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Récupère un utilisateur par son ID
   * @param {string} id - ID de l'utilisateur à récupérer
   * @returns {Promise<User>} Utilisateur trouvé
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: User })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  /**
   * Met à jour un utilisateur
   * @param {string} id - ID de l'utilisateur à mettre à jour
   * @param {UpdateUserDto} updateUserDto - Données pour la mise à jour
   * @returns {Promise<User>} Utilisateur mis à jour
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès', type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Supprime un utilisateur
   * @param {string} id - ID de l'utilisateur à supprimer
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès' })
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  /**
   * Récupère un utilisateur par son email
   * @param {string} email - Email de l'utilisateur à récupérer
   * @returns {Promise<User>} Utilisateur trouvé
   */
  @Get('email/:email')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son email' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: User })
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  /**
   * Récupère un utilisateur par son nom d'utilisateur
   * @param {string} username - Nom d'utilisateur à récupérer
   * @returns {Promise<User>} Utilisateur trouvé
   */
  @Get('username/:username')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son nom d\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: User })
  findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }
}