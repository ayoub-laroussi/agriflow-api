import { Test, TestingModule } from '@nestjs/testing';
import { EspaceCultureController } from './espace-culture.controller';
import { EspaceCultureService } from './espace-culture.service';

describe('EspaceCultureController', () => {
  let controller: EspaceCultureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspaceCultureController],
      providers: [EspaceCultureService],
    }).compile();

    controller = module.get<EspaceCultureController>(EspaceCultureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
