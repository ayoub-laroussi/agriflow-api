import { Test } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [{
        provide: NotificationService,
        useValue: {
          create: vi.fn(),
          findAll: vi.fn(),
          findOne: vi.fn(),
          update: vi.fn(),
          remove: vi.fn(),
          markAsRead: vi.fn(),
          markAsSent: vi.fn(),
        }
      }],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
