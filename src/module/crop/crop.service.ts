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
      name: createCropDto.name,
      commentary: createCropDto.commentary,
      plantFamily: createCropDto.plantFamily,
      variety: createCropDto.variety,
      plantDate: createCropDto.plantDate,
      statusId: createCropDto.statusId,
    });

    // Sauvegarder d'abord la culture sans relations
    const savedCrop = await this.cropRepository.save(crop);

    // Gestion des relations avec les espaces de culture
    if (createCropDto.cultivationSpaceIds?.length) {
      const spaces = await this.cultivationSpaceRepository.findByIds(createCropDto.cultivationSpaceIds);
      const cropToUpdate = await this.cropRepository.findOne({ where: { id: savedCrop.id } });
      
      if (cropToUpdate) {
        cropToUpdate.cultivationSpaces = Promise.resolve(spaces);
        await this.cropRepository.save(cropToUpdate);
      }
    }

    // Gestion des relations avec les planches de culture
    if (createCropDto.cultivationBedIds?.length) {
      const beds = await this.cultivationBedRepository.findByIds(createCropDto.cultivationBedIds);
      const cropToUpdate = await this.cropRepository.findOne({ where: { id: savedCrop.id } });
      
      if (cropToUpdate) {
        cropToUpdate.cultivationBeds = Promise.resolve(beds);
        await this.cropRepository.save(cropToUpdate);
      }
    }

    // Récupérer la culture complète avec ses relations
    return this.findOne(savedCrop.id);
  }

  /**
   * Récupère toutes les cultures
   * 
   * @returns {Promise<Crop[]>} Liste de toutes les cultures
   */
  async findAll(): Promise<Crop[]> {
    const crops = await this.cropRepository.find({
      relations: {
        status: true
      }
    });

    // Charger manuellement les relations lazy pour chaque culture
    for (const crop of crops) {
      crop.cultivationSpaces = this.cropRepository
        .createQueryBuilder('crop')
        .relation(Crop, 'cultivationSpaces')
        .of(crop)
        .loadMany();
      
      crop.cultivationBeds = this.cropRepository
        .createQueryBuilder('crop')
        .relation(Crop, 'cultivationBeds')
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
      where: { id },
      relations: {
        status: true
      }
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
    if (updateCropDto.name !== undefined) crop.name = updateCropDto.name;
    if (updateCropDto.commentary !== undefined) crop.commentary = updateCropDto.commentary;
    if (updateCropDto.plantFamily !== undefined) crop.plantFamily = updateCropDto.plantFamily;
    if (updateCropDto.variety !== undefined) crop.variety = updateCropDto.variety;
    if (updateCropDto.plantDate !== undefined) crop.plantDate = updateCropDto.plantDate;
    if (updateCropDto.statusId !== undefined) crop.statusId = updateCropDto.statusId;

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

    // Mise à jour des relations avec les planches de culture
    if (updateCropDto.cultivationBedIds !== undefined) {
      const beds = await this.cultivationBedRepository.findByIds(updateCropDto.cultivationBedIds);
      const cropRelation = this.cropRepository
        .createQueryBuilder()
        .relation(Crop, 'cultivationBeds')
        .of(crop);
      
      await cropRelation.addAndRemove(beds, await crop.cultivationBeds);
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
