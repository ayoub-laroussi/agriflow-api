import { Test, TestingModule } from '@nestjs/testing';
import { EspaceCultureService } from './espace-culture.service';

describe('EspaceCultureService', () => {
  let service: EspaceCultureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspaceCultureService],
    }).compile();

    service = module.get<EspaceCultureService>(EspaceCultureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
