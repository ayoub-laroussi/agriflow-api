import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { CultivationSpaceController } from './cultivation-space.controller';
import { CultivationSpaceService } from './cultivation-space.service';

describe('CultivationSpaceController', () => {
  let controller: CultivationSpaceController;
  let service: CultivationSpaceService;

  const mockCultivationSpaceService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    findByLand: vi.fn(),
  };

  const mockCultivationSpace = {
    id_cultivation_space: '123',
    cultivation_space_name: 'Espace Test',
    cultivation_space_description: 'Description de l\'espace',
    cultivation_space_size: 50,
    cultivation_space_location: 'Location Test',
    cultivation_space_creation_date: new Date(),
    land: {
      id_land: '456',
      land_name: 'Terrain Test',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivationSpaceController],
      providers: [
        {
          provide: CultivationSpaceService,
          useValue: mockCultivationSpaceService,
        },
      ],
    }).compile();

    controller = module.get<CultivationSpaceController>(CultivationSpaceController);
    service = module.get<CultivationSpaceService>(CultivationSpaceService);
  });

  describe('create', () => {
    it('devrait créer un nouvel espace de culture', async () => {
      const createCultivationSpaceDto = {
        cultivation_space_name: 'Espace Test',
        cultivation_space_description: 'Description de l\'espace',
        cultivation_space_size: 50,
        cultivation_space_location: 'Location Test',
        id_land: '456'
      };

      mockCultivationSpaceService.create.mockResolvedValue(mockCultivationSpace);

      const result = await controller.create(createCultivationSpaceDto);

      expect(result).toEqual(mockCultivationSpace);
      expect(mockCultivationSpaceService.create).toHaveBeenCalledWith(createCultivationSpaceDto);
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les espaces de culture', async () => {
      const spaces = [mockCultivationSpace];
      mockCultivationSpaceService.findAll.mockResolvedValue(spaces);

      const result = await controller.findAll();

      expect(result).toEqual(spaces);
      expect(mockCultivationSpaceService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un espace de culture par son ID', async () => {
      mockCultivationSpaceService.findOne.mockResolvedValue(mockCultivationSpace);

      const result = await controller.findOne('123');

      expect(result).toEqual(mockCultivationSpace);
      expect(mockCultivationSpaceService.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un espace de culture', async () => {
      const updateCultivationSpaceDto = {
        cultivation_space_name: 'Nouvel Espace',
        cultivation_space_size: 75,
      };

      const updatedSpace = { ...mockCultivationSpace, ...updateCultivationSpaceDto };
      mockCultivationSpaceService.update.mockResolvedValue(updatedSpace);

      const result = await controller.update('123', updateCultivationSpaceDto);

      expect(result).toEqual(updatedSpace);
      expect(mockCultivationSpaceService.update).toHaveBeenCalledWith('123', updateCultivationSpaceDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un espace de culture', async () => {
      mockCultivationSpaceService.remove.mockResolvedValue(undefined);

      await controller.remove('123');

      expect(mockCultivationSpaceService.remove).toHaveBeenCalledWith('123');
    });
  });

  describe('findByLand', () => {
    it('devrait retourner les espaces de culture d\'un terrain', async () => {
      const spaces = [mockCultivationSpace];
      mockCultivationSpaceService.findByLand.mockResolvedValue(spaces);

      const result = await controller.findByLandId('456');

      expect(result).toEqual(spaces);
      expect(mockCultivationSpaceService.findByLand).toHaveBeenCalledWith('456');
    });
  });
}); 