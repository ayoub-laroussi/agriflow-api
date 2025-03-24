import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { describe, it, expect, vi } from 'vitest';
import { HelloResponse } from './interfaces/api-response.interface';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('devrait retourner une réponse standard avec le message "Hello World!"', () => {
      const mockData = 'Hello World!';
      const expectedResponse: HelloResponse = {
        message: 'Message de bienvenue récupéré avec succès',
        data: mockData,
        statusCode: 200
      };
      
      vi.spyOn(appService, 'getHello').mockReturnValue(mockData);
      
      const result = appController.getHello();
      expect(result).toEqual(expectedResponse);
    });
  });
});
