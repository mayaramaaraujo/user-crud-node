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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBusiness = void 0;
const UserDatabase_1 = require("../database/UserDatabase");
const User_1 = __importDefault(require("../models/User"));
const IdGenerator_1 = require("../services/IdGenerator");
const CharacterSizeError_1 = require("../error/CharacterSizeError");
const DuplicateError_1 = require("../error/DuplicateError");
const NotFoundError_1 = require("../error/NotFoundError");
class UserBusiness {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, nickname, address, bio, img } = user;
            try {
                if (!name || !lastname || !nickname || !address || !bio || !img) {
                    throw new Error("Fill in all fields.");
                }
                if (nickname.length > 30) {
                    throw new CharacterSizeError_1.CharacterSizeError("The field nickname cannot be longer than 30 characters.");
                }
                if (bio.length > 100) {
                    throw new CharacterSizeError_1.CharacterSizeError("The field bio cannot be longer than 100 characters.");
                }
                const id = IdGenerator_1.idGenerator.generate();
                const newUser = new User_1.default(id, name, lastname, nickname, address, bio, img);
                yield UserDatabase_1.userDatabase.create(newUser);
                const createdUser = yield UserDatabase_1.userDatabase.getById(id);
                return createdUser;
            }
            catch (error) {
                if (error.message.indexOf("Duplicate") !== -1) {
                    throw new DuplicateError_1.DuplicateError("Nickname already exits.");
                }
                else {
                    throw new Error(error.message || error.sqlMessage);
                }
            }
        });
    }
    update(id, updated_data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lastname, address, nickname } = updated_data;
            try {
                const userById = yield UserDatabase_1.userDatabase.getById(id);
                if (!userById) {
                    throw new Error("User not found.");
                }
                if (!lastname &&
                    !address &&
                    !nickname) {
                    throw new Error("It is necessary to pass a lastname, an address or nickname to update user.");
                }
                if (nickname) {
                    const userByNickname = yield UserDatabase_1.userDatabase.byNickname(nickname);
                    if (userByNickname) {
                        throw new DuplicateError_1.DuplicateError("Nickname already in use.");
                    }
                }
                const updatedUser = yield UserDatabase_1.userDatabase.update(id, updated_data);
                return updatedUser;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error("It is necessary to pass an id to delete user");
                }
                yield UserDatabase_1.userDatabase.delete(id);
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    search(name, lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name && !lastname) {
                    throw new Error("No search parameters found.");
                }
                let result = [];
                if (name && !lastname) {
                    result = yield UserDatabase_1.userDatabase.searchByName(name);
                }
                if (!name && lastname) {
                    result = yield UserDatabase_1.userDatabase.searchByLastName(lastname);
                }
                if (name && lastname) {
                    result = yield UserDatabase_1.userDatabase.searchByNameAndLastname(name, lastname);
                }
                if (!result) {
                    throw new NotFoundError_1.NotFoundError("No users found.");
                }
                return result;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    byNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!nickname) {
                    throw new Error("It is necessary to pass an nickname");
                }
                const userByDB = yield UserDatabase_1.userDatabase.byNickname(nickname);
                if (!userByDB) {
                    throw new NotFoundError_1.NotFoundError("User not found.");
                }
                const user = {
                    name: userByDB.name,
                    lastname: userByDB.lastname,
                    nickname: userByDB.nickname,
                    img: userByDB.img
                };
                return user;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield UserDatabase_1.userDatabase.getAll();
                return allUsers;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.default = UserBusiness;
exports.userBusiness = new UserBusiness();
//# sourceMappingURL=UserBusiness.js.map