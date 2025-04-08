/**
 * Service de gestion des statuts de culture
 * 
 * Ce service gère toutes les opérations liées aux statuts de culture,
 * incluant la création, la lecture, la mise à jour et la suppression des statuts.
 * Il gère également l'initialisation des statuts prédéfinis au démarrage de l'application.
 * 
 * @module CropStatusService
 */
import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropStatus } from './entities/crop-status.entity';
import { CreateCropStatusDto } from './dto/create-crop-status.dto';
import { UpdateCropStatusDto } from './dto/update-crop-status.dto';

/**
 * Service de gestion des statuts de culture
 */
@Injectable()
export class CropStatusService {
  private readonly logger = new Logger(CropStatusService.name);

  constructor(
    @InjectRepository(CropStatus)
    private readonly cropStatusRepository: Repository<CropStatus>,
  ) {}

  /**
   * Initialise les statuts prédéfinis au démarrage de l'application
   */
  async initializePredefinedStatuses(): Promise<void> {
    const predefinedStatuses = [
      {
        name: 'En cours',
        description: 'Culture en cours de développement',
        color: '#4CAF50',
        displayOrder: 1,
        isPredefined: true,
      },
      {
        name: 'Terminé',
        description: 'Culture terminée avec succès',
        color: '#2196F3',
        displayOrder: 2,
        isPredefined: true,
      },
      {
        name: 'En pause',
        description: 'Culture temporairement mise en pause',
        color: '#FFC107',
        displayOrder: 3,
        isPredefined: true,
      },
      {
        name: 'Annulé',
        description: 'Culture annulée',
        color: '#F44336',
        displayOrder: 4,
        isPredefined: true,
      },
    ];

    for (const status of predefinedStatuses) {
      const existingStatus = await this.cropStatusRepository.findOne({
        where: { name: status.name },
      });

      if (!existingStatus) {
        await this.cropStatusRepository.save(status);
        this.logger.log(`Statut prédéfini créé: ${status.name}`);
      }
    }
  }

  /**
   * Crée un nouveau statut de culture
   */
  async create(createCropStatusDto: CreateCropStatusDto): Promise<CropStatus> {
    const existingStatus = await this.cropStatusRepository.findOne({
      where: { name: createCropStatusDto.name },
    });

    if (existingStatus) {
      throw new ConflictException(`Un statut avec le nom "${createCropStatusDto.name}" existe déjà`);
    }

    const cropStatus = this.cropStatusRepository.create(createCropStatusDto);
    return this.cropStatusRepository.save(cropStatus);
  }

  /**
   * Récupère tous les statuts de culture
   */
  async findAll(): Promise<CropStatus[]> {
    return this.cropStatusRepository.find({
      order: { displayOrder: 'ASC' },
    });
  }

  /**
   * Récupère un statut de culture par son ID
   */
  async findOne(id: string): Promise<CropStatus> {
    const cropStatus = await this.cropStatusRepository.findOne({
      where: { id },
    });

    if (!cropStatus) {
      throw new NotFoundException(`Statut de culture avec l'ID "${id}" non trouvé`);
    }

    return cropStatus;
  }

  /**
   * Met à jour un statut de culture
   */
  async update(id: string, updateCropStatusDto: UpdateCropStatusDto): Promise<CropStatus> {
    const cropStatus = await this.findOne(id);

    if (cropStatus.isPredefined) {
      throw new ConflictException('Les statuts prédéfinis ne peuvent pas être modifiés');
    }

    if (updateCropStatusDto.name && updateCropStatusDto.name !== cropStatus.name) {
      const existingStatus = await this.cropStatusRepository.findOne({
        where: { name: updateCropStatusDto.name },
      });

      if (existingStatus) {
        throw new ConflictException(`Un statut avec le nom "${updateCropStatusDto.name}" existe déjà`);
      }
    }

    Object.assign(cropStatus, updateCropStatusDto);
    return this.cropStatusRepository.save(cropStatus);
  }

  /**
   * Supprime un statut de culture
   */
  async remove(id: string): Promise<void> {
    const cropStatus = await this.findOne(id);

    if (cropStatus.isPredefined) {
      throw new ConflictException('Les statuts prédéfinis ne peuvent pas être supprimés');
    }

    await this.cropStatusRepository.remove(cropStatus);
  }
} 