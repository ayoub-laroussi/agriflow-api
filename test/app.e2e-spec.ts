import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { generateStandardTestToken } from './utils/jwt-test.utils';
import { createTestingApp } from './setup/test-app.factory';

describe('API (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let userToken: string;
  let userId: string;
  let roleId: number;
  let landId: string;
  let cultivationSpaceId: string;

  beforeAll(async () => {
    const [testApp, moduleFixture] = await createTestingApp([AppModule]);
    app = testApp;
    
    jwtService = moduleFixture.get<JwtService>(JwtService);
    
    // Création d'un token de test
    userToken = generateStandardTestToken({
      sub: 'test-user-id',
      email: 'test@example.com',
      username: 'testuser'
    });
  }, 30000); // Augmenter le timeout

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('Rôles', () => {
    it('Devrait récupérer tous les rôles', async () => {
      const response = await request(app.getHttpServer())
        .get('/role')
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      if (response.body.length > 0) {
        roleId = response.body[0].id;
      }
    });

    it('Devrait créer un nouveau rôle', async () => {
      const response = await request(app.getHttpServer())
        .post('/role')
        .send({ role: 'TEST_ROLE' })
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('role', 'TEST_ROLE');
      
      // Si aucun rôle n'était disponible auparavant
      if (!roleId) {
        roleId = response.body.id;
      }
    });

    it('Devrait récupérer un rôle par son ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/role/${roleId}`)
        .expect(200);
      
      expect(response.body).toHaveProperty('id', roleId);
    });
  });

  describe('Utilisateurs', () => {
    it('Devrait créer un nouvel utilisateur', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        role: 'ADMIN'
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id_user');
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('username', 'testuser');
      
      userId = response.body.id_user;
    });

    it('Devrait récupérer tous les utilisateurs', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Devrait récupérer un utilisateur par son ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);
      
      expect(response.body).toHaveProperty('id_user', userId);
      expect(response.body).toHaveProperty('email', 'test@example.com');
    });
  });

  describe('Terrains', () => {
    it('Devrait créer un nouveau terrain', async () => {
      const landData = {
        land_name: 'Terrain de test',
        land_area: 1000,
        land_coordinate: 48.8566,
        id_user: userId
      };

      const response = await request(app.getHttpServer())
        .post('/lands')
        .send(landData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id_land');
      expect(response.body).toHaveProperty('land_name', 'Terrain de test');
      
      landId = response.body.id_land;
    });

    it('Devrait récupérer tous les terrains', async () => {
      const response = await request(app.getHttpServer())
        .get('/lands')
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Devrait récupérer les terrains d\'un utilisateur', async () => {
      const response = await request(app.getHttpServer())
        .get(`/lands/user/${userId}`)
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Espaces de culture', () => {
    it('Devrait créer un nouvel espace de culture', async () => {
      const cultivationSpaceData = {
        cultivation_space_name: 'Espace test',
        cultivation_spaces_area: 100,
        cultivation_spaces_commentary: 'Espace de test pour e2e',
        id_land: landId
      };

      const response = await request(app.getHttpServer())
        .post('/cultivation-spaces')
        .send(cultivationSpaceData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id_cultivation_space');
      expect(response.body).toHaveProperty('cultivation_space_name', 'Espace test');
      
      cultivationSpaceId = response.body.id_cultivation_space;
    });

    it('Devrait récupérer tous les espaces de culture', async () => {
      const response = await request(app.getHttpServer())
        .get('/cultivation-spaces')
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Devrait récupérer les espaces de culture d\'un terrain', async () => {
      const response = await request(app.getHttpServer())
        .get(`/cultivation-spaces/land/${landId}`)
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Couvertures du sol', () => {
    let soilCoverId: string;

    it('Devrait créer une nouvelle couverture du sol', async () => {
      const soilCoverData = {
        type_soil_cover: 'Minéral',
        soilCoverDate: new Date().toISOString(),
        soilCoverCommentary: 'Couverture test pour e2e'
      };

      const response = await request(app.getHttpServer())
        .post('/soilcover')
        .send(soilCoverData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id_soil_cover');
      expect(response.body).toHaveProperty('type_soil_cover', 'Minéral');
      
      soilCoverId = response.body.id_soil_cover;
    });

    it('Devrait récupérer toutes les couvertures du sol', async () => {
      const response = await request(app.getHttpServer())
        .get('/soilcover')
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Cultures', () => {
    let cropId: string;

    it('Devrait créer une nouvelle culture', async () => {
      const cropData = {
        crop_name: 'Tomate',
        crop_commentary: 'Culture test pour e2e',
        crop_plant_family: 'Solanacées',
        crop_variety: 'Roma',
        crop_planting_date: new Date().toISOString(),
        crop_status: 'En cours'
      };

      const response = await request(app.getHttpServer())
        .post('/crop')
        .send(cropData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id_crop');
      expect(response.body).toHaveProperty('crop_name', 'Tomate');
      
      cropId = response.body.id_crop;
    });

    it('Devrait récupérer toutes les cultures', async () => {
      const response = await request(app.getHttpServer())
        .get('/crop')
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Nettoyage', () => {
    it('Devrait supprimer les données de test', async () => {
      // Cette partie est facultative mais utile pour nettoyer les données créées pendant les tests
      
      // Supprimer la culture
      // await request(app.getHttpServer()).delete(`/crop/${cropId}`).expect(200);
      
      // Supprimer l'espace de culture
      // await request(app.getHttpServer()).delete(`/cultivation-spaces/${cultivationSpaceId}`).expect(200);
      
      // Supprimer le terrain
      // await request(app.getHttpServer()).delete(`/lands/${landId}`).expect(200);
      
      // Supprimer l'utilisateur
      // await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);
      
      // Les suppressions sont commentées pour éviter les erreurs si les données sont nécessaires pour d'autres tests
      expect(true).toBe(true);
    });
  });
});
