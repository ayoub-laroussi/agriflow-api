import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandService } from './land.service';
import { Land } from './entities/land.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';

describe('LandService', () => {
  let service: LandService;
  let repository: Repository<Land>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
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
      providers: [
        LandService,
        {
          provide: getRepositoryToken(Land),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LandService>(LandService);
    repository = module.get<Repository<Land>>(getRepositoryToken(Land));
    
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

      mockRepository.create.mockReturnValue(mockLand);
      mockRepository.save.mockResolvedValue(mockLand);

      const result = await service.create(createLandDto);

      expect(result).toEqual(mockLand);
      expect(mockRepository.create).toHaveBeenCalledWith(createLandDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les terrains', async () => {
      const lands = [mockLand];
      mockRepository.find.mockResolvedValue(lands);

      const result = await service.findAll();

      expect(result).toEqual(lands);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['user', 'cultivationSpaces'],
      });
    });
  });

  describe('findOne', () => {
    it('devrait retourner un terrain par son ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockLand);

      const result = await service.findOne('123');

      expect(result).toEqual(mockLand);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_land: '123' },
        relations: ['user', 'cultivationSpaces'],
      });
    });

    it('devrait lancer une exception si le terrain n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un terrain', async () => {
      const updateLandDto: UpdateLandDto = {
        land_name: 'Nouveau Terrain',
        land_area: 2000
      };

      mockRepository.findOne.mockResolvedValue(mockLand);
      mockRepository.save.mockResolvedValue({ ...mockLand, ...updateLandDto });

      const result = await service.update('123', updateLandDto);

      expect(result).toEqual({ ...mockLand, ...updateLandDto });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_land: '123' },
        relations: ['user', 'cultivationSpaces'],
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si le terrain n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('123', {} as UpdateLandDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un terrain', async () => {
      // Le service ne vérifie pas l'existence avant de supprimer
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('123');

      expect(mockRepository.delete).toHaveBeenCalledWith({ id_land: '123' });
    });

    it('devrait toujours tenter de supprimer même si le terrain n\'existe pas', async () => {
      // Le service actuel ne vérifie pas l'existence avant de supprimer
      // et ne lance pas d'exception si l'élément n'existe pas
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.delete.mockResolvedValue({ affected: 0 });
      
      // Simuler le comportement du service
      await service.remove('123');
      
      expect(mockRepository.delete).toHaveBeenCalledWith({ id_land: '123' });
    });
  });

  describe('findByUserId', () => {
    it('devrait retourner les terrains d\'un utilisateur', async () => {
      const lands = [mockLand];
      mockRepository.find.mockResolvedValue(lands);

      const result = await service.findByUserId('456');

      expect(result).toEqual(lands);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { id_user: '456' },
        relations: ['user', 'cultivationSpaces'],
      });
    });
  });
}); 