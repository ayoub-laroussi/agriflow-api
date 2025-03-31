import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilCoverService } from './soilcover.service';
import { SoilCoverController } from './soilcover.controller';
import { SoilCover } from './entities/soilcover.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoilCover])],
  controllers: [SoilCoverController],
  providers: [SoilCoverService],
})
export class SoilCoverModule {}
