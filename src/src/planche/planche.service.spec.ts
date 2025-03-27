import { Test, TestingModule } from '@nestjs/testing';
import { PlancheService } from './planche.service';

describe('PlancheService', () => {
  let service: PlancheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlancheService],
    }).compile();

    service = module.get<PlancheService>(PlancheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
