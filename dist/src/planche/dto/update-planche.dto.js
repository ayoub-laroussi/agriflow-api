"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlancheDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_planche_dto_1 = require("./create-planche.dto");
class UpdatePlancheDto extends (0, mapped_types_1.PartialType)(create_planche_dto_1.CreatePlancheDto) {
}
exports.UpdatePlancheDto = UpdatePlancheDto;
//# sourceMappingURL=update-planche.dto.js.map