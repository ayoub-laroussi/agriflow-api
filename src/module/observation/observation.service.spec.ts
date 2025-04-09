import { Test } from '@nestjs/testing';
import { ObservationService } from './observation.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Observation } from './entities/observation.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';
import { Land } from '../land/entities/land.entity';

describe('ObservationService', () => {
  let service: ObservationService;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ObservationService,
        {
          provide: getRepositoryToken(Observation),
          useValue: { ...mockRepository },
        },
        {
          provide: getRepositoryToken(CultivationSpace),
          useValue: { ...mockRepository },
        },
        {
          provide: getRepositoryToken(Land),
          useValue: { ...mockRepository },
        },
      ],
    }).compile();

    service = module.get<ObservationService>(ObservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
