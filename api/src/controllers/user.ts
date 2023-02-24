import { Request, Response } from "express";
import {
  getAllUsers,
  getUserID,
  signin,
  updateUser,
  createUser,
} from "../services/user.service";

export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    if (!users) res.status(404).json({ message: "No users found" });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserIDController = async (req: Request, res: Response) => {
  try {
    const user = await getUserID(req.params.id);
    if (!user) res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userUpdated = await updateUser(req.body.user);
    if (!userUpdated) res.status(404).json({ message: "User not updated" });
    res.status(200).json(userUpdated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const userCreated = await createUser(req.body);
    if (!userCreated) res.status(404).json({ message: "User not created" });
    res.status(200).json(userCreated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signinController = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.mailaddress;
    const password: string = req.body.password;
    console.log(email);

    const token = await signin(email, password);
    res.header("authentification", token).json();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
