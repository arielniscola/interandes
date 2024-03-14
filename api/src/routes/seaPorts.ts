import { Router } from "express";
import { getSeaPortController } from "../controllers/seaPort";

export const seaPortRoutes = Router();

seaPortRoutes.get("/", getSeaPortController);
