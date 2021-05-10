"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, lastname, nickname, address, bio, img) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.address = address;
        this.bio = bio;
        this.img = img;
        this.id = id,
            this.name = name,
            this.lastname = lastname,
            this.nickname = nickname,
            this.address = address,
            this.bio = bio,
            this.img = img;
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
    getImg() {
        return this.img;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map