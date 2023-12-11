import { Router } from "express";

import { FileStorage } from "../utils/multer.config";
import {
  downloadFileController,
  getFilesOperationController,
  uploadFilesController,
} from "../controllers/filesStructure";

const fileConfig = new FileStorage("operations");
const upload = fileConfig.upload;
export const fileRoutes = Router();

fileRoutes.post("/:id", upload.array("files", 10), uploadFilesController);
fileRoutes.get("/:id", getFilesOperationController);
fileRoutes.get("/download/:id", downloadFileController);
