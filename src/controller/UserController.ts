import { Request, Response } from 'express';
import { userBusiness } from '../business/UserBusiness';
import { update_data, UserByDB, UserByNickname, UserInput } from '../models/User';

export default class UserController {
  public async create(req: Request, res: Response) {
    try {
      const user: UserInput = {
        name: req.body.name,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        address: req.body.address,
        bio: req.body.bio
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
    try {
      const id: string = req.params.id as string;

      const updated_data: update_data = {
        lastname: req.body.lastname,
        address: req.body.address,
        nickname: req.body.nickname
      }

      const updatedUser: UserByDB = await userBusiness.update(id, updated_data)

      res.status(200).send({
        message: "User updated successfully.",
        updatedUser: updatedUser
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
}

export const userController: UserController = new UserController();