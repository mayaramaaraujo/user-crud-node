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
exports.userDatabase = void 0;
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
class UserDatabase extends BaseDatabase_1.default {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection()
                    .insert({
                    id: user.getId(),
                    name: user.getName(),
                    lastname: user.getLastName(),
                    nickname: user.getNickname(),
                    address: user.getAddress(),
                    bio: user.getBio()
                })
                    .into(this.tableName.user);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    update(id, update_data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName.user)
                    .update({
                    lastname: update_data.lastname,
                    address: update_data.address,
                    nickname: update_data.nickname
                })
                    .where("id", id);
                const updatedUser = yield this.getById(id);
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
                yield this.connection(this.tableName.user)
                    .where("id", id)
                    .del();
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.connection()
                    .select()
                    .from(this.tableName.user)
                    .where('id', id);
                return user;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection()
                    .select()
                    .from(this.tableName.user)
                    .where('name', name);
                return result;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    searchByLastName(lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection()
                    .select()
                    .from(this.tableName.user)
                    .where('lastname', lastname);
                return result;
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
    searchByNameAndLastname(name, lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection()
                    .select()
                    .from(this.tableName.user)
                    .where('name', name).andWhere('lastname', lastname);
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
                const userByDB = yield this.connection()
                    .select()
                    .from(this.tableName.user)
                    .where('nickname', nickname);
                return userByDB[0];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = UserDatabase;
exports.userDatabase = new UserDatabase();
//# sourceMappingURL=UserDatabase.js.map