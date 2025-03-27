import { Module } from '@nestjs/common';
import { TerrainModule } from './component/terrain/terrain.module';
import { EspaceCultureModule } from './component/espace-culture/espace-culture.module';
import { PlancheModule } from './component/planche/planche.module';
import { CultureModule } from './component/culture/culture.module';
import { ActionAgricoleModule } from './component/action-agricole/action-agricole.module';
import { PlancheController } from './component/planche/planche.controller';
import { PlancheService } from './component/planche/planche.service';

@Module({
  imports: [TerrainModule, EspaceCultureModule, PlancheModule, CultureModule, ActionAgricoleModule],
  controllers: [PlancheController],
  providers: [PlancheService],
})
export class AppModule {}
