/**
 * Tests du contrôleur d'actions agricoles
 * 
 * Ce fichier contient les tests unitaires pour le contrôleur d'actions agricoles.
 * Il teste tous les endpoints REST et leurs réponses.
 * 
 * @module AgriculturalActionControllerSpec
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AgriculturalActionController } from './agricultural-action.controller';
import { AgriculturalActionService } from './agricultural-action.service';
import { CreateAgriculturalActionDto } from './dto/create-agricultural-action.dto';
import { UpdateAgriculturalActionDto } from './dto/update-agricultural-action.dto';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AgriculturalActionType } from './entities/agricultural-action.entity';

describe('AgriculturalActionController', () => {
  let controller: AgriculturalActionController;

  const mockAgriculturalActionService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    findByDateRange: vi.fn(),
    findByType: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgriculturalActionController],
      providers: [
        {
          provide: AgriculturalActionService,
          useValue: mockAgriculturalActionService,
        },
      ],
    }).compile();

    controller = module.get<AgriculturalActionController>(AgriculturalActionController);

    // Injection manuelle pour résoudre l'erreur undefined
    Object.defineProperty(controller, 'agriculturalActionService', {
      value: mockAgriculturalActionService,
      writable: true,
    });

    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
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

    const mockAction = { id: '1', ...createDto };

    it('devrait créer une action agricole', async () => {
      mockAgriculturalActionService.create.mockResolvedValue(mockAction);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockAction);
      expect(mockAgriculturalActionService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    const mockActions = [
      { id: '1', type: 'plantation' },
      { id: '2', type: 'arrosage' },
    ];

    it('devrait retourner toutes les actions agricoles', async () => {
      mockAgriculturalActionService.findAll.mockResolvedValue(mockActions);

      const result = await controller.findAll();

      expect(result).toEqual(mockActions);
      expect(mockAgriculturalActionService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const mockAction = { id: '1', type: 'plantation' };

    it('devrait retourner une action agricole par son ID', async () => {
      mockAgriculturalActionService.findOne.mockResolvedValue(mockAction);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockAction);
      expect(mockAgriculturalActionService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    const updateDto: UpdateAgriculturalActionDto = {
      type: 'arrosage',
      commentary: 'Updated action',
    };

    const mockUpdatedAction = { id: '1', ...updateDto };

    it('devrait mettre à jour une action agricole', async () => {
      mockAgriculturalActionService.update.mockResolvedValue(mockUpdatedAction);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(mockUpdatedAction);
      expect(mockAgriculturalActionService.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une action agricole', async () => {
      mockAgriculturalActionService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(mockAgriculturalActionService.remove).toHaveBeenCalledWith('1');
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
      mockAgriculturalActionService.findByDateRange.mockResolvedValue(mockActions);

      const result = await controller.findByDateRange(startDate, endDate);

      expect(result).toEqual(mockActions);
      expect(mockAgriculturalActionService.findByDateRange).toHaveBeenCalledWith(startDate, endDate);
    });
  });

  describe('findByType', () => {
    const actionType = AgriculturalActionType.PLANTATION;
    const mockActions = [
      { id: '1', type: AgriculturalActionType.PLANTATION, actionDate: new Date('2023-06-01') },
      { id: '2', type: AgriculturalActionType.PLANTATION, actionDate: new Date('2023-07-15') },
    ];

    it('devrait retourner les actions du type spécifié', async () => {
      mockAgriculturalActionService.findByType.mockResolvedValue(mockActions);

      const result = await controller.findByType(actionType);

      expect(result).toEqual(mockActions);
      expect(mockAgriculturalActionService.findByType).toHaveBeenCalledWith(actionType);
    });
  });
});
