/**
 * Service de gestion des terrains
 * 
 * Ce service gère la logique métier et l'accès aux données pour les terrains.
 * Il offre des fonctionnalités de création, récupération, mise à jour et suppression
 * de terrains, ainsi que la recherche par utilisateur.
 * 
 * @module LandService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { Land } from './entities/land.entity';

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
  ) {}

  /**
   * Crée un nouveau terrain
   * 
   * @param {CreateLandDto} createLandDto - Données pour la création du terrain
   * @returns {Promise<Land>} Le terrain créé
   */
  async create(createLandDto: CreateLandDto): Promise<Land> {
    const land = this.landRepository.create(createLandDto);
    return await this.landRepository.save(land);
  }

  /**
   * Récupère tous les terrains
   * 
   * @returns {Promise<Land[]>} Liste de tous les terrains avec leurs utilisateurs et espaces de culture
   */
  findAll(): Promise<Land[]> {
    return this.landRepository.find({
      relations: ['user', 'cultivationSpaces'],
    });
  }

  /**
   * Récupère un terrain par son ID
   * 
   * @param {string} id - ID du terrain à récupérer
   * @returns {Promise<Land>} Le terrain trouvé avec son utilisateur et ses espaces de culture
   * @throws {NotFoundException} Si le terrain n'existe pas
   */
  async findOne(id: string): Promise<Land> {
    const land = await this.landRepository.findOne({
      where: { id_land: id },
      relations: ['user', 'cultivationSpaces'],
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
    Object.assign(land, updateLandDto);
    return await this.landRepository.save(land);
  }

  /**
   * Supprime un terrain
   * 
   * @param {string} id - ID du terrain à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si le terrain n'existe pas
   */
  async remove(id: string): Promise<void> {
    await this.landRepository.delete({ id_land: id });
  }

  /**
   * Récupère tous les terrains d'un utilisateur
   * 
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Land[]>} Liste des terrains de l'utilisateur avec leurs espaces de culture
   */
  findByUserId(userId: string): Promise<Land[]> {
    return this.landRepository.find({
      where: { id_user: userId },
      relations: ['user', 'cultivationSpaces'],
    });
  }
}
