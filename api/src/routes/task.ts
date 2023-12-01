import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
} from "../controllers/tasks";

export const taskRoutes = Router();

taskRoutes.get("/", getTasksController);
taskRoutes.post("/", createTaskController);
taskRoutes.delete("/:id", deleteTaskController);
