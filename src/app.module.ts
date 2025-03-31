import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './component/user/user.module';
import { RoleModule } from './component/role/role.module';
import { LandModule } from './component/land/land.module';
import { SoilCoverModule } from './component/soilcover/soilcover.module';
import { CultivationSpaceModule } from './component/cultivation-space/cultivation-space.module';
import { CropModule } from './component/crop/crop.module';
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
