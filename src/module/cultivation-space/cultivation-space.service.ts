/**
 * Service de gestion des espaces de culture
 * 
 * Ce service gère la logique métier et l'accès aux données pour les espaces de culture.
 * Il offre des fonctionnalités de création, récupération, mise à jour et suppression
 * d'espaces de culture, ainsi que la recherche par terrain.
 * 
 * @module CultivationSpaceService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';
import { CultivationSpace } from './entities/cultivation-space.entity';

/**
 * Service responsable de la gestion des espaces de culture
 * 
 * Fournit les méthodes pour manipuler les données des espaces de culture en base
 * et implémente la logique métier associée.
 */
@Injectable()
export class CultivationSpaceService {
  constructor(
    @InjectRepository(CultivationSpace)
    private readonly cultivationSpaceRepository: Repository<CultivationSpace>,
  ) {}

  /**
   * Crée un nouvel espace de culture
   * 
   * @param {CreateCultivationSpaceDto} createCultivationSpaceDto - Données pour la création de l'espace de culture
   * @returns {Promise<CultivationSpace>} L'espace de culture créé
   */
  async create(createCultivationSpaceDto: CreateCultivationSpaceDto): Promise<CultivationSpace> {
    const cultivationSpace = new CultivationSpace();
    
    // Mappage manuel des propriétés du DTO vers l'entité
    cultivationSpace.name = createCultivationSpaceDto.cultivation_space_name;
    cultivationSpace.area = createCultivationSpaceDto.cultivation_spaces_area || 0;
    cultivationSpace.description = createCultivationSpaceDto.cultivation_spaces_commentary || '';
    cultivationSpace.landId = createCultivationSpaceDto.id_land;
    
    return await this.cultivationSpaceRepository.save(cultivationSpace);
  }

  /**
   * Récupère tous les espaces de culture
   * 
   * @returns {Promise<CultivationSpace[]>} Liste de tous les espaces de culture avec leurs terrains associés
   */
  findAll(): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find({
      relations: ['land'],
    });
  }

  /**
   * Récupère un espace de culture par son ID
   * 
   * @param {string} id - ID de l'espace de culture à récupérer
   * @returns {Promise<CultivationSpace>} L'espace de culture trouvé avec son terrain associé
   * @throws {NotFoundException} Si l'espace de culture n'existe pas
   */
  async findOne(id: string): Promise<CultivationSpace> {
    const cultivationSpace = await this.cultivationSpaceRepository.findOne({
      where: { id },
      relations: ['land'],
    });
    if (!cultivationSpace) {
      throw new NotFoundException(`Espace de culture avec l'ID ${id} non trouvé`);
    }
    return cultivationSpace;
  }

  /**
   * Met à jour un espace de culture
   * 
   * @param {string} id - ID de l'espace de culture à mettre à jour
   * @param {UpdateCultivationSpaceDto} updateCultivationSpaceDto - Données pour la mise à jour
   * @returns {Promise<CultivationSpace>} L'espace de culture mis à jour
   * @throws {NotFoundException} Si l'espace de culture n'existe pas
   */
  async update(id: string, updateCultivationSpaceDto: UpdateCultivationSpaceDto): Promise<CultivationSpace> {
    const cultivationSpace = await this.findOne(id);
    Object.assign(cultivationSpace, updateCultivationSpaceDto);
    return await this.cultivationSpaceRepository.save(cultivationSpace);
  }

  /**
   * Supprime un espace de culture
   * 
   * @param {string} id - ID de l'espace de culture à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si l'espace de culture n'existe pas
   */
  async remove(id: string): Promise<void> {
    await this.cultivationSpaceRepository.delete({ id });
  }

  /**
   * Récupère tous les espaces de culture d'un terrain
   * 
   * @param {string} landId - ID du terrain
   * @returns {Promise<CultivationSpace[]>} Liste des espaces de culture du terrain avec leurs terrains associés
   */
  findByLandId(landId: string): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find({
      where: { landId },
      relations: ['land'],
    });
  }
}
