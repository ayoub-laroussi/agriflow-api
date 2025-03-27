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
const terrain_module_1 = require("./component/terrain/terrain.module");
const espace_culture_module_1 = require("./component/espace-culture/espace-culture.module");
const planche_module_1 = require("./component/planche/planche.module");
const culture_module_1 = require("./component/culture/culture.module");
const action_agricole_module_1 = require("./component/action-agricole/action-agricole.module");
const planche_controller_1 = require("./component/planche/planche.controller");
const planche_service_1 = require("./component/planche/planche.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [terrain_module_1.TerrainModule, espace_culture_module_1.EspaceCultureModule, planche_module_1.PlancheModule, culture_module_1.CultureModule, action_agricole_module_1.ActionAgricoleModule],
        controllers: [planche_controller_1.PlancheController],
        providers: [planche_service_1.PlancheService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map