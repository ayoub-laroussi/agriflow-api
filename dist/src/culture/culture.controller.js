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
exports.CultureController = void 0;
const common_1 = require("@nestjs/common");
const culture_service_1 = require("./culture.service");
const create_culture_dto_1 = require("./dto/create-culture.dto");
const update_culture_dto_1 = require("./dto/update-culture.dto");
let CultureController = class CultureController {
    cultureService;
    constructor(cultureService) {
        this.cultureService = cultureService;
    }
    create(createCultureDto) {
        return this.cultureService.create(createCultureDto);
    }
    findAll() {
        return this.cultureService.findAll();
    }
    findOne(id) {
        return this.cultureService.findOne(+id);
    }
    update(id, updateCultureDto) {
        return this.cultureService.update(+id, updateCultureDto);
    }
    remove(id) {
        return this.cultureService.remove(+id);
    }
};
exports.CultureController = CultureController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_culture_dto_1.CreateCultureDto]),
    __metadata("design:returntype", void 0)
], CultureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CultureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CultureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_culture_dto_1.UpdateCultureDto]),
    __metadata("design:returntype", void 0)
], CultureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CultureController.prototype, "remove", null);
exports.CultureController = CultureController = __decorate([
    (0, common_1.Controller)('culture'),
    __metadata("design:paramtypes", [culture_service_1.CultureService])
], CultureController);
//# sourceMappingURL=culture.controller.js.map