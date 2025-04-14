import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/entities/role.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;

  const mockUserRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    createQueryBuilder: vi.fn(() => ({
      relation: vi.fn(() => ({
        of: vi.fn(() => ({
          set: vi.fn(),
        })),
      })),
    })),
  };

  const mockRoleRepository = {
    findOne: vi.fn(),
  };

  const mockRole = {
    id: 1,
    role: 'admin',
    users: Promise.resolve([]),
  };

  const mockUser = {
    id_user: '123',
    email: 'test@test.com',
    username: 'testuser',
    password: 'password123',
    role: Promise.resolve(mockRole),
    lands: Promise.resolve([]),
    users_creation_date: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    
    // Réinitialiser les mocks
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('devrait créer un nouvel utilisateur', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
        role: 'admin',
      };

      // Simuler la recherche du rôle
      mockRoleRepository.findOne.mockResolvedValue(mockRole);
      // Simuler la sauvegarde de l'utilisateur
      mockUserRepository.save.mockResolvedValue({ id_user: '123' });
      // Simuler la recherche de l'utilisateur après sauvegarde
      mockUserRepository.findOne
        .mockResolvedValueOnce({ id_user: '123' }) // Pour l'appel userRepository.findOne après save
        .mockResolvedValueOnce(mockUser); // Pour l'appel à this.findOne(savedUser.id_user)

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ where: { role: 'admin' } });
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockUserRepository.createQueryBuilder).toHaveBeenCalled();
    });

    it('devrait lancer une exception si le rôle n\'est pas trouvé', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
        role: 'inexistent_role',
      };

      mockRoleRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les utilisateurs', async () => {
      const users = [mockUser];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalledWith({
        relations: ['role', 'lands'],
      });
    });
  });

  describe('findOne', () => {
    it('devrait retourner un utilisateur par son ID', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('123');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id_user: '123' },
        relations: ['role', 'lands'],
      });
    });

    it('devrait lancer une exception si l\'utilisateur n\'est pas trouvé', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un utilisateur', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@test.com',
        username: 'updateduser',
        password: 'newpassword123',
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue({ ...mockUser, ...updateUserDto });

      const result = await service.update('123', updateUserDto);

      expect(result).toEqual({ ...mockUser, ...updateUserDto });
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id_user: '123' },
        relations: ['role', 'lands'],
      });
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si l\'utilisateur n\'est pas trouvé', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.update('123', {} as UpdateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un utilisateur', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('123');

      expect(mockUserRepository.delete).toHaveBeenCalledWith({ id_user: '123' });
    });
  });

  describe('findByEmail', () => {
    it('devrait retourner un utilisateur par son email', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@test.com');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
        relations: ['role', 'lands'],
      });
    });
    
    it('devrait lancer une exception si l\'utilisateur n\'est pas trouvé par email', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findByEmail('nonexistent@test.com')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByUsername', () => {
    it('devrait retourner un utilisateur par son nom d\'utilisateur', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
        relations: ['role', 'lands'],
      });
    });
    
    it('devrait lancer une exception si l\'utilisateur n\'est pas trouvé par nom d\'utilisateur', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findByUsername('nonexistentuser')).rejects.toThrow(NotFoundException);
    });
  });
}); 