export default class User {
  constructor(
    private id: string,
    private name: string,
    private lastname: string,
    private nickname: string,
    private address: string,
    private bio: string,
    private img: string
  ) {
    this.id = id,
    this.name = name,
    this.lastname = lastname,
    this.nickname = nickname,
    this.address = address,
    this.bio = bio,
    this.img = img
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


export interface UserInput {
  name: string,
  lastname: string,
  nickname: string,
  address: string,
  bio: string,
  img: string
}

export interface UserByDB {
  id: string,
  name: string,
  lastname: string,
  nickname: string,
  address: string,
  bio: string,
  img: string,
  created_at: Date,
  update_at: Date | null
}

export interface UserByNickname {
  name: string,
  lastname: string,
  nickname: string,
  img: string
}

export interface update_data {
  lastname: string,
  address: string,
  nickname: string
  img: string
}