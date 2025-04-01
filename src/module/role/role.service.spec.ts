import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { NotFoundException } from '@nestjs/common';

describe('RoleService', () => {
  let service: RoleService;
  let repository: Repository<Role>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const mockRole = {
    id: 1,
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  describe('create', () => {
    it('devrait créer un nouveau rôle', async () => {
      const createRoleDto = {
        role: 'admin',
      };

      mockRepository.create.mockReturnValue(mockRole);
      mockRepository.save.mockResolvedValue(mockRole);

      const result = await service.create(createRoleDto);

      expect(result).toEqual(mockRole);
      expect(mockRepository.create).toHaveBeenCalledWith(createRoleDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les rôles', async () => {
      const roles = [mockRole];
      mockRepository.find.mockResolvedValue(roles);

      const result = await service.findAll();

      expect(result).toEqual(roles);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un rôle par son ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockRole);

      const result = await service.findOne(1);

      expect(result).toEqual(mockRole);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('devrait lancer une exception si le rôle n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un rôle', async () => {
      const updateRoleDto = {
        role: 'superadmin',
      };

      mockRepository.findOne.mockResolvedValue(mockRole);
      mockRepository.save.mockResolvedValue({ ...mockRole, ...updateRoleDto });

      const result = await service.update(1, updateRoleDto);

      expect(result).toEqual({ ...mockRole, ...updateRoleDto });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si le rôle n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un rôle', async () => {
      mockRepository.findOne.mockResolvedValue(mockRole);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('devrait lancer une exception si le rôle n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
}); 