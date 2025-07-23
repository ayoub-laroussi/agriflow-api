/**
 * Service de gestion des terrains
 * 
 * Ce service gère la logique métier et l'accès aux données pour les terrains.
 * Il fournit des méthodes pour créer, récupérer, mettre à jour et supprimer des terrains,
 * ainsi que des méthodes spécifiques pour rechercher des terrains par utilisateur.
 * 
 * @module LandService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { Land } from './entities/land.entity';
import { User } from '../user/entities/user.entity';

/**
 * Service responsable de la gestion des terrains
 * 
 * Fournit les méthodes pour manipuler les données des terrains en base
 * et implémente la logique métier associée.
 */
@Injectable()
export class LandService {
  constructor(
    @InjectRepository(Land)
    private landRepository: Repository<Land>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Crée un nouveau terrain
   * 
   * @param {CreateLandDto} createLandDto - Données pour la création du terrain
   * @returns {Promise<Land>} Le terrain créé
   * @throws {NotFoundException} Si l'utilisateur spécifié n'existe pas
   */
  async create(createLandDto: CreateLandDto): Promise<Land> {
    // Vérifier que l'utilisateur existe
    const user = await this.userRepository.findOne({ where: { id_user: createLandDto.id_user } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${createLandDto.id_user} non trouvé`);
    }
    
    const land = new Land();
    land.land_name = createLandDto.land_name;
    land.land_area = createLandDto.land_area;
    land.land_coordinate = createLandDto.land_coordinate;
    land.id_user = createLandDto.id_user;
    
    return this.landRepository.save(land);
  }

  /**
   * Récupère tous les terrains
   * 
   * @returns {Promise<Land[]>} Liste de tous les terrains
   */
  async findAll(): Promise<Land[]> {
    return this.landRepository.find();
  }

  /**
   * Récupère un terrain par son ID
   * 
   * @param {string} id - ID du terrain à récupérer
   * @returns {Promise<Land>} Le terrain trouvé
   * @throws {NotFoundException} Si le terrain n'existe pas
   */
  async findOne(id: string): Promise<Land> {
    const land = await this.landRepository.findOne({
      where: { id_land: id }
    });
    
    if (!land) {
      throw new NotFoundException(`Terrain avec l'ID ${id} non trouvé`);
    }
    
    return land;
  }

  /**
   * Met à jour un terrain
   * 
   * @param {string} id - ID du terrain à mettre à jour
   * @param {UpdateLandDto} updateLandDto - Données pour la mise à jour
   * @returns {Promise<Land>} Le terrain mis à jour
   * @throws {NotFoundException} Si le terrain n'existe pas
   */
  async update(id: string, updateLandDto: UpdateLandDto): Promise<Land> {
    const land = await this.findOne(id);
    
    if (updateLandDto.land_name !== undefined) {
      land.land_name = updateLandDto.land_name;
    }
    
    if (updateLandDto.land_area !== undefined) {
      land.land_area = updateLandDto.land_area;
    }
    
    if (updateLandDto.land_coordinate !== undefined) {
      land.land_coordinate = updateLandDto.land_coordinate;
    }
    
    if (updateLandDto.id_user !== undefined) {
      // Vérifier que l'utilisateur existe
      const user = await this.userRepository.findOne({ where: { id_user: updateLandDto.id_user } });
      if (!user) {
        throw new NotFoundException(`Utilisateur avec l'ID ${updateLandDto.id_user} non trouvé`);
      }
      land.id_user = updateLandDto.id_user;
    }
    
    return this.landRepository.save(land);
  }

  /**
   * Supprime un terrain
   * 
   * @param {string} id - ID du terrain à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si le terrain n'existe pas
   */
  async remove(id: string): Promise<void> {
    const land = await this.findOne(id);
    await this.landRepository.remove(land);
  }

  /**
   * Récupère tous les terrains d'un utilisateur
   * 
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Land[]>} Liste des terrains de l'utilisateur
   */
  async findByUser(userId: string): Promise<Land[]> {
    return this.landRepository.find({
      where: { id_user: userId }
    });
  }
}
