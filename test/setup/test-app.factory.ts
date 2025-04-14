/**
 * Fabrique d'application de test
 * 
 * Ce fichier fournit une fonction pour créer une instance d'application NestJS
 * configurée pour les tests, avec une base de données PostgreSQL existante
 * et une configuration d'authentification JWT pour les tests.
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../src/module/auth/strategies/jwt.strategy';
import { jwtTestConfig } from '../utils/jwt-test.utils';
import { vi } from 'vitest';

// Mock pour ConfigService
export const mockConfigService = {
  get: vi.fn((key, defaultValue) => {
    if (key === 'JWT_SECRET') return jwtTestConfig.secret;
    if (key === 'JWT_EXPIRES_IN') return jwtTestConfig.expiresIn;
    return defaultValue;
  }),
};

// Mock pour JwtStrategy
export class MockJwtStrategy {
  // Cette méthode sera appelée par le guard pour valider le token
  async validate(payload: any) {
    return { 
      id_user: payload.sub, 
      email: payload.email, 
      username: payload.username || 'testuser' 
    };
  }
}

/**
 * Crée une application NestJS configurée pour les tests
 * 
 * @param imports Modules à importer
 * @returns Une application NestJS configurée pour les tests
 */
export async function createTestingApp(imports: any[] = []): Promise<[INestApplication, TestingModule]> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [...imports],
  })
  .overrideProvider(ConfigService)
  .useValue(mockConfigService)
  .overrideProvider(JwtStrategy)
  .useClass(MockJwtStrategy)
  .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  
  await app.init();
  
  return [app, moduleFixture];
} 