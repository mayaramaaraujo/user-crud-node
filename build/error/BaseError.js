"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message, customErrorCode) {
        super(message);
        this.customErrorCode = customErrorCode;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map