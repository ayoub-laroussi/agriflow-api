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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terrain = void 0;
const swagger_1 = require("@nestjs/swagger");
class Terrain {
    id;
    nom;
    surface;
    uniteSurface;
}
exports.Terrain = Terrain;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant unique du terrain' }),
    __metadata("design:type", Number)
], Terrain.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du terrain' }),
    __metadata("design:type", String)
], Terrain.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Surface du terrain' }),
    __metadata("design:type", Number)
], Terrain.prototype, "surface", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unité de mesure de la surface' }),
    __metadata("design:type", String)
], Terrain.prototype, "uniteSurface", void 0);
//# sourceMappingURL=terrain.entity.js.map