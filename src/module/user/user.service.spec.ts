import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const mockUser: User = {
    id_user: '123',
    email: 'test@test.com',
    username: 'testuser',
    password: 'password123',
    role: { id: 1, role: 'admin', users: [] },
    lands: [],
    users_creation_date: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('devrait créer un nouvel utilisateur', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
        role: 'admin',
      };

      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les utilisateurs', async () => {
      const users = [mockUser];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un utilisateur par son ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('123');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_user: '123' },
      });
    });

    it('devrait lancer une exception si l\'utilisateur n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un utilisateur', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@test.com',
        username: 'updateduser',
        password: 'newpassword123',
        role: 'admin',
      };

      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.save.mockResolvedValue({ ...mockUser, ...updateUserDto });

      const result = await service.update('123', updateUserDto);

      expect(result).toEqual({ ...mockUser, ...updateUserDto });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_user: '123' },
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une exception si l\'utilisateur n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('123', {} as UpdateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un utilisateur', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('123');

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_user: '123' },
      });
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it('devrait lancer une exception si l\'utilisateur n\'est pas trouvé', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('devrait retourner un utilisateur par son email', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@test.com');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
    });
  });

  describe('findByUsername', () => {
    it('devrait retourner un utilisateur par son nom d\'utilisateur', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
    });
  });
}); 