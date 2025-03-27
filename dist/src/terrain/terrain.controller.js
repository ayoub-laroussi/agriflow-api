"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerrainController = void 0;
const common_1 = require("@nestjs/common");
const terrain_service_1 = require("./terrain.service");
const create_terrain_dto_1 = require("./dto/create-terrain.dto");
const update_terrain_dto_1 = require("./dto/update-terrain.dto");
let TerrainController = class TerrainController {
    terrainService;
    constructor(terrainService) {
        this.terrainService = terrainService;
    }
    create(createTerrainDto) {
        return this.terrainService.create(createTerrainDto);
    }
    findAll() {
        return this.terrainService.findAll();
    }
    findOne(id) {
        return this.terrainService.findOne(+id);
    }
    update(id, updateTerrainDto) {
        return this.terrainService.update(+id, updateTerrainDto);
    }
    remove(id) {
        return this.terrainService.remove(+id);
    }
};
exports.TerrainController = TerrainController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_terrain_dto_1.CreateTerrainDto]),
    __metadata("design:returntype", void 0)
], TerrainController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TerrainController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerrainController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_terrain_dto_1.UpdateTerrainDto]),
    __metadata("design:returntype", void 0)
], TerrainController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerrainController.prototype, "remove", null);
exports.TerrainController = TerrainController = __decorate([
    (0, common_1.Controller)('terrain'),
    __metadata("design:paramtypes", [terrain_service_1.TerrainService])
], TerrainController);
//# sourceMappingURL=terrain.controller.js.map