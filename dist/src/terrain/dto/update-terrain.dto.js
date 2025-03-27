"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTerrainDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_terrain_dto_1 = require("./create-terrain.dto");
class UpdateTerrainDto extends (0, mapped_types_1.PartialType)(create_terrain_dto_1.CreateTerrainDto) {
}
exports.UpdateTerrainDto = UpdateTerrainDto;
//# sourceMappingURL=update-terrain.dto.js.map