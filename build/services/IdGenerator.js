"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idGenerator = exports.IdGenerator = void 0;
const uuid_1 = require("uuid");
class IdGenerator {
    generate() {
        return uuid_1.v4();
    }
}
exports.IdGenerator = IdGenerator;
exports.idGenerator = new IdGenerator();
//# sourceMappingURL=IdGenerator.js.map