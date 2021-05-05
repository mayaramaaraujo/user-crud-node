"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    nickname: req.body.nickname,
                    address: req.body.address,
                    bio: req.body.bio
                };
                const newUser = yield UserBusiness_1.userBusiness.create(user);
                res.status(200).send({
                    message: "User created successfully.",
                    created_user: newUser
                });
            }
            catch (error) {
                res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updated_data = {
                    lastname: req.body.lastname,
                    address: req.body.address,
                    nickname: req.body.nickname
                };
                const updatedUser = yield UserBusiness_1.userBusiness.update(id, updated_data);
                res.status(200).send({
                    message: "User updated successfully.",
                    updatedUser: updatedUser
                });
            }
            catch (error) {
                res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield UserBusiness_1.userBusiness.delete(id);
                res.status(200).send("User deleted successfully.");
            }
            catch (error) {
                res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message);
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.name;
                const lastname = req.query.lastname;
                const result = yield UserBusiness_1.userBusiness.search(name, lastname);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message);
            }
        });
    }
    byNickname(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nickname = req.params.nickname;
                const user = yield UserBusiness_1.userBusiness.byNickname(nickname);
                res.status(200).send(user);
            }
            catch (error) {
                res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield UserBusiness_1.userBusiness.getAll();
                res.status(200).send({
                    users: allUsers
                });
            }
            catch (error) {
                res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message);
            }
        });
    }
}
exports.default = UserController;
exports.userController = new UserController();
//# sourceMappingURL=UserController.js.map