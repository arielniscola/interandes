import { Router } from "express";
import {
  getOperationIDController,
  getOperationsController,
  updateOperationController,
  updateTaskListController,
} from "../controllers/operation";

export const operationRoutes = Router();

operationRoutes.get("/", getOperationsController);
operationRoutes.get("/:id", getOperationIDController);
operationRoutes.put("/:id", updateOperationController);
operationRoutes.put("/tasklist/:id", updateTaskListController);
