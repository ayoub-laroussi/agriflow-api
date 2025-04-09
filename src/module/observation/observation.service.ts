/**
 * Service de gestion des observations
 * 
 * Ce service gère la logique métier et l'accès aux données pour les observations.
 * Il offre des fonctionnalités de création, récupération, mise à jour et suppression
 * d'observations, ainsi que des recherches spécifiques par date et par relation.
 * 
 * @module ObservationService
 */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { Land } from '../land/entities/land.entity';

/**
 * Service de gestion des observations
 */
@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private observationRepository: Repository<Observation>,
    @InjectRepository(CultivationSpace)
    private cultivationSpaceRepository: Repository<CultivationSpace>,
    @InjectRepository(Land)
    private landRepository: Repository<Land>,
  ) {}

  /**
   * Crée une nouvelle observation
   * 
   * @param {CreateObservationDto} createObservationDto - Données pour la création
   * @returns {Promise<Observation>} L'observation créée
   * @throws {BadRequestException} Si les données sont invalides
   * @throws {NotFoundException} Si l'espace de culture ou le terrain n'existe pas
   */
  async create(createObservationDto: CreateObservationDto): Promise<Observation> {
    const { cultivationSpaceId, landId, isLandObservation, ...observationData } = createObservationDto;
    
    const observation = new Observation();
    Object.assign(observation, observationData);
    
    // Vérifier si l'observation est pour un terrain ou un espace de culture
    observation.isLandObservation = isLandObservation || false;

    // Vérifier que l'observation est liée soit à un espace de culture, soit à un terrain
    if (!cultivationSpaceId && !landId) {
      throw new BadRequestException('L\'observation doit être associée à un espace de culture ou un terrain');
    }

    // Vérifier et récupérer l'espace de culture si spécifié
    if (cultivationSpaceId) {
      const cultivationSpace = await this.cultivationSpaceRepository.findOne({ 
        where: { id: cultivationSpaceId } 
      });
      
      if (!cultivationSpace) {
        throw new NotFoundException(`Espace de culture avec l'ID ${cultivationSpaceId} non trouvé`);
      }
      
      observation.cultivationSpace = cultivationSpace;
      observation.cultivationSpaceId = cultivationSpaceId;
    }

    // Vérifier et récupérer le terrain si spécifié
    if (landId) {
      const land = await this.landRepository.findOne({ 
        where: { id_land: landId } 
      });
      
      if (!land) {
        throw new NotFoundException(`Terrain avec l'ID ${landId} non trouvé`);
      }
      
      observation.land = land;
      observation.landId = landId;
    }

    return await this.observationRepository.save(observation);
  }

  /**
   * Récupère toutes les observations
   * 
   * @returns {Promise<Observation[]>} Liste des observations
   */
  async findAll(): Promise<Observation[]> {
    return await this.observationRepository.find({
      relations: ['cultivationSpace', 'land'],
    });
  }

  /**
   * Récupère les observations par plage de dates
   * 
   * @param {Date} startDate - Date de début
   * @param {Date} endDate - Date de fin
   * @returns {Promise<Observation[]>} Liste des observations dans la plage de dates
   */
  async findByDateRange(startDate: Date, endDate: Date): Promise<Observation[]> {
    return await this.observationRepository.find({
      where: {
        observationDate: Between(startDate, endDate),
      },
      relations: ['cultivationSpace', 'land'],
    });
  }

  /**
   * Récupère les observations pour un espace de culture spécifique
   * 
   * @param {string} cultivationSpaceId - ID de l'espace de culture
   * @returns {Promise<Observation[]>} Liste des observations pour l'espace de culture
   */
  async findByCultivationSpace(cultivationSpaceId: string): Promise<Observation[]> {
    return await this.observationRepository.find({
      where: { cultivationSpaceId },
      relations: ['cultivationSpace'],
    });
  }

  /**
   * Récupère les observations pour un terrain spécifique
   * 
   * @param {string} landId - ID du terrain
   * @returns {Promise<Observation[]>} Liste des observations pour le terrain
   */
  async findByLand(landId: string): Promise<Observation[]> {
    return await this.observationRepository.find({
      where: { landId },
      relations: ['land'],
    });
  }

  /**
   * Récupère une observation par son ID
   * 
   * @param {string} id - ID de l'observation
   * @returns {Promise<Observation>} L'observation trouvée
   * @throws {NotFoundException} Si l'observation n'existe pas
   */
  async findOne(id: string): Promise<Observation> {
    const observation = await this.observationRepository.findOne({
      where: { id },
      relations: ['cultivationSpace', 'land'],
    });
    
    if (!observation) {
      throw new NotFoundException(`Observation avec l'ID ${id} non trouvée`);
    }
    
    return observation;
  }

  /**
   * Met à jour une observation
   * 
   * @param {string} id - ID de l'observation à mettre à jour
   * @param {UpdateObservationDto} updateObservationDto - Données pour la mise à jour
   * @returns {Promise<Observation>} L'observation mise à jour
   * @throws {NotFoundException} Si l'observation n'existe pas
   * @throws {BadRequestException} Si les données sont invalides
   */
  async update(id: string, updateObservationDto: UpdateObservationDto): Promise<Observation> {
    const observation = await this.findOne(id);
    
    const { cultivationSpaceId, landId, isLandObservation, ...observationData } = updateObservationDto;
    
    // Mettre à jour les données de base
    Object.assign(observation, observationData);
    
    // Mettre à jour le type d'observation si spécifié
    if (isLandObservation !== undefined) {
      observation.isLandObservation = isLandObservation;
    }

    // Mettre à jour l'espace de culture si spécifié
    if (cultivationSpaceId) {
      const cultivationSpace = await this.cultivationSpaceRepository.findOne({ 
        where: { id: cultivationSpaceId } 
      });
      
      if (!cultivationSpace) {
        throw new NotFoundException(`Espace de culture avec l'ID ${cultivationSpaceId} non trouvé`);
      }
      
      observation.cultivationSpace = cultivationSpace;
      observation.cultivationSpaceId = cultivationSpaceId;
    }

    // Mettre à jour le terrain si spécifié
    if (landId) {
      const land = await this.landRepository.findOne({ 
        where: { id_land: landId } 
      });
      
      if (!land) {
        throw new NotFoundException(`Terrain avec l'ID ${landId} non trouvé`);
      }
      
      observation.land = land;
      observation.landId = landId;
    }

    // Vérifier que l'observation est toujours liée soit à un espace de culture, soit à un terrain
    if (!observation.cultivationSpaceId && !observation.landId) {
      throw new BadRequestException('L\'observation doit être associée à un espace de culture ou un terrain');
    }

    return await this.observationRepository.save(observation);
  }

  /**
   * Supprime une observation
   * 
   * @param {string} id - ID de l'observation à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si l'observation n'existe pas
   */
  async remove(id: string): Promise<void> {
    const observation = await this.findOne(id);
    await this.observationRepository.remove(observation);
  }
}
