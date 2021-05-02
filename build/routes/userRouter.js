"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/create", UserController_1.userController.create);
exports.userRouter.get("/search", UserController_1.userController.search);
exports.userRouter.get("/:nickname", UserController_1.userController.byNickname);
exports.userRouter.put("/:id", UserController_1.userController.update);
exports.userRouter.delete("/:id", UserController_1.userController.delete);
//# sourceMappingURL=userRouter.js.map