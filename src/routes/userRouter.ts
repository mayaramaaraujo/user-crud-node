import express from "express";
import { userController } from '../controller/UserController';

export const userRouter = express.Router();

userRouter.get("/all", userController.getAll)
userRouter.post("/create", userController.create)
userRouter.get("/search", userController.search)
userRouter.get("/:nickname", userController.byNickname)
userRouter.put("/:id", userController.update)
userRouter.delete("/:id", userController.delete)