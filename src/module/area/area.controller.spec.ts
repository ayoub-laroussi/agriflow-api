import { Test } from '@nestjs/testing';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AreaController', () => {
  let controller: AreaController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AreaController],
      providers: [
        {
          provide: AreaService,
          useValue: {
            create: vi.fn(),
            findAll: vi.fn(),
            findOne: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AreaController>(AreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
