import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

describe('RoleController', () => {
  let controller: RoleController;

  const mockRoleService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  const mockRole = {
    id: 1,
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: mockRoleService,
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    
    // Ajouter manuellement le service au contrôleur
    Object.defineProperty(controller, 'roleService', {
      value: mockRoleService,
      writable: true,
    });
    
    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('devrait créer un nouveau rôle', async () => {
      const createRoleDto: CreateRoleDto = {
        role: 'admin',
      };

      mockRoleService.create.mockResolvedValue(mockRole);

      const result = await controller.create(createRoleDto);

      expect(result).toEqual(mockRole);
      expect(mockRoleService.create).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les rôles', async () => {
      const roles = [mockRole];
      mockRoleService.findAll.mockResolvedValue(roles);

      const result = await controller.findAll();

      expect(result).toEqual(roles);
      expect(mockRoleService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un rôle par son ID', async () => {
      mockRoleService.findOne.mockResolvedValue(mockRole);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockRole);
      expect(mockRoleService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un rôle', async () => {
      const updateRoleDto: UpdateRoleDto = {
        role: 'superadmin',
      };

      mockRoleService.update.mockResolvedValue({ ...mockRole, ...updateRoleDto });

      const result = await controller.update('1', updateRoleDto);

      expect(result).toEqual({ ...mockRole, ...updateRoleDto });
      expect(mockRoleService.update).toHaveBeenCalledWith(1, updateRoleDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un rôle', async () => {
      mockRoleService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(mockRoleService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 