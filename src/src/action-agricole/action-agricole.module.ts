import { Module } from '@nestjs/common';
import { ActionAgricoleService } from './action-agricole.service';
import { ActionAgricoleController } from './action-agricole.controller';

@Module({
  controllers: [ActionAgricoleController],
  providers: [ActionAgricoleService],
})
export class ActionAgricoleModule {}
