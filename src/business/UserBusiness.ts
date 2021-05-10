import { userDatabase } from '../database/UserDatabase';
import User, { update_data, UserByDB, UserByNickname, UserInput } from '../models/User';
import { idGenerator } from '../services/IdGenerator';
import { CharacterSizeError } from '../error/CharacterSizeError';
import { DuplicateError } from '../error/DuplicateError';
import { NotFoundError } from '../error/NotFoundError';

export default class UserBusiness {

  public async create(user: UserInput): Promise<UserByDB> {
    const {name, lastname, nickname, address, bio, img} = user

    try {
      if (!name || !lastname || !nickname || !address || !bio || !img) {
        throw new Error("Fill in all fields.")
      }

      if (nickname.length > 30) {
        throw new CharacterSizeError("The field nickname cannot be longer than 30 characters.")
      }

      if (bio.length > 100) {
        throw new CharacterSizeError("The field bio cannot be longer than 100 characters.")
      }

      const id: string = idGenerator.generate();

      const newUser: User = new User(
        id,
        name,
        lastname,
        nickname,
        address,
        bio,
        img
      );

      await userDatabase.create(newUser);
      const createdUser: UserByDB = await userDatabase.getById(id);

      return createdUser;
    } catch (error) {
      if (error.message.indexOf("Duplicate") !== -1) {
        throw new DuplicateError("Nickname already exits.");
      } else {
        throw new Error(error.message || error.sqlMessage)
      }
    }
  }

  public async update(id: string, updated_data: update_data) {
    const {lastname, address, nickname} = updated_data

    try {
      const userById: UserByDB = await userDatabase.getById(id);

      if(!userById) {
        throw new Error("User not found.")
      }

      if (
        !lastname &&
        !address && 
        !nickname
      ) {
        throw new Error("It is necessary to pass a lastname, an address or nickname to update user.")
      }     
      
      if(nickname) {
        const userByNickname: UserByDB = await userDatabase.byNickname(nickname)

        if(userByNickname) {
          throw new DuplicateError("Nickname already in use.");
        }
      }

      const updatedUser: UserByDB = await userDatabase.update(id, updated_data);      
      return updatedUser;

    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  }

  public async delete(id: string) {
    try {
      if(!id) {
        throw new Error("It is necessary to pass an id to delete user")
      }

      await userDatabase.delete(id);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  }

  public async search(name?: string, lastname?: string) {
    try {
      if(!name && !lastname) {
        throw new Error("No search parameters found.");
      }

      let result: any = [];

      if(name && !lastname) {
        result = await userDatabase.searchByName(name)
      }

      if(!name && lastname) {
        result = await userDatabase.searchByLastName(lastname)
      }

      if(name && lastname) {
        result = await userDatabase.searchByNameAndLastname(name, lastname)
      }

      if(!result) {
        throw new NotFoundError("No users found.");
      }

      return result;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  public async byNickname(nickname: string): Promise<UserByNickname> {
    try {
      if(!nickname) {
        throw new Error("It is necessary to pass an nickname");
      }

      const userByDB: UserByDB = await userDatabase.byNickname(nickname);

      if(!userByDB) {
        throw new NotFoundError("User not found.");
      }

      const user: UserByNickname = {
        name: userByDB.name,
        lastname: userByDB.lastname,
        nickname: userByDB.nickname,
        img: userByDB.img
      }

      return user;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  public async getAll():Promise<UserByDB[]> {
    try {
      const allUsers: UserByDB[] = await userDatabase.getAll();

      return allUsers;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }
}

export const userBusiness: UserBusiness = new UserBusiness();