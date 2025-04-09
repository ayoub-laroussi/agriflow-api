/**
 * Service de gestion des zones
 * 
 * Ce service fournit les méthodes nécessaires pour gérer les zones,
 * incluant la création, la récupération, la mise à jour et la suppression.
 * 
 * @module AreaService
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';

/**
 * Service de gestion des zones
 */
@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  /**
   * Crée une nouvelle zone
   * 
   * @param createAreaDto DTO contenant les données de la zone à créer
   * @returns La zone créée
   */
  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const area = this.areaRepository.create(createAreaDto);
    return await this.areaRepository.save(area);
  }

  /**
   * Récupère toutes les zones
   * 
   * @returns Toutes les zones
   */
  async findAll(): Promise<Area[]> {
    return await this.areaRepository.find();
  }

  /**
   * Récupère une zone par son ID
   * 
   * @param id ID de la zone à récupérer
   * @returns La zone trouvée
   * @throws NotFoundException si la zone n'est pas trouvée
   */
  async findOne(id: string): Promise<Area> {
    const area = await this.areaRepository.findOneBy({ id_area: id });
    
    if (!area) {
      throw new NotFoundException(`Zone avec l'ID ${id} non trouvée`);
    }
    
    return area;
  }

  /**
   * Met à jour une zone
   * 
   * @param id ID de la zone à mettre à jour
   * @param updateAreaDto DTO contenant les données à mettre à jour
   * @returns La zone mise à jour
   * @throws NotFoundException si la zone n'est pas trouvée
   */
  async update(id: string, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const area = await this.findOne(id);
    
    this.areaRepository.merge(area, updateAreaDto);
    return await this.areaRepository.save(area);
  }

  /**
   * Supprime une zone
   * 
   * @param id ID de la zone à supprimer
   * @returns Les informations sur la suppression
   * @throws NotFoundException si la zone n'est pas trouvée
   */
  async remove(id: string): Promise<{ message: string; statusCode: number }> {
    const area = await this.findOne(id);
    
    await this.areaRepository.remove(area);
    
    return {
      message: `La zone avec l'ID ${id} a été supprimée avec succès`,
      statusCode: 200,
    };
  }
}
