import { Test } from '@nestjs/testing';
import { ObservationController } from './observation.controller';
import { ObservationService } from './observation.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ObservationController', () => {
  let controller: ObservationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ObservationController],
      providers: [{
        provide: ObservationService,
        useValue: {
          create: vi.fn(),
          findAll: vi.fn(),
          findOne: vi.fn(),
          update: vi.fn(),
          remove: vi.fn(),
          findByDateRange: vi.fn(),
          findByCultivationSpace: vi.fn(),
          findByLand: vi.fn(),
        }
      }],
    }).compile();

    controller = module.get<ObservationController>(ObservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
