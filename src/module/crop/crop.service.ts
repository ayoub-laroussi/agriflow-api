/**
 * Service de gestion des cultures
 * 
 * Ce service gère la logique métier et l'accès aux données pour les cultures.
 * Il offre des fonctionnalités de création, récupération, mise à jour et suppression
 * de cultures.
 * 
 * @module CropService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../cultivation-bed/entities/cultivation-bed.entity';
import { CropStatus } from '../crop-status/entities/crop-status.entity';

/**
 * Service responsable de la gestion des cultures
 * 
 * Fournit les méthodes pour manipuler les données des cultures en base
 * et implémente la logique métier associée.
 */
@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
    @InjectRepository(CultivationSpace)
    private cultivationSpaceRepository: Repository<CultivationSpace>,
    @InjectRepository(CultivationBed)
    private cultivationBedRepository: Repository<CultivationBed>,
    @InjectRepository(CropStatus)
    private cropStatusRepository: Repository<CropStatus>,
  ) {}

  /**
   * Crée une nouvelle culture
   * 
   * @param {CreateCropDto} createCropDto - Données pour la création de la culture
   * @returns {Promise<Crop>} La culture créée
   */
  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = new Crop();
    Object.assign(crop, {
      crop_name: createCropDto.name,
      crop_family: createCropDto.plantFamily,
      crop_variety: createCropDto.variety,
      crop_description: createCropDto.commentary,
      crop_growth_time: createCropDto.growthTime,
      crop_planting_depth: createCropDto.plantingDepth,
      crop_spacing: createCropDto.spacing,
      crop_row_spacing: createCropDto.rowSpacing,
      crop_optimal_temperature: createCropDto.optimalTemperature,
      crop_optimal_ph: createCropDto.optimalPh,
      crop_water_needs: createCropDto.waterNeeds,
      crop_sun_exposure: createCropDto.sunExposure,
    });

    // Sauvegarder d'abord la culture sans relations
    const savedCrop = await this.cropRepository.save(crop);

    // Gestion des relations avec les espaces de culture
    if (createCropDto.cultivationSpaceIds?.length) {
      const spaces = await this.cultivationSpaceRepository.findByIds(createCropDto.cultivationSpaceIds);
      const cropToUpdate = await this.cropRepository.findOne({ where: { id_crop: savedCrop.id_crop } });
      
      if (cropToUpdate) {
        cropToUpdate.cultivationSpaces = Promise.resolve(spaces);
        await this.cropRepository.save(cropToUpdate);
      }
    }

    // Récupérer la culture complète avec ses relations
    return this.findOne(savedCrop.id_crop);
  }

  /**
   * Récupère toutes les cultures
   * 
   * @returns {Promise<Crop[]>} Liste de toutes les cultures
   */
  async findAll(): Promise<Crop[]> {
    const crops = await this.cropRepository.find();

    // Charger manuellement les relations lazy pour chaque culture
    for (const crop of crops) {
      crop.cultivationSpaces = this.cropRepository
        .createQueryBuilder('crop')
        .relation(Crop, 'cultivationSpaces')
        .of(crop)
        .loadMany();
    }

    return crops;
  }

  /**
   * Récupère une culture par son ID
   * 
   * @param {string} id - ID de la culture à récupérer
   * @returns {Promise<Crop>} La culture trouvée
   * @throws {NotFoundException} Si la culture n'existe pas
   */
  async findOne(id: string): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id_crop: id }
    });
    
    if (!crop) {
      throw new NotFoundException(`Culture avec l'ID ${id} non trouvé`);
    }

    // Pas besoin de charger manuellement les relations lazy,
    // elles seront chargées à la demande

    return crop;
  }

  /**
   * Met à jour une culture
   * 
   * @param {string} id - ID de la culture à mettre à jour
   * @param {UpdateCropDto} updateCropDto - Données pour la mise à jour
   * @returns {Promise<Crop>} La culture mise à jour
   * @throws {NotFoundException} Si la culture n'existe pas
   */
  async update(id: string, updateCropDto: UpdateCropDto): Promise<Crop> {
    const crop = await this.findOne(id);

    // Mise à jour des propriétés de base
    if (updateCropDto.name !== undefined) crop.crop_name = updateCropDto.name;
    if (updateCropDto.commentary !== undefined) crop.crop_description = updateCropDto.commentary;
    if (updateCropDto.plantFamily !== undefined) crop.crop_family = updateCropDto.plantFamily;
    if (updateCropDto.variety !== undefined) crop.crop_variety = updateCropDto.variety;
    if (updateCropDto.growthTime !== undefined) crop.crop_growth_time = updateCropDto.growthTime;
    if (updateCropDto.plantingDepth !== undefined) crop.crop_planting_depth = updateCropDto.plantingDepth;
    if (updateCropDto.spacing !== undefined) crop.crop_spacing = updateCropDto.spacing;
    if (updateCropDto.rowSpacing !== undefined) crop.crop_row_spacing = updateCropDto.rowSpacing;
    if (updateCropDto.optimalTemperature !== undefined) crop.crop_optimal_temperature = updateCropDto.optimalTemperature;
    if (updateCropDto.optimalPh !== undefined) crop.crop_optimal_ph = updateCropDto.optimalPh;
    if (updateCropDto.waterNeeds !== undefined) crop.crop_water_needs = updateCropDto.waterNeeds;
    if (updateCropDto.sunExposure !== undefined) crop.crop_sun_exposure = updateCropDto.sunExposure;

    // Sauvegarder les changements de base
    await this.cropRepository.save(crop);

    // Mise à jour des relations avec les espaces de culture
    if (updateCropDto.cultivationSpaceIds !== undefined) {
      const spaces = await this.cultivationSpaceRepository.findByIds(updateCropDto.cultivationSpaceIds);
      const cropRelation = this.cropRepository
        .createQueryBuilder()
        .relation(Crop, 'cultivationSpaces')
        .of(crop);
      
      await cropRelation.addAndRemove(spaces, await crop.cultivationSpaces);
    }

    return this.findOne(id);
  }

  /**
   * Supprime une culture
   * 
   * @param {string} id - ID de la culture à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si la culture n'existe pas
   */
  async remove(id: string): Promise<void> {
    const crop = await this.findOne(id);
    await this.cropRepository.remove(crop);
  }
}
