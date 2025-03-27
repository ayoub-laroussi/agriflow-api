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
exports.PlancheController = void 0;
const common_1 = require("@nestjs/common");
const planche_service_1 = require("./planche.service");
const create_planche_dto_1 = require("./dto/create-planche.dto");
const update_planche_dto_1 = require("./dto/update-planche.dto");
let PlancheController = class PlancheController {
    plancheService;
    constructor(plancheService) {
        this.plancheService = plancheService;
    }
    create(createPlancheDto) {
        return this.plancheService.create(createPlancheDto);
    }
    findAll() {
        return this.plancheService.findAll();
    }
    findOne(id) {
        return this.plancheService.findOne(+id);
    }
    update(id, updatePlancheDto) {
        return this.plancheService.update(+id, updatePlancheDto);
    }
    remove(id) {
        return this.plancheService.remove(+id);
    }
};
exports.PlancheController = PlancheController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_planche_dto_1.CreatePlancheDto]),
    __metadata("design:returntype", void 0)
], PlancheController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlancheController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlancheController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_planche_dto_1.UpdatePlancheDto]),
    __metadata("design:returntype", void 0)
], PlancheController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlancheController.prototype, "remove", null);
exports.PlancheController = PlancheController = __decorate([
    (0, common_1.Controller)('planche'),
    __metadata("design:paramtypes", [planche_service_1.PlancheService])
], PlancheController);
//# sourceMappingURL=planche.controller.js.map