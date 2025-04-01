import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    findByEmail: vi.fn(),
    findByUsername: vi.fn(),
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

  const createUserDto: CreateUserDto = {
    email: 'test@test.com',
    username: 'testuser',
    password: 'password123',
    role: 'admin',
  };

  const updateUserDto: UpdateUserDto = {
    email: 'updated@test.com',
    username: 'updateduser',
    password: 'newpassword123',
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      mockUserService.create.mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUserService.findAll.mockResolvedValue([mockUser]);

      const result = await controller.findAll();

      expect(result).toEqual([mockUser]);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne('123');

      expect(result).toEqual(mockUser);
      expect(mockUserService.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      mockUserService.update.mockResolvedValue(mockUser);

      const result = await controller.update('123', updateUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUserService.update).toHaveBeenCalledWith('123', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockUserService.remove.mockResolvedValue(mockUser);

      const result = await controller.remove('123');

      expect(result).toEqual(mockUser);
      expect(mockUserService.remove).toHaveBeenCalledWith('123');
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUser);

      const result = await controller.findByEmail('test@test.com');

      expect(result).toEqual(mockUser);
      expect(mockUserService.findByEmail).toHaveBeenCalledWith('test@test.com');
    });
  });

  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      mockUserService.findByUsername.mockResolvedValue(mockUser);

      const result = await controller.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(mockUserService.findByUsername).toHaveBeenCalledWith('testuser');
    });
  });
}); 