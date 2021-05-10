import { Request, Response } from 'express';
import { userBusiness } from '../business/UserBusiness';
import { update_data, UserByDB, UserByNickname, UserInput } from '../models/User';

export default class UserController {
  public async create(req: Request, res: Response) {
    const {name, lastname, nickname, address, bio, img} = req.body

    try {
      const user: UserInput = {
        name,
        lastname,
        nickname,
        address,
        bio,
        img
      }

      const newUser: UserByDB = await userBusiness.create(user);

      res.status(200).send({
        message: "User created successfully.",
        created_user: newUser
      })
    } catch (error) {
      res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message)
    }
  }

  public async update(req: Request, res: Response) {
    const {lastname, nickname, address, img} = req.body

    try {
      const id: string = req.params.id as string;

      const updated_data: update_data = {
        lastname,
        address,
        nickname,
        img
      }

      const updatedUser: UserByDB = await userBusiness.update(id, updated_data)

      res.status(200).send({
        message: "User updated successfully.",
        updatedUser
      })

    } catch (error) {
      res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message)
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id as string;

      await userBusiness.delete(id)

      res.status(200).send("User deleted successfully.")
    } catch (error) {
      res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message)
    }
  }

  public async search(req: Request, res: Response) {
    try {
      const name = req.query.name as string
      const lastname = req.query.lastname as string

      const result = await userBusiness.search(name, lastname)

      res.status(200).send(result)
    } catch (error) {
      res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message)
    }
  }

  public async byNickname(req: Request, res: Response) {
    try {
      const nickname = req.params.nickname

      const user: UserByNickname = await userBusiness.byNickname(nickname);

      res.status(200).send(user)
    } catch (error) {
      res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message)
    }
  }

  public async getAll(req: Request, res: Response):Promise<void> {
    try {
      const allUsers: UserByDB[] = await userBusiness.getAll();

      res.status(200).send({
        users: allUsers
      })      
    } catch (error) {
      res.status(error.customErrorCode || 400).send(error.sqlMessage || error.message)
    }
  }
}

export const userController: UserController = new UserController();