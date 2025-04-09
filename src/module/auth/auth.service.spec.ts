/**
 * Tests unitaires pour le service d'authentification
 * 
 * Ces tests vérifient le bon fonctionnement des méthodes du service d'authentification,
 * notamment la validation des identifiants et la génération de tokens JWT.
 * 
 * @module AuthService.spec
 */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as bcrypt from 'bcrypt';

// Mock de bcrypt pour éviter les appels réels
vi.mock('bcrypt', async () => {
  return {
    compare: vi.fn(),
  };
});

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUser = {
    id_user: 'test-uuid',
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedPassword',
  };

  const mockLoginDto: LoginDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockJwtToken = 'jwt-token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: vi.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: vi.fn(() => mockJwtToken),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('devrait être défini', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('devrait retourner un token JWT si les identifiants sont valides', async () => {
      // Arrange
      vi.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      // Act
      const result = await authService.login(mockLoginDto);

      // Assert
      expect(userService.findByEmail).toHaveBeenCalledWith(mockLoginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDto.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id_user,
        email: mockUser.email,
      });
      expect(result).toEqual({
        message: 'Connexion réussie',
        data: {
          access_token: mockJwtToken,
          user: {
            id: mockUser.id_user,
            email: mockUser.email,
            username: mockUser.username,
          },
        },
        statusCode: 200,
      });
    });

    it('devrait lancer une exception si l\'utilisateur n\'existe pas', async () => {
      // Arrange
      vi.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      // Act & Assert
      await expect(authService.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      expect(userService.findByEmail).toHaveBeenCalledWith(mockLoginDto.email);
    });

    it('devrait lancer une exception si le mot de passe est invalide', async () => {
      // Arrange
      vi.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      // Act & Assert
      await expect(authService.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      expect(userService.findByEmail).toHaveBeenCalledWith(mockLoginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDto.password, mockUser.password);
    });
  });
}); 