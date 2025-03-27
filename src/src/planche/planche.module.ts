import { Module } from '@nestjs/common';
import { PlancheService } from './planche.service';
import { PlancheController } from './planche.controller';

@Module({
  controllers: [PlancheController],
  providers: [PlancheService],
})
export class PlancheModule {}
