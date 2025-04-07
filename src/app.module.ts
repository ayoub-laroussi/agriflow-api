/**
 * Module principal de l'application AgriFlow API
 * 
 * Ce module racine configure et intègre tous les modules fonctionnels de l'application,
 * établit la connexion à la base de données et initialise les configurations globales.
 * 
 * @module AppModule
 */
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
import { CultivationBedModule } from './module/cultivation-bed/cultivation-bed.module';
import { AgriculturalActionModule } from './agricultural-action/agricultural-action.module';

/**
 * Module racine de l'application
 * 
 * Importe et configure tous les modules métier et techniques nécessaires au fonctionnement de l'application.
 * Initialise la connexion à la base de données via TypeORM et charge les variables d'environnement.
 */
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
    CultivationBedModule,
    AgriculturalActionModule,
  ],
})
export class AppModule {}
