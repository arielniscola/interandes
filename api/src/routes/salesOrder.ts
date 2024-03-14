import { Router } from "express";
import {
  createSalesOrderController,
  generateInstructivoController,
  getAllSalesOrdersController,
  getConsigneesController,
  getSalesOrderIDController,
  pdfSalesOrderController,
} from "../controllers/salesOrder";

export const salesOrderRoutes = Router();

salesOrderRoutes.get("/", getAllSalesOrdersController);
salesOrderRoutes.post("/", createSalesOrderController);
salesOrderRoutes.get(
  "/generate-instructivo-pdf/:id",
  generateInstructivoController
);
salesOrderRoutes.get("/consignees", getConsigneesController);
salesOrderRoutes.get("/generate-bl/:id", pdfSalesOrderController);
salesOrderRoutes.get("/:id", getSalesOrderIDController);
