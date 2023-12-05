import { Router } from "express";
import { getOperationIDController, getOperationsController } from "../controllers/operation";


export const operationRoutes = Router();

operationRoutes.get("/", getOperationsController);
operationRoutes.get("/:id", getOperationIDController)