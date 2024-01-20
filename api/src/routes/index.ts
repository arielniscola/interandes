import { Router } from "express";
import { clientRoutes } from "./client";
import { userRoutes } from "./user";
import { pricingRoutes } from "./pricing";
import { salesOrderRoutes } from "./salesOrder";
import { taskRoutes } from "./task";
import { operationRoutes } from "./operation";
import { operationTypeRoutes } from "./operationType";
import { providerRoutes } from "./provider";
import { fileRoutes } from "./fileStructure";
import { companyRoutes } from "./company";

const router = Router();

router.use("/users", userRoutes);
router.use("/clients", clientRoutes);
router.use("/pricing", pricingRoutes);
router.use("/sales-order", salesOrderRoutes);
router.use("/tasks", taskRoutes);
router.use("/operations", operationRoutes);
router.use("/operationType", operationTypeRoutes);
router.use("/providers", providerRoutes);
router.use("/files", fileRoutes);
router.use("/company", companyRoutes);

export default router;
