import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CultivationSpaceService } from './cultivation-space.service';
import { CultivationSpace } from './entities/cultivation-space.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCultivationSpaceDto } from './dto/create-cultivation-space.dto';
import { UpdateCultivationSpaceDto } from './dto/update-cultivation-space.dto';

describe('CultivationSpaceService', () => {
  let service: CultivationSpaceService;
  let repository: Repository<CultivationSpace>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const mockCultivationSpace: CultivationSpace = {
    id: '123',
    name: 'Serre 1',
    description: 'Description de la serre',
    area: 100,
    landId: '456',
    land: {} as any,
    crops: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultivationSpaceService,
        {
          provide: getRepositoryToken(CultivationSpace),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CultivationSpaceService>(CultivationSpaceService);
    repository = module.get<Repository<CultivationSpace>>(getRepositoryToken(CultivationSpace));
  });

  describe('create', () => {
    it('devrait créer un nouvel espace de culture', async () => {
      const createCultivationSpaceDto: CreateCultivationSpaceDto = {
        cultivation_space_name: 'Serre 1',
        cultivation_spaces_area: 100,
        cultivation_spaces_commentary: 'Description de la serre',
        id_land: '456'
      };

      mockRepository.create.mockReturnValue(mockCultivationSpace);
      mockRepository.save.mockResolvedValue(mockCultivationSpace);

      const result = await service.create(createCultivationSpaceDto);

      expect(result).toEqual(mockCultivationSpace);
      expect(mockRepository.create).toHaveBeenCalledWith(createCultivationSpaceDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les espaces de culture', async () => {
      const cultivationSpaces = [mockCultivationSpace];
      mockRepository.find.mockResolvedValue(cultivationSpaces);

      const result = await service.findAll();

      expect(result).toEqual(cultivationSpaces);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un espace de culture par son ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockCultivationSpace);

      const result = await service.findOne('123');

      expect(result).toEqual(mockCultivationSpace);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });
    });

    it('devrait lancer une exception si l\'espace n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un espace de culture', async () => {
      const updateCultivationSpaceDto: UpdateCultivationSpaceDto = {
        cultivation_space_name: 'Serre 2',
        cultivation_spaces_area: 150
      };

      mockRepository.findOne.mockResolvedValue(mockCultivationSpace);
      mockRepository.save.mockResolvedValue({ ...mockCultivationSpace, ...updateCultivationSpaceDto });

      const result = await service.update('123', updateCultivationSpaceDto);

      expect(result).toEqual({ ...mockCultivationSpace, ...updateCultivationSpaceDto });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si l\'espace n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('123', {} as UpdateCultivationSpaceDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un espace de culture', async () => {
      mockRepository.findOne.mockResolvedValue(mockCultivationSpace);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('123');

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it('devrait lancer une exception si l\'espace n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('123')).rejects.toThrow(NotFoundException);
    });
  });
}); 