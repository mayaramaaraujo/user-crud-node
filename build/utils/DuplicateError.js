"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateError = void 0;
const BaseError_1 = require("./BaseError");
class DuplicateError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 409);
    }
}
exports.DuplicateError = DuplicateError;
//# sourceMappingURL=DuplicateError.js.map