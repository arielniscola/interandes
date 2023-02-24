import { Router } from "express";
import {
  getAllUsersController,
  getUserIDController,
  createUserController,
  signinController,
  updateUserController,
} from "../controllers/user";
import { chekAuth } from "../middlewares/checkAuth";
export const userRoutes = Router();

userRoutes.get("/", getAllUsersController);
userRoutes.post("/", chekAuth, createUserController);
userRoutes.get("/:id", getUserIDController);
userRoutes.post("/signin", signinController);
userRoutes.put("/", updateUserController);
