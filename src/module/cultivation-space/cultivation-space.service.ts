/**
 * Service de gestion des espaces de culture
 * 
 * Ce service gère la logique métier et l'accès aux données pour les espaces de culture.
 * Il fournit des méthodes pour créer, récupérer, mettre à jour et supprimer des espaces
 * de culture, ainsi que pour trouver des espaces par terrain.
 * 
 * @module CultivationSpaceService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';
import { CultivationSpace } from './entities/cultivation-space.entity';
import { Land } from '../land/entities/land.entity';

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
    private cultivationSpaceRepository: Repository<CultivationSpace>,
    @InjectRepository(Land)
    private landRepository: Repository<Land>,
  ) {}

  /**
   * Crée un nouvel espace de culture
   * 
   * @param {CreateCultivationSpaceDto} createCultivationSpaceDto - Données pour la création
   * @returns {Promise<CultivationSpace>} L'espace de culture créé
   * @throws {NotFoundException} Si le terrain associé n'existe pas
   */
  async create(createCultivationSpaceDto: CreateCultivationSpaceDto): Promise<CultivationSpace> {
    const cultivationSpace = new CultivationSpace();
    cultivationSpace.cultivation_space_name = createCultivationSpaceDto.cultivation_space_name;
    cultivationSpace.cultivation_spaces_area = createCultivationSpaceDto.cultivation_spaces_area || 0;
    cultivationSpace.cultivation_spaces_commentary = createCultivationSpaceDto.cultivation_spaces_commentary || '';
    cultivationSpace.id_land = createCultivationSpaceDto.id_land;
    cultivationSpace.cultivation_space_type = createCultivationSpaceDto.cultivation_space_type || '';
    cultivationSpace.cultivation_spaces_length = createCultivationSpaceDto.cultivation_spaces_length || 0;
    cultivationSpace.cultivation_spaces_width = createCultivationSpaceDto.cultivation_spaces_width || 0;
    cultivationSpace.cultivation_spaces_soil_type = createCultivationSpaceDto.cultivation_spaces_soil_type || '';
    cultivationSpace.cultivation_spaces_ph = createCultivationSpaceDto.cultivation_spaces_ph || 0;
    cultivationSpace.cultivation_spaces_soil_fertility = createCultivationSpaceDto.cultivation_spaces_soil_fertility || '';
    cultivationSpace.cultivation_spaces_soil_drainage = createCultivationSpaceDto.cultivation_spaces_soil_drainage || '';
    cultivationSpace.cultivation_spaces_status = createCultivationSpaceDto.cultivation_spaces_status || '';

    // Vérifier que le terrain existe
    const land = await this.landRepository.findOne({ where: { id_land: createCultivationSpaceDto.id_land } });
    if (!land) {
      throw new NotFoundException(`Terrain avec l'ID ${createCultivationSpaceDto.id_land} non trouvé`);
    }

    return this.cultivationSpaceRepository.save(cultivationSpace);
  }

  /**
   * Récupère tous les espaces de culture
   * 
   * @returns {Promise<CultivationSpace[]>} Liste de tous les espaces de culture
   */
  async findAll(): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find();
  }

  /**
   * Récupère un espace de culture par son ID
   * 
   * @param {string} id - ID de l'espace de culture à récupérer
   * @returns {Promise<CultivationSpace>} L'espace de culture trouvé
   * @throws {NotFoundException} Si l'espace de culture n'existe pas
   */
  async findOne(id: string): Promise<CultivationSpace> {
    const cultivationSpace = await this.cultivationSpaceRepository.findOne({
      where: { id: id },
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
    
    if (updateCultivationSpaceDto.cultivation_space_name !== undefined) {
      cultivationSpace.cultivation_space_name = updateCultivationSpaceDto.cultivation_space_name;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_area !== undefined) {
      cultivationSpace.cultivation_spaces_area = updateCultivationSpaceDto.cultivation_spaces_area;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_commentary !== undefined) {
      cultivationSpace.cultivation_spaces_commentary = updateCultivationSpaceDto.cultivation_spaces_commentary;
    }
    if (updateCultivationSpaceDto.id_land !== undefined) {
      // Vérifier que le nouveau terrain existe
      const land = await this.landRepository.findOne({ where: { id_land: updateCultivationSpaceDto.id_land } });
      if (!land) {
        throw new NotFoundException(`Terrain avec l'ID ${updateCultivationSpaceDto.id_land} non trouvé`);
      }
      cultivationSpace.id_land = updateCultivationSpaceDto.id_land;
    }
    if (updateCultivationSpaceDto.cultivation_space_type !== undefined) {
      cultivationSpace.cultivation_space_type = updateCultivationSpaceDto.cultivation_space_type;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_length !== undefined) {
      cultivationSpace.cultivation_spaces_length = updateCultivationSpaceDto.cultivation_spaces_length;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_width !== undefined) {
      cultivationSpace.cultivation_spaces_width = updateCultivationSpaceDto.cultivation_spaces_width;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_soil_type !== undefined) {
      cultivationSpace.cultivation_spaces_soil_type = updateCultivationSpaceDto.cultivation_spaces_soil_type;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_ph !== undefined) {
      cultivationSpace.cultivation_spaces_ph = updateCultivationSpaceDto.cultivation_spaces_ph;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_soil_fertility !== undefined) {
      cultivationSpace.cultivation_spaces_soil_fertility = updateCultivationSpaceDto.cultivation_spaces_soil_fertility;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_soil_drainage !== undefined) {
      cultivationSpace.cultivation_spaces_soil_drainage = updateCultivationSpaceDto.cultivation_spaces_soil_drainage;
    }
    if (updateCultivationSpaceDto.cultivation_spaces_status !== undefined) {
      cultivationSpace.cultivation_spaces_status = updateCultivationSpaceDto.cultivation_spaces_status;
    }
    
    return this.cultivationSpaceRepository.save(cultivationSpace);
  }

  /**
   * Supprime un espace de culture
   * 
   * @param {string} id - ID de l'espace de culture à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si l'espace de culture n'existe pas
   */
  async remove(id: string): Promise<void> {
    const cultivationSpace = await this.findOne(id);
    await this.cultivationSpaceRepository.remove(cultivationSpace);
  }

  /**
   * Récupère tous les espaces de culture pour un terrain donné
   * 
   * @param {string} landId - ID du terrain
   * @returns {Promise<CultivationSpace[]>} Liste des espaces de culture du terrain
   */
  async findByLand(landId: string): Promise<CultivationSpace[]> {
    return this.cultivationSpaceRepository.find({
      where: { id_land: landId },
    });
  }
}
