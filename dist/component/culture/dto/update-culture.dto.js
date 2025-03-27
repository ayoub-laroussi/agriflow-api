"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCultureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_culture_dto_1 = require("./create-culture.dto");
class UpdateCultureDto extends (0, mapped_types_1.PartialType)(create_culture_dto_1.CreateCultureDto) {
}
exports.UpdateCultureDto = UpdateCultureDto;
//# sourceMappingURL=update-culture.dto.js.map