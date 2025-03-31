import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandService } from './land.service';
import { LandController } from './land.controller';
import { Land } from './entities/land.entity';
import { User } from '../user/entities/user.entity';
import { CultivationSpace } from '../cultivation-space/entities/cultivation-space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Land, User, CultivationSpace])],
  controllers: [LandController],
  providers: [LandService],
})
export class LandModule {}
