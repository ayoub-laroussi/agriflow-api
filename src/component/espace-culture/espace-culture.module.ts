import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspaceCultureService } from './espace-culture.service';
import { EspaceCultureController } from './espace-culture.controller';
import { EspaceCulture } from './entities/espace-culture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EspaceCulture])],
  controllers: [EspaceCultureController],
  providers: [EspaceCultureService],
})
export class EspaceCultureModule {}
