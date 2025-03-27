import { Test, TestingModule } from '@nestjs/testing';
import { ActionAgricoleController } from './action-agricole.controller';
import { ActionAgricoleService } from './action-agricole.service';

describe('ActionAgricoleController', () => {
  let controller: ActionAgricoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionAgricoleController],
      providers: [ActionAgricoleService],
    }).compile();

    controller = module.get<ActionAgricoleController>(ActionAgricoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
