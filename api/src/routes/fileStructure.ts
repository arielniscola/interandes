import { Router } from "express";
import multer from "multer";
import { uploadFiles, getFilesCollection } from "../controllers/filesStructure";

const upload = multer({ dest: "uploads/" });

export const fileRoutes = Router();

fileRoutes.post("/", upload.single("file"), uploadFiles);
fileRoutes.get("/", getFilesCollection);
