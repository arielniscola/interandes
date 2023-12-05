import { Router } from "express";
import {
  createOperationTypeController,
  deleteOperationTypeController,
  getOperationIDController,
  getOperationsTypeController,
  updateOperationTypeController,
} from "../controllers/operationType";

export const operationTypeRoutes = Router();

operationTypeRoutes.get("/", getOperationsTypeController);
operationTypeRoutes.post("/", createOperationTypeController);
operationTypeRoutes.delete("/", deleteOperationTypeController);
operationTypeRoutes.put("/", updateOperationTypeController);
operationTypeRoutes.get("/:id", getOperationIDController);
