import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crop } from '../src/module/crop/entities/crop.entity';

// Augmenter le timeout pour tous les tests
vi.setConfig({ testTimeout: 30000 });

describe('Module Crop - Tests d\'intégration', () => {
  let app: INestApplication;
  let cropRepository: Repository<Crop>;
  let createdCropId: string | null = null;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    try {
      moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
      
      cropRepository = moduleFixture.get<Repository<Crop>>(getRepositoryToken(Crop));
      
      await app.init();
      console.log('Application initialisée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      throw error;
    }
  }, 30000); // Augmenter le timeout spécifiquement pour beforeAll

  afterAll(async () => {
    try {
      // Nettoyage de la base de données après les tests
      if (createdCropId && cropRepository) {
        await cropRepository.delete(createdCropId);
      }
      
      if (app) {
        await app.close();
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error);
    }
  });

  // Test de création d'une culture
  describe('POST /crops', () => {
    it('devrait créer une nouvelle culture avec tous les champs requis', async () => {
      const createCropDto = {
        crop_name: 'Tomate Roma Test',
        crop_planting_date: new Date().toISOString(),
        crop_plant_family: 'Solanacées',
        crop_variety: 'Roma',
        crop_status: 'En croissance',
        crop_commentary: 'Test d\'intégration'
      };

      const response = await request(app.getHttpServer())
        .post('/crops')
        .send(createCropDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.variety).toBe('Roma');
      expect(response.body.status).toBe('En croissance');
      
      createdCropId = response.body.id;
    });

    it('devrait retourner une erreur 400 si les champs requis sont manquants', async () => {
      const invalidCropDto = {
        crop_variety: 'Roma',
        crop_status: 'En croissance'
        // crop_name et crop_planting_date manquants
      };

      const response = await request(app.getHttpServer())
        .post('/crops')
        .send(invalidCropDto)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('validation');
    });
  });

  // Test de récupération de toutes les cultures
  describe('GET /crops', () => {
    it('devrait récupérer toutes les cultures', async () => {
      const response = await request(app.getHttpServer())
        .get('/crops')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // Test de récupération d'une culture par son ID
  describe('GET /crops/:id', () => {
    it('devrait récupérer une culture par son ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/crops/${createdCropId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdCropId);
      expect(response.body).toHaveProperty('variety', 'Roma');
      expect(response.body).toHaveProperty('status', 'En croissance');
    });

    it('devrait retourner une erreur 404 pour un ID inexistant', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      
      const response = await request(app.getHttpServer())
        .get(`/crops/${nonExistentId}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('non trouvé');
    });
  });

  // Test de mise à jour d'une culture
  describe('PATCH /crops/:id', () => {
    it('devrait mettre à jour une culture', async () => {
      const updateCropDto = {
        crop_status: 'Récolté',
        crop_commentary: 'Culture récoltée lors du test d\'intégration'
      };

      const response = await request(app.getHttpServer())
        .patch(`/crops/${createdCropId}`)
        .send(updateCropDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdCropId);
      expect(response.body).toHaveProperty('status', 'Récolté');
      expect(response.body.commentary).toContain('Culture récoltée');
    });

    it('devrait retourner une erreur 404 pour la mise à jour d\'un ID inexistant', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const updateCropDto = { crop_status: 'Terminé' };
      
      const response = await request(app.getHttpServer())
        .patch(`/crops/${nonExistentId}`)
        .send(updateCropDto)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('non trouvé');
    });
  });

  // Test de suppression d'une culture
  describe('DELETE /crops/:id', () => {
    it('devrait supprimer une culture', async () => {
      await request(app.getHttpServer())
        .delete(`/crops/${createdCropId}`)
        .expect(200);

      // Vérifier que la culture a bien été supprimée
      await request(app.getHttpServer())
        .get(`/crops/${createdCropId}`)
        .expect(404);
      
      // Éviter une deuxième tentative de suppression dans le afterAll
      createdCropId = null;
    });

    it('devrait retourner 200 même pour un ID inexistant (idempotent)', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      
      await request(app.getHttpServer())
        .delete(`/crops/${nonExistentId}`)
        .expect(200);
    });
  });

  // Test de la validation des entrées
  describe('Validation des entrées', () => {
    it('devrait valider la longueur maximale des champs texte', async () => {
      const tooLongName = 'a'.repeat(60); // Plus de 50 caractères
      
      const invalidCropDto = {
        crop_name: tooLongName,
        crop_planting_date: new Date().toISOString(),
      };

      const response = await request(app.getHttpServer())
        .post('/crops')
        .send(invalidCropDto)
        .expect(400);

      expect(response.body.message).toContain('crop_name');
      expect(response.body.message).toContain('50');
    });

    it('devrait valider le format de date', async () => {
      const invalidCropDto = {
        crop_name: 'Test Date',
        crop_planting_date: 'date-invalide'
      };

      const response = await request(app.getHttpServer())
        .post('/crops')
        .send(invalidCropDto)
        .expect(400);

      expect(response.body.message).toContain('crop_planting_date');
    });
  });
}); 