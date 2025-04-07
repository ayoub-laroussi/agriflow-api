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
  ) {}

  /**
   * Crée une nouvelle culture
   * 
   * @param {CreateCropDto} createCropDto - Données pour la création de la culture
   * @returns {Promise<Crop>} La culture créée
   */
  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = new Crop();
    Object.assign(crop, createCropDto);
    return await this.cropRepository.save(crop);
  }

  /**
   * Récupère toutes les cultures
   * 
   * @returns {Promise<Crop[]>} Liste de toutes les cultures
   */
  findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
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
    });
    if (!crop) {
      throw new NotFoundException(`Culture avec l'ID ${id} non trouvé`);
    }
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
    Object.assign(crop, updateCropDto);
    return await this.cropRepository.save(crop);
  }

  /**
   * Supprime une culture
   * 
   * @param {string} id - ID de la culture à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si la culture n'existe pas
   */
  async remove(id: string): Promise<void> {
    await this.cropRepository.delete({ id });
  }
}
