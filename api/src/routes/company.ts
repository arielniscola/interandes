import { Router } from "express";

import { FileStorage } from "../utils/multer.config";
import {} from "../controllers/filesStructure";
import {
  createCompanyController,
  getCompaniesController,
  uploadLogoController,
} from "../controllers/company";

const fileConfig = new FileStorage("company");
const upload = fileConfig.upload;
export const companyRoutes = Router();

companyRoutes.post("/", createCompanyController);
companyRoutes.post("/:id", upload.array("files", 10), uploadLogoController);
companyRoutes.get("/", getCompaniesController);
companyRoutes.get("/:id");
