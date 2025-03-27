"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlancheModule = void 0;
const common_1 = require("@nestjs/common");
const planche_service_1 = require("./planche.service");
const planche_controller_1 = require("./planche.controller");
let PlancheModule = class PlancheModule {
};
exports.PlancheModule = PlancheModule;
exports.PlancheModule = PlancheModule = __decorate([
    (0, common_1.Module)({
        controllers: [planche_controller_1.PlancheController],
        providers: [planche_service_1.PlancheService],
    })
], PlancheModule);
//# sourceMappingURL=planche.module.js.map