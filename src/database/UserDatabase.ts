import User, { update_data, UserByDB } from '../models/User';
import BaseDatabase from './BaseDatabase';

export default class UserDatabase extends BaseDatabase {
  public async create(user: User) {
    try {
      await this.connection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          lastname: user.getLastName(),
          nickname: user.getNickname(),
          address: user.getAddress(),
          bio: user.getBio(),
          img: user.getImg()
        })
        .into(this.tableName.user)
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  }

  public async update(id: string, update_data: update_data): Promise<UserByDB> {
    try {
      await this.connection(this.tableName.user)
      .update({
        lastname: update_data.lastname,
        address: update_data.address,
        nickname: update_data.nickname,
        img: update_data.img
      })
      .where("id", id)

      const updatedUser: UserByDB = await this.getById(id)

      return updatedUser;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  }

  public async delete(id: string) {
    try {
      await this.connection(this.tableName.user)
      .where("id", id)
      .del()

    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  }

  public async getById(id: string): Promise<UserByDB> {
    try {
      const user: UserByDB | any = await this.connection()
        .select()
        .from(this.tableName.user)
        .where('id', id)

      return user[0]
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  public async searchByName(name: string | undefined) {
    try {
      const result: any = await this.connection()
        .select()
        .from(this.tableName.user)
        .where('name', name)
      return result
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  public async searchByLastName(lastname: string | undefined) {
    try {
      const result: any = await this.connection()
        .select()
        .from(this.tableName.user)
        .where('lastname', lastname)
      return result
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  public async searchByNameAndLastname(name: string | undefined, lastname: string | undefined) {
    try {
      const result: any = await this.connection()
        .select()
        .from(this.tableName.user)
        .where('name', name).andWhere('lastname', lastname)

      return result
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  public async byNickname(nickname: string): Promise<UserByDB> {
    try {
      const userByDB: UserByDB | any = await this.connection()
        .select()
        .from(this.tableName.user)
        .where('nickname', nickname)

      return userByDB[0];
    } catch (error) {
      throw new Error(error)
    }
  }

  public async getAll():Promise<UserByDB[]> {
    try { 
      const allUsers: UserByDB[] = await this.connection()
        .select()
        .from(this.tableName.user)


      return allUsers;
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const userDatabase: UserDatabase = new UserDatabase();