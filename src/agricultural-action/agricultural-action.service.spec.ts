/**
 * Tests du service d'actions agricoles
 * 
 * Ce fichier contient les tests unitaires pour le service d'actions agricoles.
 * Il teste toutes les méthodes du service, y compris la gestion des erreurs.
 * 
 * @module AgriculturalActionServiceSpec
 */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AgriculturalActionService } from './agricultural-action.service';
import { AgriculturalAction } from './entities/agricultural-action.entity';
import { CultivationSpace } from '../module/cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../module/cultivation-bed/entities/cultivation-bed.entity';
import { Crop } from '../module/crop/entities/crop.entity';
import { CreateAgriculturalActionDto } from './dto/create-agricultural-action.dto';
import { UpdateAgriculturalActionDto } from './dto/update-agricultural-action.dto';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Between } from 'typeorm';
import { AgriculturalActionType } from './entities/agricultural-action.entity';

describe('AgriculturalActionService', () => {
  let service: AgriculturalActionService;
  let agriculturalActionRepository: Repository<AgriculturalAction>;
  let cultivationSpaceRepository: Repository<CultivationSpace>;
  let cultivationBedRepository: Repository<CultivationBed>;
  let cropRepository: Repository<Crop>;

  const mockAgriculturalActionRepository = {
    find: vi.fn(),
    findOne: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
  };

  const mockCultivationSpaceRepository = {
    findOne: vi.fn(),
  };

  const mockCultivationBedRepository = {
    findOne: vi.fn(),
  };

  const mockCropRepository = {
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgriculturalActionService,
        {
          provide: getRepositoryToken(AgriculturalAction),
          useValue: mockAgriculturalActionRepository,
        },
        {
          provide: getRepositoryToken(CultivationSpace),
          useValue: mockCultivationSpaceRepository,
        },
        {
          provide: getRepositoryToken(CultivationBed),
          useValue: mockCultivationBedRepository,
        },
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
      ],
    }).compile();

    service = module.get<AgriculturalActionService>(AgriculturalActionService);
    agriculturalActionRepository = module.get<Repository<AgriculturalAction>>(
      getRepositoryToken(AgriculturalAction),
    );
    cultivationSpaceRepository = module.get<Repository<CultivationSpace>>(
      getRepositoryToken(CultivationSpace),
    );
    cultivationBedRepository = module.get<Repository<CultivationBed>>(
      getRepositoryToken(CultivationBed),
    );
    cropRepository = module.get<Repository<Crop>>(
      getRepositoryToken(Crop),
    );
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreateAgriculturalActionDto = {
      type: 'plantation',
      actionDate: new Date(),
      commentary: 'Test action',
      cultivationSpaceId: 'space-id',
      cultivationBedId: 'bed-id',
      cropId: 'crop-id',
    };

    const mockSpace = { id: 'space-id' };
    const mockBed = { id: 'bed-id' };
    const mockCrop = { id: 'crop-id' };
    const mockAction = { id: 'action-id', ...createDto };

    it('devrait créer une action agricole avec succès', async () => {
      vi.spyOn(cultivationSpaceRepository, 'findOne').mockResolvedValue(mockSpace as any);
      vi.spyOn(cultivationBedRepository, 'findOne').mockResolvedValue(mockBed as any);
      vi.spyOn(cropRepository, 'findOne').mockResolvedValue(mockCrop as any);
      vi.spyOn(agriculturalActionRepository, 'save').mockResolvedValue(mockAction as any);

      const result = await service.create(createDto);

      expect(result).toEqual(mockAction);
      expect(cultivationSpaceRepository.findOne).toHaveBeenCalledWith({
        where: { id: createDto.cultivationSpaceId },
      });
      expect(cultivationBedRepository.findOne).toHaveBeenCalledWith({
        where: { id: createDto.cultivationBedId },
      });
      expect(cropRepository.findOne).toHaveBeenCalledWith({
        where: { id: createDto.cropId },
      });
      expect(agriculturalActionRepository.save).toHaveBeenCalled();
    });

    it('devrait lever une exception si l\'espace de culture n\'existe pas', async () => {
      vi.spyOn(cultivationSpaceRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });

    it('devrait lever une exception si la planche de culture n\'existe pas', async () => {
      vi.spyOn(cultivationSpaceRepository, 'findOne').mockResolvedValue(mockSpace as any);
      vi.spyOn(cultivationBedRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });

    it('devrait lever une exception si la culture n\'existe pas', async () => {
      vi.spyOn(cultivationSpaceRepository, 'findOne').mockResolvedValue(mockSpace as any);
      vi.spyOn(cultivationBedRepository, 'findOne').mockResolvedValue(mockBed as any);
      vi.spyOn(cropRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    const mockActions = [
      { id: '1', type: 'plantation' },
      { id: '2', type: 'arrosage' },
    ];

    it('devrait retourner toutes les actions agricoles', async () => {
      vi.spyOn(agriculturalActionRepository, 'find').mockResolvedValue(mockActions as any);

      const result = await service.findAll();

      expect(result).toEqual(mockActions);
      expect(agriculturalActionRepository.find).toHaveBeenCalledWith({
        relations: ['cultivationSpace', 'cultivationBed', 'crop'],
      });
    });
  });

  describe('findOne', () => {
    const mockAction = { id: '1', type: 'plantation' };

    it('devrait retourner une action agricole par son ID', async () => {
      vi.spyOn(agriculturalActionRepository, 'findOne').mockResolvedValue(mockAction as any);

      const result = await service.findOne('1');

      expect(result).toEqual(mockAction);
      expect(agriculturalActionRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['cultivationSpace', 'cultivationBed', 'crop'],
      });
    });

    it('devrait lever une exception si l\'action n\'existe pas', async () => {
      vi.spyOn(agriculturalActionRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto: UpdateAgriculturalActionDto = {
      type: 'arrosage',
      commentary: 'Updated action',
    };

    const mockAction = { id: '1', type: 'plantation' };
    const mockUpdatedAction = { id: '1', ...updateDto };

    it('devrait mettre à jour une action agricole avec succès', async () => {
      vi.spyOn(agriculturalActionRepository, 'findOne').mockResolvedValue(mockAction as any);
      vi.spyOn(agriculturalActionRepository, 'save').mockResolvedValue(mockUpdatedAction as any);

      const result = await service.update('1', updateDto);

      expect(result).toEqual(mockUpdatedAction);
      expect(agriculturalActionRepository.save).toHaveBeenCalled();
    });

    it('devrait lever une exception si l\'action n\'existe pas', async () => {
      vi.spyOn(agriculturalActionRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update('1', updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une action agricole avec succès', async () => {
      vi.spyOn(agriculturalActionRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.remove('1');

      expect(agriculturalActionRepository.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('findByDateRange', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');
    const mockActions = [
      { id: '1', type: AgriculturalActionType.PLANTATION, actionDate: new Date('2023-06-01') },
      { id: '2', type: AgriculturalActionType.ARROSAGE, actionDate: new Date('2023-06-15') },
    ];

    it('devrait retourner les actions dans la période spécifiée', async () => {
      mockAgriculturalActionRepository.find.mockResolvedValue(mockActions);

      const result = await service.findByDateRange(startDate, endDate);

      expect(result).toEqual(mockActions);
      expect(mockAgriculturalActionRepository.find).toHaveBeenCalledWith({
        where: {
          actionDate: Between(startDate, endDate),
        },
        relations: ['cultivationSpace', 'cultivationBed', 'crop'],
      });
    });
  });

  describe('findByType', () => {
    const actionType = AgriculturalActionType.PLANTATION;
    const mockActions = [
      { id: '1', type: AgriculturalActionType.PLANTATION, actionDate: new Date('2023-06-01') },
      { id: '2', type: AgriculturalActionType.PLANTATION, actionDate: new Date('2023-07-15') },
    ];

    it('devrait retourner les actions du type spécifié', async () => {
      mockAgriculturalActionRepository.find.mockResolvedValue(mockActions);

      const result = await service.findByType(actionType);

      expect(result).toEqual(mockActions);
      expect(mockAgriculturalActionRepository.find).toHaveBeenCalledWith({
        where: { type: actionType },
        relations: ['cultivationSpace', 'cultivationBed', 'crop'],
      });
    });
  });
});
