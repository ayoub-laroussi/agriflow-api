import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerrainModule } from './src/terrain/terrain.module';
import { EspaceCultureModule } from './src/espace-culture/espace-culture.module';
import { PlancheModule } from './src/planche/planche.module';
import { CultureModule } from './src/culture/culture.module';
import { ActionAgricoleModule } from './src/action-agricole/action-agricole.module';

@Module({
  imports: [TerrainModule, EspaceCultureModule, PlancheModule, CultureModule, ActionAgricoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
