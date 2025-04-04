import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { CultivationSpaceController } from './cultivation-space.controller';
import { CultivationSpaceService } from './cultivation-space.service';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';

describe('CultivationSpaceController', () => {
  let controller: CultivationSpaceController;

  const mockCultivationSpaceService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    findByLandId: vi.fn(),
  };

  const mockCultivationSpace = {
    id: '123',
    name: 'Espace Test',
    description: 'Description de l\'espace',
    area: 50,
    landId: '456',
    land: {
      id_land: '456',
      land_name: 'Terrain Test',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
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
    
    // Injection manuelle pour résoudre l'erreur undefined
    Object.defineProperty(controller, 'cultivationSpaceService', {
      value: mockCultivationSpaceService,
      writable: true,
    });
  });

  describe('create', () => {
    it('devrait créer un nouvel espace de culture', async () => {
      const createCultivationSpaceDto: CreateCultivationSpaceDto = {
        cultivation_space_name: 'Espace Test',
        cultivation_spaces_commentary: 'Description de l\'espace',
        cultivation_spaces_area: 50,
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
      const updateCultivationSpaceDto: UpdateCultivationSpaceDto = {
        cultivation_space_name: 'Nouvel Espace',
        cultivation_spaces_area: 75,
      };

      const updatedSpace = { ...mockCultivationSpace, name: 'Nouvel Espace', area: 75 };
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
      mockCultivationSpaceService.findByLandId.mockResolvedValue(spaces);

      const result = await controller.findByLandId('456');

      expect(result).toEqual(spaces);
      expect(mockCultivationSpaceService.findByLandId).toHaveBeenCalledWith('456');
    });
  });
}); 