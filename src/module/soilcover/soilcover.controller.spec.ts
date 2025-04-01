import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { SoilCoverController } from './soilcover.controller';
import { SoilCoverService } from './soilcover.service';
import { CreateSoilCoverDto } from './dto/create-soilcover.dto';
import { UpdateSoilCoverDto } from './dto/update-soilcover.dto';
import { SoilCover } from './entities/soilcover.entity';

describe('SoilCoverController', () => {
  let controller: SoilCoverController;
  let soilCoverService: SoilCoverService;

  const mockSoilCover: SoilCover = {
    id_soil_cover: '123',
    type_soil_cover: 'Minéral',
    soilCoverDate: new Date(),
    soilCoverCommentary: 'Description du paillis',
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
      controllers: [SoilCoverController],
      providers: [
        {
          provide: SoilCoverService,
          useValue: {
            create: vi.fn().mockResolvedValue(mockSoilCover),
            findAll: vi.fn().mockResolvedValue([mockSoilCover]),
            findOne: vi.fn().mockResolvedValue(mockSoilCover),
            update: vi.fn().mockResolvedValue(mockSoilCover),
            remove: vi.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<SoilCoverController>(SoilCoverController);
    soilCoverService = module.get<SoilCoverService>(SoilCoverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(soilCoverService).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer une nouvelle couverture du sol', async () => {
      const result = await controller.create(createSoilCoverDto);

      expect(result).toEqual(mockSoilCover);
      expect(soilCoverService.create).toHaveBeenCalledWith(createSoilCoverDto);
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les couvertures du sol', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockSoilCover]);
      expect(soilCoverService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner une couverture du sol par son ID', async () => {
      const result = await controller.findOne('123');

      expect(result).toEqual(mockSoilCover);
      expect(soilCoverService.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une couverture du sol', async () => {
      const result = await controller.update('123', updateSoilCoverDto);

      expect(result).toEqual(mockSoilCover);
      expect(soilCoverService.update).toHaveBeenCalledWith('123', updateSoilCoverDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une couverture du sol', async () => {
      await controller.remove('123');

      expect(soilCoverService.remove).toHaveBeenCalledWith('123');
    });
  });
}); 