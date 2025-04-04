import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivationBedService } from './cultivation-bed.service';
import { CultivationBedController } from './cultivation-bed.controller';
import { CultivationBed } from './entities/cultivation-bed.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CultivationBed, CultivationSpace])],
  controllers: [CultivationBedController],
  providers: [CultivationBedService],
  exports: [CultivationBedService],
})
export class CultivationBedModule {}
