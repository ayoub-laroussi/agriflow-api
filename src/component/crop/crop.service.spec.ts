import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropService } from './crop.service';
import { Crop } from './entities/crop.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

describe('CropService', () => {
  let service: CropService;
  let repository: Repository<Crop>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const mockCrop: Crop = {
    id: '123',
    commentary: 'Commentaire test',
    plantFamily: 'Solanacées',
    variety: 'Tomate cerise',
    plantDate: new Date(),
    status: 'En cours',
    cultivationSpaces: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: getRepositoryToken(Crop),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CropService>(CropService);
    repository = module.get<Repository<Crop>>(getRepositoryToken(Crop));
  });

  describe('create', () => {
    it('devrait créer une nouvelle culture', async () => {
      const createCropDto: CreateCropDto = {
        crop_name: 'Tomate',
        crop_planting_date: new Date(),
        crop_commentary: 'Commentaire test',
        crop_plant_family: 'Solanacées',
        crop_variety: 'Tomate cerise',
        crop_status: 'En cours'
      };

      mockRepository.create.mockReturnValue(mockCrop);
      mockRepository.save.mockResolvedValue(mockCrop);

      const result = await service.create(createCropDto);

      expect(result).toEqual(mockCrop);
      expect(mockRepository.create).toHaveBeenCalledWith(createCropDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les cultures', async () => {
      const crops = [mockCrop];
      mockRepository.find.mockResolvedValue(crops);

      const result = await service.findAll();

      expect(result).toEqual(crops);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner une culture par son ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockCrop);

      const result = await service.findOne('123');

      expect(result).toEqual(mockCrop);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });
    });

    it('devrait lancer une exception si la culture n\'est pas trouvée', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une culture', async () => {
      const updateCropDto: UpdateCropDto = {
        crop_name: 'Tomate mise à jour',
        crop_status: 'Terminé'
      };

      mockRepository.findOne.mockResolvedValue(mockCrop);
      mockRepository.save.mockResolvedValue({ ...mockCrop, ...updateCropDto });

      const result = await service.update('123', updateCropDto);

      expect(result).toEqual({ ...mockCrop, ...updateCropDto });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si la culture n\'est pas trouvée', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('123', {} as UpdateCropDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une culture', async () => {
      mockRepository.findOne.mockResolvedValue(mockCrop);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('123');

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it('devrait lancer une exception si la culture n\'est pas trouvée', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('123')).rejects.toThrow(NotFoundException);
    });
  });
}); 