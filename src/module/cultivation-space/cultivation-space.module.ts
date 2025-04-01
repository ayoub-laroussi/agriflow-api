import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivationSpaceService } from './cultivation-space.service';
import { CultivationSpaceController } from './cultivation-space.controller';
import { CultivationSpace } from './entities/cultivation-space.entity';
import { Land } from '../land/entities/land.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CultivationSpace, Land])],
  controllers: [CultivationSpaceController],
  providers: [CultivationSpaceService],
})
export class CultivationSpaceModule {}
