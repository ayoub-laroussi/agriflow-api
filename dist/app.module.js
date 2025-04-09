"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const user_module_1 = require("./module/user/user.module");
const role_module_1 = require("./module/role/role.module");
const land_module_1 = require("./module/land/land.module");
const soilcover_module_1 = require("./module/soilcover/soilcover.module");
const cultivation_space_module_1 = require("./module/cultivation-space/cultivation-space.module");
const crop_module_1 = require("./module/crop/crop.module");
const cultivation_bed_module_1 = require("./module/cultivation-bed/cultivation-bed.module");
const agricultural_action_module_1 = require("./module/agricultural-action/agricultural-action.module");
const observation_module_1 = require("./module/observation/observation.module");
const notification_module_1 = require("./module/notification/notification.module");
const seed_module_1 = require("./module/seed/seed.module");
const users_module_1 = require("./module/users/users.module");
const auth_module_1 = require("./module/auth/auth.module");
const area_module_1 = require("./module/area/area.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'postgres'),
                    database: configService.get('DB_NAME', 'agriflow'),
                    entities: ['dist/**/*.entity{.ts,.js}'],
                    synchronize: configService.get('NODE_ENV') !== 'production',
                    logging: configService.get('NODE_ENV') === 'development',
                }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
            seed_module_1.SeedModule,
            cultivation_space_module_1.CultivationSpaceModule,
            crop_module_1.CropModule,
            area_module_1.AreaModule,
            cultivation_bed_module_1.CultivationBedModule,
            land_module_1.LandModule,
            soilcover_module_1.SoilCoverModule,
            observation_module_1.ObservationModule,
            notification_module_1.NotificationModule,
            agricultural_action_module_1.AgriculturalActionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map