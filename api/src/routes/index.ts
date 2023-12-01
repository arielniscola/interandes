import { Router } from "express";
import { clientRoutes } from "./client";
import { userRoutes } from "./user";
import { pricingRoutes } from "./pricing";
import { salesOrderRoutes } from "./salesOrder";
import { taskRoutes } from "./task";

const router = Router();

router.use("/users", userRoutes);
router.use("/clients", clientRoutes);
router.use("/pricing", pricingRoutes);
router.use("/sales-order", salesOrderRoutes);
router.use("/tasks", taskRoutes);

export default router;
