import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilCoverService } from './soilcover.service';
import { SoilCover } from './entities/soilcover.entity';
import { CreateSoilCoverDto } from './dto/create-soilcover.dto';
import { UpdateSoilCoverDto } from './dto/update-soilcover.dto';
import { NotFoundException } from '@nestjs/common';

describe('SoilCoverService', () => {
  let service: SoilCoverService;
  let repository: Repository<SoilCover>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const mockSoilCover: SoilCover = {
    id_soil_cover: '123',
    type_soil_cover: 'Minéral',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const createSoilCoverDto: CreateSoilCoverDto = {
    type_soil_cover: 'Minéral',
    soilCoverDate: new Date(),
    soilCoverCommentary: 'Description du paillis',
  };

  const updateSoilCoverDto: UpdateSoilCoverDto = {
    type_soil_cover: 'Organique',
    soilCoverDate: new Date(),
    soilCoverCommentary: 'Description mise à jour',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoilCoverService,
        {
          provide: getRepositoryToken(SoilCover),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SoilCoverService>(SoilCoverService);
    repository = module.get<Repository<SoilCover>>(getRepositoryToken(SoilCover));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer une nouvelle couverture du sol', async () => {
      const newSoilCover = new SoilCover();
      Object.assign(newSoilCover, createSoilCoverDto);
      mockRepository.save.mockResolvedValue(mockSoilCover);

      const result = await service.create(createSoilCoverDto);

      expect(result).toEqual(mockSoilCover);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les couvertures du sol', async () => {
      mockRepository.find.mockResolvedValue([mockSoilCover]);

      const result = await service.findAll();

      expect(result).toEqual([mockSoilCover]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner une couverture du sol par son ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockSoilCover);

      const result = await service.findOne('123');

      expect(result).toEqual(mockSoilCover);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_soil_cover: '123' },
      });
    });

    it('devrait lancer une exception si la couverture du sol n\'existe pas', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une couverture du sol', async () => {
      mockRepository.findOne.mockResolvedValue(mockSoilCover);
      mockRepository.save.mockResolvedValue({ ...mockSoilCover, ...updateSoilCoverDto });

      const result = await service.update('123', updateSoilCoverDto);

      expect(result).toEqual({ ...mockSoilCover, ...updateSoilCoverDto });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si la couverture du sol n\'existe pas', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('123', updateSoilCoverDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une couverture du sol', async () => {
      mockRepository.findOne.mockResolvedValue(mockSoilCover);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('123');

      expect(mockRepository.delete).toHaveBeenCalledWith({ id_soil_cover: '123' });
    });

    it('devrait lancer une exception si la couverture du sol n\'existe pas', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('123')).rejects.toThrow(NotFoundException);
    });
  });
}); 