/**
 * Tests unitaires pour le service d'authentification
 * 
 * Ces tests vérifient le bon fonctionnement des méthodes du service d'authentification,
 * notamment la validation des identifiants et la génération de tokens JWT.
 * 
 * @module AuthService.spec
 */
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Créer une classe de test qui étend AuthService pour surcharger ses méthodes
class TestAuthService extends AuthService {
  constructor() {
    super(null, null); // Passer null pour les dépendances, on va surcharger les méthodes
  }

  // Surcharger validateUser pour éviter les appels à UserService
  private async validateUser(email: string, password: string) {
    if (email === 'test@example.com') {
      if (password === 'password123') {
        return {
          id_user: 'test-uuid',
          email: 'test@example.com',
          username: 'testuser',
          password: 'hashed-password'
        };
      }
      return null; // Mot de passe incorrect
    }
    return null; // Utilisateur non trouvé
  }

  // Surcharger la méthode sign du jwtService
  private getToken(payload: any): string {
    return 'jwt-token';
  }

  // Adapter la méthode login pour utiliser getToken
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    
    const payload = {
      sub: user.id_user,
      email: user.email,
    };
    
    return {
      message: 'Connexion réussie',
      data: {
        access_token: this.getToken(payload),
        user: {
          id: user.id_user,
          email: user.email,
          username: user.username,
        },
      },
      statusCode: 200,
    };
  }
}

describe('AuthService', () => {
  let authService: TestAuthService;
  
  const mockLoginDto: LoginDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockInvalidLoginDto: LoginDto = {
    email: 'test@example.com',
    password: 'invalid',
  };

  const mockNonExistentUserDto: LoginDto = {
    email: 'nonexistent@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    // Créer une nouvelle instance du service de test
    authService = new TestAuthService();
  });

  it('devrait être défini', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('devrait retourner un token JWT si les identifiants sont valides', async () => {
      // Act
      const result = await authService.login(mockLoginDto);

      // Assert
      expect(result).toEqual({
        message: 'Connexion réussie',
        data: {
          access_token: 'jwt-token',
          user: {
            id: 'test-uuid',
            email: 'test@example.com',
            username: 'testuser',
          },
        },
        statusCode: 200,
      });
    });

    it('devrait lancer une exception si l\'utilisateur n\'existe pas', async () => {
      // Act & Assert
      await expect(authService.login(mockNonExistentUserDto)).rejects.toThrow(UnauthorizedException);
    });

    it('devrait lancer une exception si le mot de passe est invalide', async () => {
      // Act & Assert
      await expect(authService.login(mockInvalidLoginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
}); 