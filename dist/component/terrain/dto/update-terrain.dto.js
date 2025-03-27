"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTerrainDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_terrain_dto_1 = require("./create-terrain.dto");
class UpdateTerrainDto extends (0, swagger_1.PartialType)(create_terrain_dto_1.CreateTerrainDto) {
}
exports.UpdateTerrainDto = UpdateTerrainDto;
//# sourceMappingURL=update-terrain.dto.js.map