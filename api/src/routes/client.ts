import { Router } from "express";
import {
  createClientController,
  getAllClientsController,
  getClientIDController,
  updateClientController,
} from "../controllers/client";
import auditoriaMiddleware from "../middlewares/auditoria";

export const clientRoutes = Router();

clientRoutes.get("/", getAllClientsController);
clientRoutes.get("/:id", getClientIDController);
clientRoutes.post("/", auditoriaMiddleware, createClientController);
clientRoutes.put("/", updateClientController);
