import { Test, TestingModule } from '@nestjs/testing';
import { ActionAgricoleService } from './action-agricole.service';

describe('ActionAgricoleService', () => {
  let service: ActionAgricoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionAgricoleService],
    }).compile();

    service = module.get<ActionAgricoleService>(ActionAgricoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
