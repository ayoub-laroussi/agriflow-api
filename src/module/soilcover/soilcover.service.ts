/**
 * Service de gestion des couvertures de sol
 * 
 * Ce service gère la logique métier et l'accès aux données pour les couvertures de sol.
 * Il offre des fonctionnalités de création, récupération, mise à jour et suppression
 * de couvertures de sol.
 * 
 * @module SoilCoverService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoilCoverDto } from './dto/create-soilcover.dto';
import { UpdateSoilCoverDto } from './dto/update-soilcover.dto';
import { SoilCover } from './entities/soilcover.entity';

/**
 * Service responsable de la gestion des couvertures de sol
 * 
 * Fournit les méthodes pour manipuler les données des couvertures de sol en base
 * et implémente la logique métier associée.
 */
@Injectable()
export class SoilCoverService {
  constructor(
    @InjectRepository(SoilCover)
    private soilCoverRepository: Repository<SoilCover>,
  ) {}

  /**
   * Crée une nouvelle couverture de sol
   * 
   * @param {CreateSoilCoverDto} createSoilCoverDto - Données pour la création de la couverture de sol
   * @returns {Promise<SoilCover>} La couverture de sol créée
   */
  async create(createSoilCoverDto: CreateSoilCoverDto): Promise<SoilCover> {
    const soilCover = new SoilCover();
    Object.assign(soilCover, createSoilCoverDto);
    return await this.soilCoverRepository.save(soilCover);
  }

  /**
   * Récupère toutes les couvertures de sol
   * 
   * @returns {Promise<SoilCover[]>} Liste de toutes les couvertures de sol
   */
  findAll(): Promise<SoilCover[]> {
    return this.soilCoverRepository.find();
  }

  /**
   * Récupère une couverture de sol par son ID
   * 
   * @param {string} id - ID de la couverture de sol à récupérer
   * @returns {Promise<SoilCover>} La couverture de sol trouvée
   * @throws {NotFoundException} Si la couverture de sol n'existe pas
   */
  async findOne(id: string): Promise<SoilCover> {
    const soilCover = await this.soilCoverRepository.findOne({ where: { id_soil_cover: id } });
    if (!soilCover) {
      throw new NotFoundException(`Couverture de sol avec l'ID ${id} non trouvé`);
    }
    return soilCover;
  }

  /**
   * Met à jour une couverture de sol
   * 
   * @param {string} id - ID de la couverture de sol à mettre à jour
   * @param {UpdateSoilCoverDto} updateSoilCoverDto - Données pour la mise à jour
   * @returns {Promise<SoilCover>} La couverture de sol mise à jour
   * @throws {NotFoundException} Si la couverture de sol n'existe pas
   */
  async update(id: string, updateSoilCoverDto: UpdateSoilCoverDto): Promise<SoilCover> {
    const soilCover = await this.findOne(id);
    Object.assign(soilCover, updateSoilCoverDto);
    return await this.soilCoverRepository.save(soilCover);
  }

  /**
   * Supprime une couverture de sol
   * 
   * @param {string} id - ID de la couverture de sol à supprimer
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si la couverture de sol n'existe pas
   */
  async remove(id: string): Promise<void> {
    const soilCover = await this.findOne(id);
    await this.soilCoverRepository.delete({ id_soil_cover: id });
  }
}
