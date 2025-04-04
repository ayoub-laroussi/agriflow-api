import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { LandController } from './land.controller';
import { LandService } from './land.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { Land } from './entities/land.entity';

describe('LandController', () => {
  let controller: LandController;

  const mockLandService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    findByUserId: vi.fn(),
  };

  const mockLand: Land = {
    id_land: '123',
    land_name: 'Terrain Test',
    land_area: 1000,
    land_coordinate: 48.8566,
    id_user: '456',
    user: {} as any,
    cultivationSpaces: [],
    land_creation_date: new Date(),
    land_modification_date: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandController],
      providers: [
        {
          provide: LandService,
          useValue: mockLandService,
        },
      ],
    }).compile();

    controller = module.get<LandController>(LandController);
    
    // Ajouter manuellement le service au contrôleur
    Object.defineProperty(controller, 'landService', {
      value: mockLandService,
      writable: true,
    });
    
    // Réinitialiser les mocks
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('devrait créer un nouveau terrain', async () => {
      const createLandDto: CreateLandDto = {
        land_name: 'Terrain Test',
        land_area: 1000,
        land_coordinate: 48.8566,
        id_user: '456'
      };

      mockLandService.create.mockResolvedValue(mockLand);

      const result = await controller.create(createLandDto);

      expect(result).toEqual(mockLand);
      expect(mockLandService.create).toHaveBeenCalledWith(createLandDto);
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les terrains', async () => {
      const lands = [mockLand];
      mockLandService.findAll.mockResolvedValue(lands);

      const result = await controller.findAll();

      expect(result).toEqual(lands);
      expect(mockLandService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un terrain par son ID', async () => {
      mockLandService.findOne.mockResolvedValue(mockLand);

      const result = await controller.findOne('123');

      expect(result).toEqual(mockLand);
      expect(mockLandService.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un terrain', async () => {
      const updateLandDto: UpdateLandDto = {
        land_name: 'Nouveau Terrain',
        land_area: 2000
      };

      mockLandService.update.mockResolvedValue({ ...mockLand, ...updateLandDto });

      const result = await controller.update('123', updateLandDto);

      expect(result).toEqual({ ...mockLand, ...updateLandDto });
      expect(mockLandService.update).toHaveBeenCalledWith('123', updateLandDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un terrain', async () => {
      mockLandService.remove.mockResolvedValue(undefined);

      await controller.remove('123');

      expect(mockLandService.remove).toHaveBeenCalledWith('123');
    });
  });

  describe('findByUserId', () => {
    it('devrait retourner les terrains d\'un utilisateur', async () => {
      const lands = [mockLand];
      mockLandService.findByUserId.mockResolvedValue(lands);

      const result = await controller.findByUserId('456');

      expect(result).toEqual(lands);
      expect(mockLandService.findByUserId).toHaveBeenCalledWith('456');
    });
  });
}); 