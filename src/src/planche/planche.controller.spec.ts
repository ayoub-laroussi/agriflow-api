import { Test, TestingModule } from '@nestjs/testing';
import { PlancheController } from './planche.controller';
import { PlancheService } from './planche.service';

describe('PlancheController', () => {
  let controller: PlancheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlancheController],
      providers: [PlancheService],
    }).compile();

    controller = module.get<PlancheController>(PlancheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
