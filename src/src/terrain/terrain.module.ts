import { Module } from '@nestjs/common';
import { TerrainService } from './terrain.service';
import { TerrainController } from './terrain.controller';

@Module({
  controllers: [TerrainController],
  providers: [TerrainService],
})
export class TerrainModule {}
