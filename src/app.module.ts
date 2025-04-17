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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { LandModule } from './module/land/land.module';
import { SoilCoverModule } from './module/soilcover/soilcover.module';
import { CultivationSpaceModule } from './module/cultivation-space/cultivation-space.module';
import { CropModule } from './module/crop/crop.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CultivationBedModule } from './module/cultivation-bed/cultivation-bed.module';
import { AgriculturalActionModule } from './module/agricultural-action/agricultural-action.module';
import { ObservationModule } from './module/observation/observation.module';
import { NotificationModule } from './module/notification/notification.module';
import { AuthModule } from './module/auth/auth.module';
import { AreaModule } from './module/area/area.module';


/**
 * Module principal de l'application
 * 
 * Ce module configure l'ensemble de l'application, notamment :
 * - La connexion à la base de données via TypeORM
 * - Les variables d'environnement via ConfigModule
 * - Les tâches planifiées via ScheduleModule
 * - Les différents modules fonctionnels de l'application
 * 
 * @module AppModule
 */
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Base de données
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'agriflow'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    
    // Planification de tâches
    ScheduleModule.forRoot(),
    
    // Modules fonctionnels
    AuthModule,
    UserModule,
    RoleModule,
    // SeedModule,
    CultivationSpaceModule,
    CropModule,
    AreaModule,
    CultivationBedModule,
    LandModule,
    SoilCoverModule,
    ObservationModule,
    NotificationModule,
    AgriculturalActionModule,
  ],
})
export class AppModule {}
