import { Module } from '@nestjs/common';
import { EspaceCultureService } from './espace-culture.service';
import { EspaceCultureController } from './espace-culture.controller';

@Module({
  controllers: [EspaceCultureController],
  providers: [EspaceCultureService],
})
export class EspaceCultureModule {}
