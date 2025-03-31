import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerrainModule } from './component/terrain/terrain.module';
import { LandModule } from './component/land/land.module';
import { ActionAgricoleModule } from './component/action-agricole/action-agricole.module';
import { CultureModule } from './component/culture/culture.module';
import { PlancheModule } from './component/planche/planche.module';
import { EspaceCultureModule } from './component/espace-culture/espace-culture.module';
import { RoleModule } from './component/role/role.module';
import { UserModule } from './component/user/user.module';
import { EspaceCultureModule } from './component/espace-culture/espace-culture.module';
import { PlancheModule } from './component/planche/planche.module';
import { CultureModule } from './component/culture/culture.module';
import { ActionAgricoleModule } from './component/action-agricole/action-agricole.module';
import { TerrainModule } from './component/terrain/terrain.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'agriflow',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    TerrainModule,
    EspaceCultureModule,
    PlancheModule,
    CultureModule,
    ActionAgricoleModule,
    UserModule,
    RoleModule,
    LandModule,
  ],
})
export class AppModule {}
