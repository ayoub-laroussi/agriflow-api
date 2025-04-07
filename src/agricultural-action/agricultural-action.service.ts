/**
 * Service de gestion des actions agricoles
 * 
 * Ce service gère la logique métier et l'accès aux données pour les actions agricoles.
 * Il fournit des méthodes pour créer, lire, mettre à jour et supprimer des actions,
 * ainsi que des méthodes spécifiques pour rechercher des actions par date et type.
 * 
 * @module AgriculturalActionService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateAgriculturalActionDto } from './dto/create-agricultural-action.dto';
import { UpdateAgriculturalActionDto } from './dto/update-agricultural-action.dto';
import { AgriculturalAction } from './entities/agricultural-action.entity';
import { CultivationSpace } from '../module/cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../module/cultivation-bed/entities/cultivation-bed.entity';
import { Crop } from '../module/crop/entities/crop.entity';

/**
 * Service de gestion des actions agricoles
 * 
 * Implémente la logique métier pour la manipulation des données des actions agricoles
 * et gère les interactions avec la base de données via TypeORM.
 */
@Injectable()
export class AgriculturalActionService {
  constructor(
    @InjectRepository(AgriculturalAction)
    private agriculturalActionRepository: Repository<AgriculturalAction>,
    @InjectRepository(CultivationSpace)
    private cultivationSpaceRepository: Repository<CultivationSpace>,
    @InjectRepository(CultivationBed)
    private cultivationBedRepository: Repository<CultivationBed>,
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  /**
   * Crée une nouvelle action agricole
   * 
   * @param {CreateAgriculturalActionDto} createAgriculturalActionDto - Données pour la création
   * @returns {Promise<AgriculturalAction>} L'action créée
   * @throws {NotFoundException} Si l'espace, la planche ou la culture spécifiés n'existent pas
   */
  async create(createAgriculturalActionDto: CreateAgriculturalActionDto): Promise<AgriculturalAction> {
    const action = new AgriculturalAction();
    const { 
      cultivationSpaceId, 
      cultivationBedId, 
      cropId, 
      ...actionData 
    } = createAgriculturalActionDto;

    // Vérifier et récupérer les relations si spécifiées
    if (cultivationSpaceId) {
      const space = await this.cultivationSpaceRepository.findOne({ where: { id: cultivationSpaceId } });
      if (!space) {
        throw new NotFoundException(`Espace de culture avec l'ID ${cultivationSpaceId} non trouvé`);
      }
      action.cultivationSpace = space;
    }

    if (cultivationBedId) {
      const bed = await this.cultivationBedRepository.findOne({ where: { id: cultivationBedId } });
      if (!bed) {
        throw new NotFoundException(`Planche de culture avec l'ID ${cultivationBedId} non trouvée`);
      }
      action.cultivationBed = bed;
    }

    if (cropId) {
      const crop = await this.cropRepository.findOne({ where: { id: cropId } });
      if (!crop) {
        throw new NotFoundException(`Culture avec l'ID ${cropId} non trouvée`);
      }
      action.crop = crop;
    }

    // Assigner les données de l'action
    Object.assign(action, actionData);
    
    return await this.agriculturalActionRepository.save(action);
  }

  /**
   * Récupère toutes les actions agricoles avec leurs relations
   * 
   * @returns {Promise<AgriculturalAction[]>} Liste de toutes les actions
   */
  findAll(): Promise<AgriculturalAction[]> {
    return this.agriculturalActionRepository.find({
      relations: ['cultivationSpace', 'cultivationBed', 'crop'],
    });
  }

  /**
   * Récupère une action agricole par son ID
   * 
   * @param {string} id - ID de l'action à récupérer
   * @returns {Promise<AgriculturalAction>} L'action trouvée
   * @throws {NotFoundException} Si l'action n'existe pas
   */
  async findOne(id: string): Promise<AgriculturalAction> {
    const action = await this.agriculturalActionRepository.findOne({
      where: { id },
      relations: ['cultivationSpace', 'cultivationBed', 'crop'],
    });
    if (!action) {
      throw new NotFoundException(`Action agricole avec l'ID ${id} non trouvée`);
    }
    return action;
  }

  /**
   * Met à jour une action agricole
   * 
   * @param {string} id - ID de l'action à mettre à jour
   * @param {UpdateAgriculturalActionDto} updateAgriculturalActionDto - Données pour la mise à jour
   * @returns {Promise<AgriculturalAction>} L'action mise à jour
   * @throws {NotFoundException} Si l'action n'existe pas
   */
  async update(id: string, updateAgriculturalActionDto: UpdateAgriculturalActionDto): Promise<AgriculturalAction> {
    const action = await this.findOne(id);
    const { 
      cultivationSpaceId, 
      cultivationBedId, 
      cropId, 
      ...updateData 
    } = updateAgriculturalActionDto;

    // Mettre à jour les relations si spécifiées
    if (cultivationSpaceId) {
      const space = await this.cultivationSpaceRepository.findOne({ where: { id: cultivationSpaceId } });
      if (!space) {
        throw new NotFoundException(`Espace de culture avec l'ID ${cultivationSpaceId} non trouvé`);
      }
      action.cultivationSpace = space;
    }

    if (cultivationBedId) {
      const bed = await this.cultivationBedRepository.findOne({ where: { id: cultivationBedId } });
      if (!bed) {
        throw new NotFoundException(`Planche de culture avec l'ID ${cultivationBedId} non trouvée`);
      }
      action.cultivationBed = bed;
    }

    if (cropId) {
      const crop = await this.cropRepository.findOne({ where: { id: cropId } });
      if (!crop) {
        throw new NotFoundException(`Culture avec l'ID ${cropId} non trouvée`);
      }
      action.crop = crop;
    }

    // Mettre à jour les données de l'action
    Object.assign(action, updateData);
    
    return await this.agriculturalActionRepository.save(action);
  }

  /**
   * Supprime une action agricole
   * 
   * @param {string} id - ID de l'action à supprimer
   * @returns {Promise<void>}
   */
  async remove(id: string): Promise<void> {
    await this.agriculturalActionRepository.delete(id);
  }

  /**
   * Récupère les actions agricoles pour une période donnée
   * 
   * @param {Date} startDate - Date de début de la période
   * @param {Date} endDate - Date de fin de la période
   * @returns {Promise<AgriculturalAction[]>} Liste des actions dans la période
   */
  async findByDateRange(startDate: Date, endDate: Date): Promise<AgriculturalAction[]> {
    return this.agriculturalActionRepository.find({
      where: {
        actionDate: Between(startDate, endDate),
      },
      relations: ['cultivationSpace', 'cultivationBed', 'crop'],
    });
  }
}
