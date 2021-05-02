"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, lastname, nickname, address, bio) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.address = address;
        this.bio = bio;
        this.id = id,
            this.name = name,
            this.lastname = lastname,
            this.nickname = nickname,
            this.address = address,
            this.bio = bio;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getLastName() {
        return this.lastname;
    }
    getNickname() {
        return this.nickname;
    }
    getAddress() {
        return this.address;
    }
    getBio() {
        return this.bio;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map