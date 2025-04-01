import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { LandModule } from './module/land/land.module';
import { SoilCoverModule } from './module/soilcover/soilcover.module';
import { CultivationSpaceModule } from './module/cultivation-space/cultivation-space.module';
import { CropModule } from './module/crop/crop.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    RoleModule,
    LandModule,
    SoilCoverModule,
    CultivationSpaceModule,
    CropModule,
  ],
})
export class AppModule {}
