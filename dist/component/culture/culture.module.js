"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultureModule = void 0;
const common_1 = require("@nestjs/common");
const culture_service_1 = require("./culture.service");
const culture_controller_1 = require("./culture.controller");
let CultureModule = class CultureModule {
};
exports.CultureModule = CultureModule;
exports.CultureModule = CultureModule = __decorate([
    (0, common_1.Module)({
        controllers: [culture_controller_1.CultureController],
        providers: [culture_service_1.CultureService],
    })
], CultureModule);
//# sourceMappingURL=culture.module.js.map