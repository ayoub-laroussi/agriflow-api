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

describe('AgriculturalActionController', () => {
  let controller: AgriculturalActionController;
  let service: AgriculturalActionService;

  const mockService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    findByDateRange: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgriculturalActionController],
      providers: [
        {
          provide: AgriculturalActionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AgriculturalActionController>(AgriculturalActionController);
    service = module.get<AgriculturalActionService>(AgriculturalActionService);
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
      vi.spyOn(service, 'create').mockResolvedValue(mockAction);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockAction);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    const mockActions = [
      { id: '1', type: 'plantation' },
      { id: '2', type: 'arrosage' },
    ];

    it('devrait retourner toutes les actions agricoles', async () => {
      vi.spyOn(service, 'findAll').mockResolvedValue(mockActions);

      const result = await controller.findAll();

      expect(result).toEqual(mockActions);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const mockAction = { id: '1', type: 'plantation' };

    it('devrait retourner une action agricole par son ID', async () => {
      vi.spyOn(service, 'findOne').mockResolvedValue(mockAction);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockAction);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    const updateDto: UpdateAgriculturalActionDto = {
      type: 'arrosage',
      commentary: 'Updated action',
    };

    const mockUpdatedAction = { id: '1', ...updateDto };

    it('devrait mettre à jour une action agricole', async () => {
      vi.spyOn(service, 'update').mockResolvedValue(mockUpdatedAction);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(mockUpdatedAction);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une action agricole', async () => {
      vi.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('findByDateRange', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const mockActions = [
      { id: '1', type: 'plantation', actionDate: new Date('2024-06-01') },
      { id: '2', type: 'arrosage', actionDate: new Date('2024-06-15') },
    ];

    it('devrait retourner les actions dans la période spécifiée', async () => {
      vi.spyOn(service, 'findByDateRange').mockResolvedValue(mockActions);

      const result = await controller.findByDateRange(startDate, endDate);

      expect(result).toEqual(mockActions);
      expect(service.findByDateRange).toHaveBeenCalledWith(startDate, endDate);
    });
  });
});
