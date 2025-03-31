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
const user_module_1 = require("./component/user/user.module");
const role_module_1 = require("./component/role/role.module");
const land_module_1 = require("./component/land/land.module");
const soilcover_module_1 = require("./component/soilcover/soilcover.module");
const cultivation_space_module_1 = require("./component/cultivation-space/cultivation-space.module");
const crop_module_1 = require("./component/crop/crop.module");
const typeorm_config_1 = require("./config/typeorm.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            land_module_1.LandModule,
            soilcover_module_1.SoilCoverModule,
            cultivation_space_module_1.CultivationSpaceModule,
            crop_module_1.CropModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map