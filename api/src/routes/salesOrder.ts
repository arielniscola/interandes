import { Router } from "express";
import {
  createSalesOrderController,
  generateInstructivoController,
  getAllSalesOrdersController,
  getSalesOrderIDController,
  pdfSalesOrderController,
} from "../controllers/salesOrder";

export const salesOrderRoutes = Router();

salesOrderRoutes.get("/", getAllSalesOrdersController);
salesOrderRoutes.post("/", createSalesOrderController);
salesOrderRoutes.get("/:id", getSalesOrderIDController);
salesOrderRoutes.post("/generate-pdf", pdfSalesOrderController);
salesOrderRoutes.post(
  "/generate-instructivo-pdf",
  generateInstructivoController
);
