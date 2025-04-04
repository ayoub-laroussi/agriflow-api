import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';

describe('CropController', () => {
  let controller: CropController;

  const mockCropService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  const mockCrop = {
    id: '123',
    crop_name: 'Tomate', 
    crop_commentary: 'Commentaire de test',
    crop_plant_family: 'Famille Test',
    crop_variety: 'Variété Test',
    crop_plant_date: new Date(),
    crop_status: 'En cours',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [
        {
          provide: CropService,
          useValue: mockCropService,
        },
      ],
    }).compile();

    controller = module.get<CropController>(CropController);
    
    // Ajouter manuellement le service au contrôleur
    Object.defineProperty(controller, 'cropService', {
      value: mockCropService,
      writable: true,
    });
    
    // Réinitialiser les mocks
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('devrait créer une nouvelle culture', async () => {
      const createCropDto = {
        crop_name: 'Tomate',
        crop_commentary: 'Commentaire de test',
        crop_plant_family: 'Famille Test',
        crop_variety: 'Variété Test',
        crop_plant_date: new Date(),
        crop_status: 'En cours',
      };

      mockCropService.create.mockResolvedValue(mockCrop);

      const result = await controller.create(createCropDto);

      expect(result).toEqual(mockCrop);
      expect(mockCropService.create).toHaveBeenCalledWith(createCropDto);
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les cultures', async () => {
      const crops = [mockCrop];
      mockCropService.findAll.mockResolvedValue(crops);

      const result = await controller.findAll();

      expect(result).toEqual(crops);
      expect(mockCropService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner une culture par son ID', async () => {
      mockCropService.findOne.mockResolvedValue(mockCrop);

      const result = await controller.findOne('123');

      expect(result).toEqual(mockCrop);
      expect(mockCropService.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une culture', async () => {
      const updateCropDto = {
        crop_status: 'Terminé',
        crop_commentary: 'Nouveau commentaire',
      };

      const updatedCrop = { ...mockCrop, ...updateCropDto };
      mockCropService.update.mockResolvedValue(updatedCrop);

      const result = await controller.update('123', updateCropDto);

      expect(result).toEqual(updatedCrop);
      expect(mockCropService.update).toHaveBeenCalledWith('123', updateCropDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une culture', async () => {
      mockCropService.remove.mockResolvedValue(undefined);

      await controller.remove('123');

      expect(mockCropService.remove).toHaveBeenCalledWith('123');
    });
  });
}); 