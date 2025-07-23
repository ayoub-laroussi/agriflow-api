/**
 * Service de gestion des observations
 * 
 * Ce service gère la logique métier et l'accès aux données pour les observations.
 * Il fournit des méthodes pour créer, récupérer, mettre à jour et supprimer des observations,
 * ainsi que des méthodes spécifiques pour rechercher des observations par date, espace de culture ou terrain.
 * 
 * @module ObservationService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { Land } from '../land/entities/land.entity';

/**
 * Service responsable de la gestion des observations
 * 
 * Fournit les méthodes pour manipuler les données des observations en base
 * et implémente la logique métier associée.
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
   * @param {CreateObservationDto} createObservationDto - Données pour la création de l'observation
   * @returns {Promise<Observation>} L'observation créée
   * @throws {NotFoundException} Si l'espace de culture ou le terrain spécifié n'existe pas
   */
  async create(createObservationDto: CreateObservationDto): Promise<Observation> {
    const observation = new Observation();
    Object.assign(observation, createObservationDto);
    
    // Vérifier et associer l'espace de culture si spécifié
    if (createObservationDto.cultivationSpaceId) {
      const cultivationSpace = await this.cultivationSpaceRepository.findOne({
        where: { id: createObservationDto.cultivationSpaceId }
      });
      
      if (!cultivationSpace) {
        throw new NotFoundException(`Espace de culture avec l'ID ${createObservationDto.cultivationSpaceId} non trouvé`);
      }
      
      observation.cultivationSpace = cultivationSpace;
      observation.isLandObservation = false;
    } 
    // Vérifier et associer le terrain si spécifié
    else if (createObservationDto.landId) {
      const land = await this.landRepository.findOne({
        where: { id_land: createObservationDto.landId }
      });
      
      if (!land) {
        throw new NotFoundException(`Terrain avec l'ID ${createObservationDto.landId} non trouvé`);
      }
      
      observation.land = land;
      observation.isLandObservation = true;
    } else {
      throw new NotFoundException('Une observation doit être associée soit à un espace de culture, soit à un terrain');
    }
    
    return this.observationRepository.save(observation);
  }

  /**
   * Récupère toutes les observations
   * 
   * @returns {Promise<Observation[]>} Liste de toutes les observations
   */
  async findAll(): Promise<Observation[]> {
    return this.observationRepository.find({
      relations: ['cultivationSpace', 'land']
    });
  }

  /**
   * Récupère une observation par son ID
   * 
   * @param {string} id - ID de l'observation à récupérer
   * @returns {Promise<Observation>} L'observation trouvée
   * @throws {NotFoundException} Si l'observation n'existe pas
   */
  async findOne(id: string): Promise<Observation> {
    const observation = await this.observationRepository.findOne({
      where: { id },
      relations: ['cultivationSpace', 'land']
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
   */
  async update(id: string, updateObservationDto: UpdateObservationDto): Promise<Observation> {
    let observation = await this.findOne(id);
    
    // Mettre à jour les propriétés simples
    if (updateObservationDto.description !== undefined) observation.description = updateObservationDto.description;
    if (updateObservationDto.observationDate !== undefined) observation.observationDate = new Date(updateObservationDto.observationDate);
    if (updateObservationDto.temperature !== undefined) observation.temperature = updateObservationDto.temperature;
    if (updateObservationDto.humidity !== undefined) observation.humidity = updateObservationDto.humidity;
    if (updateObservationDto.precipitation !== undefined) observation.precipitation = updateObservationDto.precipitation;
    if (updateObservationDto.windSpeed !== undefined) observation.windSpeed = updateObservationDto.windSpeed;
    if (updateObservationDto.windDirection !== undefined) observation.windDirection = updateObservationDto.windDirection;
    if (updateObservationDto.pressure !== undefined) observation.pressure = updateObservationDto.pressure;
    if (updateObservationDto.weatherCondition !== undefined) observation.weatherCondition = updateObservationDto.weatherCondition;
    
    // Mettre à jour les relations
    if (updateObservationDto.cultivationSpaceId !== undefined) {
      const cultivationSpace = await this.cultivationSpaceRepository.findOne({
        where: { id: updateObservationDto.cultivationSpaceId }
      });
      
      if (!cultivationSpace) {
        throw new NotFoundException(`Espace de culture avec l'ID ${updateObservationDto.cultivationSpaceId} non trouvé`);
      }
      
      // Mise à jour directe en base de données
      await this.observationRepository.update(id, {
        cultivationSpaceId: updateObservationDto.cultivationSpaceId,
        landId: '',
        isLandObservation: false
      });
      
      // Recharger l'entité complètement
      observation = await this.findOne(id);
    } else if (updateObservationDto.landId !== undefined) {
      const land = await this.landRepository.findOne({
        where: { id_land: updateObservationDto.landId }
      });
      
      if (!land) {
        throw new NotFoundException(`Terrain avec l'ID ${updateObservationDto.landId} non trouvé`);
      }
      
      // Mise à jour directe en base de données
      await this.observationRepository.update(id, {
        landId: updateObservationDto.landId,
        cultivationSpaceId: '',
        isLandObservation: true
      });
      
      // Recharger l'entité complètement
      observation = await this.findOne(id);
    }
    
    return observation;
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

  /**
   * Récupère les observations pour une période donnée
   * 
   * @param {Date} startDate - Date de début de la période
   * @param {Date} endDate - Date de fin de la période
   * @returns {Promise<Observation[]>} Liste des observations dans la période
   */
  async findByDateRange(startDate: Date, endDate: Date): Promise<Observation[]> {
    return this.observationRepository.find({
      where: {
        observationDate: Between(startDate, endDate)
      },
      relations: ['cultivationSpace', 'land']
    });
  }

  /**
   * Récupère les observations pour un espace de culture donné
   * 
   * @param {string} cultivationSpaceId - ID de l'espace de culture
   * @returns {Promise<Observation[]>} Liste des observations de l'espace de culture
   * @throws {NotFoundException} Si l'espace de culture n'existe pas
   */
  async findByCultivationSpace(cultivationSpaceId: string): Promise<Observation[]> {
    // Vérifier que l'espace de culture existe
    const cultivationSpace = await this.cultivationSpaceRepository.findOne({
      where: { id: cultivationSpaceId }
    });
    
    if (!cultivationSpace) {
      throw new NotFoundException(`Espace de culture avec l'ID ${cultivationSpaceId} non trouvé`);
    }
    
    return this.observationRepository.find({
      where: {
        cultivationSpace: { id: cultivationSpaceId },
        isLandObservation: false
      },
      relations: ['cultivationSpace']
    });
  }

  /**
   * Récupère les observations pour un terrain donné
   * 
   * @param {string} landId - ID du terrain
   * @returns {Promise<Observation[]>} Liste des observations du terrain
   * @throws {NotFoundException} Si le terrain n'existe pas
   */
  async findByLand(landId: string): Promise<Observation[]> {
    // Vérifier que le terrain existe
    const land = await this.landRepository.findOne({
      where: { id_land: landId }
    });
    
    if (!land) {
      throw new NotFoundException(`Terrain avec l'ID ${landId} non trouvé`);
    }
    
    return this.observationRepository.find({
      where: {
        land: { id_land: landId },
        isLandObservation: true
      },
      relations: ['land']
    });
  }
}
