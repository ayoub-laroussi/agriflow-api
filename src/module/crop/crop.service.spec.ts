import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropService } from './crop.service';
import { Crop } from './entities/crop.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { CultivationBed } from '../cultivation-bed/entities/cultivation-bed.entity';
import { CropStatus } from '../crop-status/entities/crop-status.entity';

describe('CropService', () => {
  let service: CropService;
  let cropRepository: Repository<Crop>;
  let cultivationSpaceRepository: Repository<CultivationSpace>;
  let cultivationBedRepository: Repository<CultivationBed>;
  let cropStatusRepository: Repository<CropStatus>;

  const mockCropRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findByIds: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    remove: vi.fn(),
    createQueryBuilder: vi.fn(() => ({
      relation: vi.fn(() => ({
        of: vi.fn(() => ({
          loadMany: vi.fn(),
          addAndRemove: vi.fn(),
        })),
      })),
    })),
  };

  const mockCultivationSpaceRepository = {
    findByIds: vi.fn(),
  };

  const mockCultivationBedRepository = {
    findByIds: vi.fn(),
  };

  const mockCropStatusRepository = {
    findOne: vi.fn(),
  };

  const mockCropStatus = {
    id: '1',
    name: 'En cours',
  };

  const mockCrop = {
    id: '123',
    name: 'Tomate',
    commentary: 'Commentaire test',
    plantFamily: 'Solanacées',
    variety: 'Tomate cerise',
    plantDate: new Date(),
    statusId: '1',
    status: mockCropStatus,
    cultivationSpaces: Promise.resolve([]),
    cultivationBeds: Promise.resolve([]),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
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
          provide: getRepositoryToken(CropStatus),
          useValue: mockCropStatusRepository,
        },
      ],
    }).compile();

    service = module.get<CropService>(CropService);
    cropRepository = module.get<Repository<Crop>>(getRepositoryToken(Crop));
    cultivationSpaceRepository = module.get<Repository<CultivationSpace>>(getRepositoryToken(CultivationSpace));
    cultivationBedRepository = module.get<Repository<CultivationBed>>(getRepositoryToken(CultivationBed));
    cropStatusRepository = module.get<Repository<CropStatus>>(getRepositoryToken(CropStatus));
    
    // Réinitialiser les mocks
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('devrait créer une nouvelle culture', async () => {
      const createCropDto: CreateCropDto = {
        name: 'Tomate',
        plantDate: new Date(),
        commentary: 'Commentaire test',
        plantFamily: 'Solanacées',
        variety: 'Tomate cerise',
        statusId: '1',
        cultivationSpaceIds: [],
        cultivationBedIds: []
      };

      // Le service recherche la culture après l'avoir sauvegardée
      mockCropRepository.save.mockResolvedValue({ id: '123' });
      mockCropRepository.findOne.mockResolvedValue(mockCrop);

      const result = await service.create(createCropDto);

      expect(result).toEqual(mockCrop);
      expect(mockCropRepository.save).toHaveBeenCalled();
      expect(mockCropRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
        relations: { status: true }
      });
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les cultures', async () => {
      const crops = [mockCrop];
      mockCropRepository.find.mockResolvedValue(crops);

      const result = await service.findAll();

      expect(result).toEqual(crops);
      expect(mockCropRepository.find).toHaveBeenCalledWith({
        relations: { status: true }
      });
    });
  });

  describe('findOne', () => {
    it('devrait retourner une culture par son ID', async () => {
      mockCropRepository.findOne.mockResolvedValue(mockCrop);

      const result = await service.findOne('123');

      expect(result).toEqual(mockCrop);
      expect(mockCropRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
        relations: { status: true }
      });
    });

    it('devrait lancer une exception si la culture n\'est pas trouvée', async () => {
      mockCropRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une culture', async () => {
      const updateCropDto: UpdateCropDto = {
        name: 'Tomate mise à jour',
        statusId: '2'
      };

      mockCropRepository.findOne.mockResolvedValueOnce(mockCrop).mockResolvedValueOnce(mockCrop);
      mockCropRepository.save.mockResolvedValue(mockCrop);

      const result = await service.update('123', updateCropDto);

      expect(result).toEqual(mockCrop);
      expect(mockCropRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
        relations: { status: true }
      });
      expect(mockCropRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si la culture n\'est pas trouvée', async () => {
      mockCropRepository.findOne.mockResolvedValue(null);

      await expect(service.update('123', {} as UpdateCropDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une culture', async () => {
      mockCropRepository.findOne.mockResolvedValue(mockCrop);
      mockCropRepository.remove.mockResolvedValue({});

      await service.remove('123');

      expect(mockCropRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
        relations: { status: true }
      });
      expect(mockCropRepository.remove).toHaveBeenCalledWith(mockCrop);
    });
  });
}); 