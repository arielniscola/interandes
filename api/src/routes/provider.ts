import { Router } from "express";
import {
  createProviderController,
  getProviderIDController,
  getProvidersController,
  updateProviderController,
} from "../controllers/provider";

export const providerRoutes = Router();

providerRoutes.get("/", getProvidersController);
providerRoutes.get("/:id", getProviderIDController);
providerRoutes.post("/", createProviderController);
providerRoutes.put("/", updateProviderController);
