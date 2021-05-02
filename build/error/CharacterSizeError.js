"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterSizeError = void 0;
const BaseError_1 = require("./BaseError");
class CharacterSizeError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 400);
    }
}
exports.CharacterSizeError = CharacterSizeError;
//# sourceMappingURL=CharacterSizeError.js.map