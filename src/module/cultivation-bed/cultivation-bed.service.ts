/**
 * Service de gestion des planches de culture
 * 
 * Ce service gère la logique métier et l'accès aux données pour les planches de culture.
 * Il fournit des méthodes pour créer, récupérer, mettre à jour et supprimer des planches de culture,
 * ainsi que des méthodes spécifiques pour rechercher des planches par espace de culture.
 * 
 * @module CultivationBedService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultivationBedDto } from './dto/create-cultivation-bed.dto';
import { UpdateCultivationBedDto } from './dto/update-cultivation-bed.dto';
import { CultivationBed } from './entities/cultivation-bed.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';

/**
 * Service responsable de la gestion des planches de culture
 * 
 * Fournit les méthodes pour manipuler les données des planches de culture en base
 * et implémente la logique métier associée.
 */
@Injectable()
export class CultivationBedService {
  constructor(
    @InjectRepository(CultivationBed)
    private cultivationBedRepository: Repository<CultivationBed>,
    @InjectRepository(CultivationSpace)
    private cultivationSpaceRepository: Repository<CultivationSpace>,
  ) {}

  /**
   * Crée une nouvelle planche de culture
   * 
   * @param {CreateCultivationBedDto} createCultivationBedDto - Données pour la création de la planche
   * @returns {Promise<CultivationBed>} La planche de culture créée
   * @throws {NotFoundException} Si l'espace de culture spécifié n'existe pas
   */
  async create(createCultivationBedDto: CreateCultivationBedDto): Promise<CultivationBed> {
    // Vérifier que l'espace de culture existe
    const cultivationSpace = await this.cultivationSpaceRepository.findOne({
      where: { id: createCultivationBedDto.cultivation_space_id },
    });
    
    if (!cultivationSpace) {
      throw new NotFoundException(`Espace de culture avec l'ID ${createCultivationBedDto.cultivation_space_id} non trouvé`);
    }
    
    const cultivationBed = new CultivationBed();
    cultivationBed.name = createCultivationBedDto.name;
    cultivationBed.description = createCultivationBedDto.description || '';
    cultivationBed.length = createCultivationBedDto.length || 0;
    cultivationBed.width = createCultivationBedDto.width || 0;
    cultivationBed.area = createCultivationBedDto.area || 0;
    cultivationBed.soilType = createCultivationBedDto.soil_type || '';
    cultivationBed.phLevel = createCultivationBedDto.ph_level || 0;
    cultivationBed.fertilityLevel = createCultivationBedDto.fertility_level || '';
    cultivationBed.drainageLevel = createCultivationBedDto.drainage_level || '';
    cultivationBed.orientation = createCultivationBedDto.orientation || '';
    cultivationBed.commentary = createCultivationBedDto.commentary || '';
    cultivationBed.cultivationSpaceId = createCultivationBedDto.cultivation_space_id;
    
    return this.cultivationBedRepository.save(cultivationBed);
  }

  /**
   * Récupère toutes les planches de culture
   * 
   * @returns {Promise<CultivationBed[]>} Liste de toutes les planches de culture
   */
  async findAll(): Promise<CultivationBed[]> {
    return this.cultivationBedRepository.find({
      relations: ['cultivationSpace']
    });
  }

  /**
   * Récupère une planche de culture par son ID
   * 
   * @param {string} id - ID de la planche de culture à récupérer
   * @returns {Promise<CultivationBed>} La planche de culture trouvée
   * @throws {NotFoundException} Si la planche de culture n'existe pas
   */
  async findOne(id: string): Promise<CultivationBed> {
    const cultivationBed = await this.cultivationBedRepository.findOne({
      where: { id },
      relations: ['cultivationSpace']
    });
    
    if (!cultivationBed) {
      throw new NotFoundException(`Planche de culture avec l'ID ${id} non trouvée`);
    }
    
    return cultivationBed;
  }

  /**
   * Récupère toutes les planches de culture pour un espace de culture donné
   * 
   * @param {string} cultivationSpaceId - ID de l'espace de culture
   * @returns {Promise<CultivationBed[]>} Liste des planches de culture de l'espace
   * @throws {NotFoundException} Si l'espace de culture n'existe pas
   */
  async findByCultivationSpace(cultivationSpaceId: string): Promise<CultivationBed[]> {
    // Vérifier que l'espace de culture existe
    const cultivationSpace = await this.cultivationSpaceRepository.findOne({
      where: { id: cultivationSpaceId }
    });
    
    if (!cultivationSpace) {
      throw new NotFoundException(`Espace de culture avec l'ID ${cultivationSpaceId} non trouvé`);
    }
    
    return this.cultivationBedRepository.find({
      where: { cultivationSpaceId },
      relations: ['cultivationSpace']
    });
  }

  /**
   * Met à jour une planche de culture
   * 
   * @param {string} id - ID de la planche de culture à mettre à jour
   * @param {UpdateCultivationBedDto} updateCultivationBedDto - Données pour la mise à jour
   * @returns {Promise<CultivationBed>} La planche de culture mise à jour
   * @throws {NotFoundException} Si la planche de culture n'existe pas
   */
  async update(id: string, updateCultivationBedDto: UpdateCultivationBedDto): Promise<CultivationBed> {
    const cultivationBed = await this.findOne(id);
    
    // Mettre à jour les propriétés simples
    if (updateCultivationBedDto.name !== undefined) cultivationBed.name = updateCultivationBedDto.name;
    if (updateCultivationBedDto.description !== undefined) cultivationBed.description = updateCultivationBedDto.description;
    if (updateCultivationBedDto.length !== undefined) cultivationBed.length = updateCultivationBedDto.length;
    if (updateCultivationBedDto.width !== undefined) cultivationBed.width = updateCultivationBedDto.width;
    if (updateCultivationBedDto.area !== undefined) cultivationBed.area = updateCultivationBedDto.area;
    if (updateCultivationBedDto.soil_type !== undefined) cultivationBed.soilType = updateCultivationBedDto.soil_type;
    if (updateCultivationBedDto.ph_level !== undefined) cultivationBed.phLevel = updateCultivationBedDto.ph_level;
    if (updateCultivationBedDto.fertility_level !== undefined) cultivationBed.fertilityLevel = updateCultivationBedDto.fertility_level;
    if (updateCultivationBedDto.drainage_level !== undefined) cultivationBed.drainageLevel = updateCultivationBedDto.drainage_level;
    if (updateCultivationBedDto.orientation !== undefined) cultivationBed.orientation = updateCultivationBedDto.orientation;
    if (updateCultivationBedDto.commentary !== undefined) cultivationBed.commentary = updateCultivationBedDto.commentary;
    
    // Mettre à jour l'espace de culture si spécifié
    if (updateCultivationBedDto.cultivation_space_id !== undefined) {
      const cultivationSpace = await this.cultivationSpaceRepository.findOne({
        where: { id: updateCultivationBedDto.cultivation_space_id },
      });
      
      if (!cultivationSpace) {
        throw new NotFoundException(`Espace de culture avec l'ID ${updateCultivationBedDto.cultivation_space_id} non trouvé`);
      }
      
      cultivationBed.cultivationSpaceId = updateCultivationBedDto.cultivation_space_id;
    }
    
    return this.cultivationBedRepository.save(cultivationBed);
  }

  /**
   * Supprime une planche de culture
   * 
   * @param {string} id - ID de la planche de culture à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si la planche de culture n'existe pas
   */
  async remove(id: string): Promise<void> {
    const cultivationBed = await this.findOne(id);
    await this.cultivationBedRepository.remove(cultivationBed);
  }
}
