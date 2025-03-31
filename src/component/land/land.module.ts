import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandService } from './land.service';
import { LandController } from './land.controller';
import { Land } from './entities/land.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Land])],
  controllers: [LandController],
  providers: [LandService],
})
export class LandModule {}
