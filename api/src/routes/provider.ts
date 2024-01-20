import { Router } from "express";
import {
  createProviderController,
  getProviderIDController,
  getProvidersController,
  providerExportCsvController,
  updateProviderController,
} from "../controllers/provider";

export const providerRoutes = Router();

providerRoutes.get("/", getProvidersController);
providerRoutes.post("/", createProviderController);
providerRoutes.put("/", updateProviderController);
providerRoutes.get("/export", providerExportCsvController);
providerRoutes.get("/:id", getProviderIDController);
